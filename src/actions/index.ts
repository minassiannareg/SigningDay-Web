import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { createClient } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '../lib/supabase';

export const server = {
  signIn: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }),
    handler: async (input, context) => {
      const supabase = createServerSupabaseClient({ request: context.request, cookies: context.cookies });

      const { error } = await supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      });

      if (error) return { success: false, message: error.message };

      return { success: true, message: '' };
    },
  }),

  signOut: defineAction({
    handler: async (_, context) => {
      const supabase = createServerSupabaseClient({ request: context.request, cookies: context.cookies });

      const { error } = await supabase.auth.signOut();

      if (error) return { success: false, message: error.message };

      return { success: true };
    },
  }),

  sendPasswordReset: defineAction({
    handler: async (_, context) => {
      const supabase = createServerSupabaseClient({ request: context.request, cookies: context.cookies });

      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error('RESET USER ERROR:', userError);
        return { success: false, message: userError.message };
      }

      if (!user?.email) {
        return { success: false, message: 'No authenticated email was found.' };
      }

      const origin = new URL(context.request.url).origin;

      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${origin}/reset-password`,
      });

      if (error) {
        console.error('RESET EMAIL ERROR:', error);
        return { success: false, message: error.message };
      }

      return { success: true, message: 'Password reset email sent.' };
    },
  }),

  createClient: defineAction({
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8),
      athleteName: z.string().min(1),
      graduationYear: z.number().int().min(2020).max(2100).optional(),
      package: z.enum(['SDA Compass', 'Base', 'Premium']).optional(),
      bestEvents: z.string().optional(),
      currentSchool: z.string().optional(),
      currentTeam: z.string().optional(),
      monthlySubscription: z.boolean().default(false),
    }),

    handler: async (input, context) => {
      const supabase = createServerSupabaseClient({ request: context.request, cookies: context.cookies });

      const { data: { user: currentUser } } = await supabase.auth.getUser();

      if (!currentUser) return { success: false, message: 'You must be logged in.' };

      const { data: currentProfile, error: currentProfileError } = await supabase.from('profiles').select('is_admin').eq('id', currentUser.id).maybeSingle();

      if (currentProfileError || !currentProfile?.is_admin) return { success: false, message: 'Administrator access required.' };

      const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
      const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl) return { success: false, message: 'Server configuration is missing the Supabase URL.' };

      if (!serviceRoleKey) return { success: false, message: 'Server configuration is missing the service role key.' };

      const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });

      const { data: createData, error: createError } = await adminSupabase.auth.admin.createUser({
        email: input.email,
        password: input.password,
        email_confirm: true,
      });

      if (createError) return { success: false, message: createError.message };

      const newUser = createData.user;

      if (!newUser) return { success: false, message: 'The client account could not be created.' };

      const { error: profileError } = await adminSupabase.from('profiles').insert({
        id: newUser.id,
        athlete_name: input.athleteName,
        graduation_year: input.graduationYear ?? null,
        package: input.package ?? null,
        best_events: input.bestEvents || null,
        current_school: input.currentSchool || null,
        current_team: input.currentTeam || null,
        monthly_subscription: input.monthlySubscription,
        subscription_status: input.monthlySubscription ? 'active' : null,
        is_admin: false,
      });

      if (profileError) {
        await adminSupabase.auth.admin.deleteUser(newUser.id);
        return { success: false, message: `Account created but profile setup failed: ${profileError.message}` };
      }

      const defaultTimeline = [
        'Complete recruiting questionnaire',
        'Review SDA Compass',
        'Finalize recruiting materials',
        'Begin coach outreach',
        'Complete coach calls',
        'Plan official visits',
        'Submit applications',
        'Commitment',
      ];

      const timelineRows = defaultTimeline.map((title, index) => ({
        user_id: newUser.id,
        title,
        completed: false,
        sort_order: index + 1,
      }));

      const { error: timelineError } = await adminSupabase.from('client_timeline').insert(timelineRows);

      if (timelineError) {
        await adminSupabase.from('profiles').delete().eq('id', newUser.id);
        await adminSupabase.auth.admin.deleteUser(newUser.id);
        return { success: false, message: `Timeline setup failed: ${timelineError.message}` };
      }

      return {
        success: true,
        message: `Client account created for ${input.email}.`,
      };
    },
  }),
};