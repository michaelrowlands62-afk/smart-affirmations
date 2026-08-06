// blog posts live here as plain data — no CMS, no markdown pipeline, just objects.
//
// shape of a post:
//   {
//     slug: "kebab-case-slug",      // used in the /blog/:slug route
//     title: "post title",
//     excerpt: "one or two sentences shown on the blog index card and used as the
//               fallback meta description if a post doesn't set its own.",
//     date: "2026-01-15",           // ISO date string (yyyy-mm-dd), sorted newest first
//     content: [                    // ordered content blocks, rendered by BlogPost.jsx
//       { type: "paragraph", text: "..." },
//       { type: "heading", level: 2, text: "..." },   // level 2 or 3
//       { type: "quote", text: "..." },                // pull-quote styling
//       { type: "callout", text: "...", variant: "warning" }, // variant is optional
//     ],
//   }
//
// add new posts to this array — BlogPost.jsx looks posts up by slug automatically.
export const posts = [
  {
    slug: "how-i-use-affirmations-in-martial-arts-training",
    title: "how i use affirmations in martial arts training",
    excerpt:
      "boxing, kickboxing, and a 2nd dan black belt in wt taekwondo — an honest look at where affirmations for martial arts have actually helped me, before competition, mid-session, and after a bad day.",
    date: "2026-08-06",
    content: [
      {
        type: "paragraph",
        text: "i've spent most of my life training in one martial art or another — boxing, kickboxing, and now a 2nd dan black belt in wt taekwondo. affirmations have been part of nearly all of it, not as a gimmick i tried once and dropped, but as something i've actually used, session after session, for a long time. this isn't theory for me. it's just how i've trained.",
      },
      {
        type: "paragraph",
        text: "i get asked sometimes whether affirmations for martial arts actually do anything, or whether it's just something people say to sound disciplined. the honest answer is that it depends entirely on where you use them and what you expect from them. here's what i've actually found, broken into where affirmations for competition and training have genuinely helped me, and where they haven't done much at all.",
      },
      { type: "heading", level: 2, text: "how this started" },
      {
        type: "paragraph",
        text: "i started using affirmations as a teenager, and the moment that kicked it off was hearing bodybuilder tom platz talk about how he used affirmations to reach his goals. it wasn't a martial arts context at all — just a bodybuilder talking about his own mindset. but something about it stuck, enough that i decided to actually try it myself instead of just filing it away as an interesting thing i'd heard once.",
      },
      {
        type: "quote",
        text: "a bodybuilder talking about affirmations was the moment that got me started — one teenager deciding to actually try it, instead of just thinking it sounded interesting.",
      },
      {
        type: "paragraph",
        text: "the results were significant enough that i kept going. affirmations became part of training, part of stepping into the ring or onto the mat, and eventually part of how i handle plenty of things outside martial arts too. that's a long track record of actually using this stuff under real pressure, not just reading about it in a book somewhere.",
      },
      { type: "heading", level: 2, text: "affirmations before a fight, grading, or competition" },
      {
        type: "paragraph",
        text: "the run-up to a fight, a grading, or a competition is where nerves show up the loudest, and it's also where i've found affirmations do some of their most useful work. the goal was never to convince myself i couldn't lose, or that nothing could possibly go wrong — that kind of hype rarely survives contact with a grading panel or an opponent who's also shown up prepared. what actually helps is a grounded line tied to real preparation: something like \"i've put the rounds in\" or \"i know this pattern.\" it doesn't promise a result. it just reminds me of something true.",
      },
      { type: "heading", level: 3, text: "the night before" },
      {
        type: "paragraph",
        text: "the night before something big, i've found it far more useful to repeat something short and specific than to run through every possible scenario in my head. a line about trusting the preparation tends to quiet the noise better than trying to mentally plan for every outcome — you can't plan for all of them anyway, and trying usually just feeds the nerves instead of settling them.",
      },
      { type: "heading", level: 3, text: "in the final minutes" },
      {
        type: "paragraph",
        text: "right before stepping onto the mat or into the ring, there isn't time for anything elaborate. a short phrase — three or four words — is about all you can actually hold onto in that window. anything longer gets lost the second the adrenaline spikes, so i've learned to keep it simple and repeat it rather than trying to think something new in the moment.",
      },
      { type: "heading", level: 2, text: "affirmations during hard training when motivation dips" },
      {
        type: "paragraph",
        text: "competition day gets most of the attention, but the bulk of martial arts is the training in between — the sessions where nobody's watching, motivation is low, and it would be easy to go through the motions or skip it altogether. honestly, this is where i've leaned on affirmations the most, because it's the least glamorous part of training and the part most likely to get skipped without something to push through it.",
      },
      {
        type: "paragraph",
        text: "a short phrase repeated through a hard round or a tough sparring session gives me something to focus on other than how tired i am. it doesn't make the round physically easier — my legs are just as tired either way — but it changes what i'm doing with my attention while i'm tired, which is often the actual difference between pushing through the last thirty seconds and quietly easing off early.",
      },
      {
        type: "callout",
        text: "worth knowing: affirmations haven't replaced conditioning, technique work, or actually showing up to train — they've never been a substitute for any of that. what they've done is make it a bit easier to get through the sessions where showing up was the hardest part.",
      },
      { type: "heading", level: 2, text: "recovering mentally after a loss or a bad session" },
      {
        type: "paragraph",
        text: "not every session goes well, and not every fight or grading goes the way you'd hoped. this is the part of martial arts nobody really enjoys talking about, but it's also where affirmations have mattered most to me long-term. a bad session or a loss can turn into a spiral pretty fast if you let it — dwelling on one bad round, one missed technique, or one off day until it starts to feel like a pattern instead of a single moment.",
      },
      {
        type: "paragraph",
        text: "the affirmations i use here aren't about pretending the loss didn't happen, or that it wasn't disappointing. something like \"that one's done, the next session is new\" acknowledges it without dwelling on it. the point was never to feel good about a bad result — it's to stop one bad session from bleeding into the next one, and the one after that.",
      },
      { type: "heading", level: 2, text: "what i've actually learned" },
      {
        type: "paragraph",
        text: "none of this is complicated, and none of it is magic. affirmations haven't won a single round for me on their own — training, technique, and actually showing up have done that part. what affirmations for martial arts have given me is a steadier way to handle everything around the training itself: the nerves before something big, the grind when motivation is low, and the reset after something goes badly. after this many years of doing it, that's still worth something to me.",
      },
    ],
  },
];
