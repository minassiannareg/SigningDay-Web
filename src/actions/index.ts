import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { createServerSupabaseClient } from '../lib/supabase';

export const server = {
  signIn: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }),
    handler: async (input, context) => {
      const supabase = createServerSupabaseClient({
        request: context.request,
        cookies: context.cookies,
      });

      const { error } = await supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
      };
    },
  }),
};