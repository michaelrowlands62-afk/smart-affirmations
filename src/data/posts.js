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
  {
    slug: "the-bodybuilder-who-changed-how-i-talk-to-myself",
    title: "the bodybuilder who changed how i talk to myself",
    excerpt:
      "as a teenager i watched bodybuilder tom platz talk about using affirmations to hit his goals, and decided to try it myself. this is the honest story of how that moment quietly shaped how i train, compete, and think, for years afterward.",
    date: "2026-08-16",
    content: [
      {
        type: "paragraph",
        text: "i was a teenager the first time i heard tom platz talk about affirmations. i wasn't looking for anything like that — i was watching an old interview because i liked how he trained, not because i was looking for a mindset lesson. platz was, and still is, one of the most brutal squatters bodybuilding has ever produced. you watch that footage expecting to hear about volume, food, and pain tolerance. instead, at some point, he started talking about how he used affirmations to get himself to his goals.",
      },
      {
        type: "paragraph",
        text: "it sat strangely next to everything else in the clip. here was a guy whose whole reputation was built on physical output — squat racks, torn-up legs, sets that looked more like an argument with gravity than a workout — and he was talking about repeating things to himself. it didn't fit the picture i had of what 'mental' training was supposed to look like. and that mismatch is exactly what made it stick.",
      },
      { type: "heading", level: 2, text: "not the kind of person you'd expect to hear it from" },
      {
        type: "paragraph",
        text: "if a therapist or a self-help book had told teenage me to try affirmations, i probably would have nodded, forgotten about it within the hour, and gone back to whatever i was doing. that's not a knock on therapists or self-help books — it's just how most of that advice lands when you're a teenager who thinks results only come from reps, sets, and hours put in.",
      },
      {
        type: "paragraph",
        text: "but this wasn't advice from someone whose credibility rested on sounding wise. it was coming from someone whose credibility rested entirely on what his body had actually done. that's what made it hard to dismiss as soft or unnecessary. if affirmations were just about feeling nice, i'd have ignored it. but hearing it from someone associated with pure physical effort made the idea feel earned rather than fluffy — like it was one more tool in a kit built by someone who had no patience for tools that didn't work.",
      },
      { type: "heading", level: 2, text: "the first time i actually tried it" },
      {
        type: "paragraph",
        text: "trying it myself felt awkward, and i'm not going to pretend otherwise. there's a specific kind of self-consciousness that comes with standing somewhere quiet, saying something to yourself on purpose, and feeling like you can hear how strange it sounds even inside your own head. i didn't tell anyone i was doing it. i wasn't about to explain to anyone why i'd started muttering a line to myself before training — it felt like the kind of thing that was easier to test in private than to defend out loud.",
      },
      {
        type: "paragraph",
        text: "so i kept it small and kept it to myself. a short phrase before a session, repeated more out of stubbornness than confidence at first, just to see what would actually happen if i gave it an honest go instead of trying it once and deciding it was nonsense. that willingness to look a bit silly in private turned out to matter more than anything else about how it started.",
      },
      { type: "heading", level: 2, text: "the part that actually surprised me" },
      {
        type: "paragraph",
        text: "what surprised me wasn't that it felt nice. plenty of things feel nice for five minutes and change nothing. what surprised me was that the results were significant — a real, noticeable shift in how i showed up to training and how i carried myself through the parts that used to rattle me. it wasn't dramatic or instant. it was more that the sessions where i'd used a line beforehand started to feel different from the sessions where i hadn't, consistently enough that it stopped looking like coincidence.",
      },
      {
        type: "quote",
        text: "a bodybuilder talking about affirmations was the moment this whole thing started — one teenager deciding to actually try it, instead of just thinking it sounded interesting.",
      },
      {
        type: "paragraph",
        text: "that was the turning point. not the clip itself, but the decision to actually run the experiment on myself instead of filing it away as something interesting someone once said. once i had enough of my own evidence that it did something, there wasn't really a reason to stop.",
      },
      { type: "heading", level: 2, text: "a teenager's habit that didn't stay a teenager's habit" },
      {
        type: "paragraph",
        text: "i've been heavily involved in martial arts since i was a teenager too, and that habit ended up following me into every part of it. boxing, kickboxing, and eventually training all the way to a 2nd dan black belt in wt taekwondo — affirmations were quietly present through all of it, not as a separate practice bolted onto training, but woven into how i actually approached it.",
      },
      {
        type: "paragraph",
        text: "before sparring, before a grading, in the middle of a hard round when my legs wanted to quit before i did — the habit that started with one teenager watching an old interview just kept showing up, session after session, year after year. it stopped being something i was 'trying' at some point and just became part of how i trained, the same way stretching or wrapping my hands became part of how i trained.",
      },
      { type: "heading", level: 2, text: "why it stuck for this long" },
      {
        type: "paragraph",
        text: "looking back, i think the reason it stuck is exactly the reason it started: it cost nothing, needed no equipment, and worked quietly in the background instead of demanding attention. it didn't ask me to believe anything grand. it just asked me to say something true and useful to myself on purpose, instead of leaving that space to whatever unhelpful thought happened to show up on its own.",
      },
      {
        type: "callout",
        text: "worth saying: none of this replaced the training. it didn't make me stronger, faster, or more skilled on its own. what it did was make it a little easier to actually access the strength, speed, and skill i'd already put the work in for, especially in moments where nerves or fatigue were doing their best to get in the way.",
      },
      { type: "heading", level: 2, text: "how a personal habit turned into smart affirmations" },
      {
        type: "paragraph",
        text: "for years, this stayed exactly what it started as — a private habit i used before training, before competing, and eventually in plenty of situations that had nothing to do with martial arts at all. i never set out to build anything around it. it was just something that worked, so i kept doing it.",
      },
      {
        type: "paragraph",
        text: "what eventually changed my mind was realizing how much of this only happened because i stumbled onto one interview at the right moment as a teenager. most people don't get that lucky accident. they don't happen to catch the right clip, or hear the right person say the right thing at the right age. smart affirmations exists because i wanted to close that gap — to take something that changed how i talk to myself for the better part of my life and make it something other people can actually reach on purpose, instead of hoping they stumble onto it the way i did. if you want the longer version of that story, it's on the about page. if you'd rather just get started, that's what the generator is for.",
      },
    ],
  },
];
