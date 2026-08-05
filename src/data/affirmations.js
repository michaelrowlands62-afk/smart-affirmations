export const affirmations = [
  { category: "wealth", text: "i turn effort into opportunity, and opportunity into income." },
  { category: "wealth", text: "my bank account reflects the risks i was brave enough to take." },
  { category: "wealth", text: "i negotiate for myself like someone worth investing in." },
  { category: "wealth", text: "every skill i learn is money i haven't made yet." },

  { category: "love", text: "i love out loud, not just in private." },
  { category: "love", text: "my heart is a place worth visiting." },
  { category: "love", text: "i choose people who choose me back." },
  { category: "love", text: "i've stopped shrinking myself to fit into small love." },

  { category: "health", text: "i move my body because i respect it, not to punish it." },
  { category: "health", text: "rest is part of the training, not a break from it." },
  { category: "health", text: "i listen when my body whispers, so it never has to shout." },
  { category: "health", text: "strong lungs, steady hands, a body that shows up for me." },

  { category: "confidence", text: "i speak like my opinion already matters." },
  { category: "confidence", text: "i've survived every room i thought i wasn't ready for." },
  { category: "confidence", text: "i don't shrink to make other people comfortable." },
  { category: "confidence", text: "my presence is not up for debate." },

  { category: "anxiety", text: "my mind races sometimes. i don't have to race with it." },
  { category: "anxiety", text: "i can hold uncertainty without needing to fix it right now." },
  { category: "anxiety", text: "this spiral has an end, even when it doesn't feel like it." },
  { category: "anxiety", text: "i've made it through every panic so far, undefeated." },

  { category: "strength", text: "i've carried heavier than this before." },
  { category: "strength", text: "hard days build the muscle no one else can see." },
  { category: "strength", text: "i don't need to feel strong to act strong." },
  { category: "strength", text: "every setback is just training i didn't ask for." },

  { category: "morning", text: "today hasn't disappointed me yet." },
  { category: "morning", text: "i get one shot at this morning. i'm taking it." },
  { category: "morning", text: "the day hasn't decided anything about me yet." },
  { category: "morning", text: "i wake up already a little more capable than yesterday." },

  { category: "sleep", text: "i've done enough for today. it's allowed to end." },
  { category: "sleep", text: "my mind can rest. the world will still be here tomorrow." },
  { category: "sleep", text: "i release what i can't control before i close my eyes." },
  { category: "sleep", text: "tomorrow-me is grateful i slept instead of scrolled." },

  { category: "motivation", text: "i don't need to feel motivated to start moving." },
  { category: "motivation", text: "small actions today are loud a year from now." },
  { category: "motivation", text: "discipline is just a promise i keep to myself." },
  { category: "motivation", text: "i'm building something nobody else can see yet." },

  { category: "self-love", text: "i'm allowed to take up space without earning it first." },
  { category: "self-love", text: "i speak to myself like someone i actually like." },
  { category: "self-love", text: "i'm not a rough draft. i'm already someone." },
  { category: "self-love", text: "being kind to myself isn't optional, it's maintenance." },
];

export function affirmationOfTheDay() {
  const dayIndex = new Date().getDate() % affirmations.length;
  return affirmations[dayIndex];
}
