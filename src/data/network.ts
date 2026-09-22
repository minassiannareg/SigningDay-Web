/* ---------------------------------------------------------------
   Our Network — the professionals SDA refers families to.

   THIS IS THE ONLY FILE YOU EDIT TO ADD SOMEONE.
   The page at /network builds itself from the arrays below. Adding a
   person means adding one object to the right `people: [...]` list.
   You never touch the page or the card layout.

   To add someone, copy this block into the correct `people` array:

     {
       name: 'Jane Doe',
       title: 'Certified Strength & Conditioning Specialist',
       org: 'Harbor Athletic Performance',
       location: 'Boston, MA',
       bio: 'Two or three sentences. What they do, who they work with, ' +
            'and why an SDA family would be sent to them.',
       photo: '/network-img/jane-doe.jpg',
       tags: ['Strength & Conditioning', 'Return to Training'],
       link: { href: 'https://harborathletic.com', label: 'Visit website' },
     },

   Only `name`, `title` and `bio` are required. Everything else can be
   left out and the card still renders correctly:
     - no `photo`  -> a navy monogram of their initials is drawn instead,
                      so a card without a headshot still looks deliberate
     - no `org`, `location`, `tags` or `link` -> those rows are skipped

   Photos go in `public/network-img/`. Use a portrait crop (taller than
   it is wide); the card crops to 4:5. Around 800px wide is plenty.

   A section with an empty `people` array is NOT hidden - it renders the
   "coming soon" panel defined on the page. That is deliberate: all three
   categories are announced from day one, and the panel invites referrals.
   --------------------------------------------------------------- */

export interface NetworkPerson {
  /** Full name, as they would introduce themselves. */
  name: string;
  /** Credential or role line, e.g. 'CSCS, Sports Performance Coach'. */
  title: string;
  /** Two or three sentences. Plain text. */
  bio: string;
  /** Gym, practice, tutoring centre or university they work through. */
  org?: string;
  /** 'Boston, MA' or 'Remote' or 'Greater Philadelphia'. */
  location?: string;
  /** Path under public/, e.g. '/network-img/jane-doe.jpg'. */
  photo?: string;
  /** Short specialty labels. Two or three read best; four is the cap. */
  tags?: string[];
  /** Website, booking page, or mailto. Opens in a new tab if external. */
  link?: { href: string; label?: string };
}

export interface NetworkSection {
  /** URL fragment and jump-link target, e.g. '#trainers'. */
  id: string;
  /** Section heading. */
  label: string;
  /** Mono eyebrow above the heading. */
  eyebrow: string;
  /** One sentence under the heading: what this group actually does. */
  blurb: string;
  /** Lowercase singular, used in the empty-state sentence. */
  singular: string;
  people: NetworkPerson[];
}

export const networkSections: NetworkSection[] = [
  {
    id: 'coaches',
    label: 'Coaches & Performance',
    eyebrow: 'Swimming & Athlete Development',
    blurb:
      'Coaches, clinicians and former collegiate athletes who work directly on ' +
      'technique, development and injury prevention in the water.',
    singular: 'coach',
    people: [
      {
        name: 'Dean Hutchinson',
        title: 'Swimming Performance & Athlete Development Advisor, Physical Therapist',
        org: 'STRIVE Swim Science Center',
        location: 'Greater Philadelphia, PA',
        bio:
          'Dean is a former elite swimmer, collegiate coach, and physical therapist based ' +
          'in the Greater Philadelphia area, with extensive experience in athlete ' +
          'development and swimming performance. A seven-time NCAA Division I ' +
          'All-American at Auburn University and former member of the U.S. National Team, ' +
          'Dean competed at three Olympic Trials and reached a world ranking of eighth in ' +
          'the 50-meter freestyle. He later coached at the collegiate level, including ' +
          'roles with Rider University and the U.S. Naval Academy, while building a ' +
          'career in physical therapy focused on swimming mechanics, injury prevention, ' +
          'and performance. Dean currently works with athletes through the STRIVE Swim ' +
          'Science Center, combining technical coaching with a clinical understanding of ' +
          'movement and biomechanics.',
        tags: ['Swimming Mechanics', 'Injury Prevention', 'Collegiate Coaching'],
      },
      {
        name: 'Peter Sczupak',
        title: 'Swimming Performance & Athlete Development Advisor',
        org: 'Oceanus Swim School',
        location: 'Massachusetts',
        bio:
          'Peter is a longtime swimming coach and instructor based in Massachusetts, with ' +
          'experience working directly with competitive swimmers on technical ' +
          'development, performance, and recruiting. He is the founder of Oceanus Swim ' +
          'School, which provides private and small-group instruction and uses ' +
          'video-based analysis to help swimmers improve technique and efficiency. Peter ' +
          'has also served as a coach reference for athletes pursuing collegiate swimming ' +
          'opportunities, giving him firsthand perspective on the development and ' +
          'recruiting process. He holds an MBA from the University of Oregon and brings a ' +
          'combination of coaching, athlete development, and broader professional ' +
          'experience to the SDA network.',
        tags: ['Technique & Video Analysis', 'Coach References'],
      },
    ],
  },
  {
    id: 'trainers',
    label: 'Personal Trainers',
    eyebrow: 'Strength & Conditioning',
    blurb:
      'Coaches who build strength and conditioning around a competitive season ' +
      'rather than against it, and who know how to bring an athlete back from injury.',
    singular: 'trainer',
    people: [],
  },
  {
    id: 'tutors',
    label: 'Tutors',
    eyebrow: 'Academic Support',
    blurb:
      'SAT and ACT preparation and subject tutoring for athletes carrying a full ' +
      'training load, where test scores move the Academic Index directly.',
    singular: 'tutor',
    people: [],
  },
  {
    id: 'nutritionists',
    label: 'Nutritionists',
    eyebrow: 'Fueling & Recovery',
    blurb:
      'Registered dietitians and sports nutritionists who work with growing ' +
      'athletes at high training volume.',
    singular: 'nutritionist',
    people: [],
  },
];
