export const scaleFactor = 2.3;

export const dialogueData = {
  quiz1: {
    type: "quiz",
    question: "Cate 🦆 sunt in parculet? (⬇️➡️) ",
    options: [
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: true },
      { text: "0", correct: false },
    ],
    correctMessage: "Correct! Nice job!",
    wrongMessage: "Wrong answer! Try again.",
    directions: `⬆️ 🏫🎒
    ⬇️⬅️ 🏠
    ⬇️➡️ 🏞️`,
    sound: "rate",
  },
  quiz2: {
    type: "quiz",
    question: "🧸 + 🧸 = ?",
    options: [
      { text: "🧸 🧸", correct: true },
      { text: "🧸", correct: false },
      { text: "🧸 🧸 🎁", correct: false },
      { text: "🎁 🎁", correct: false },
    ],
    correctMessage: "Correct! Nice job!",
    wrongMessage: "Wrong answer! Try again.",
    directions: `➡️⬇️ 🏥
    ⬅️ 🏫🎒
    ⬇️⬇️⬅️ 🏠`,
  },
  quiz3: {
    type: "quiz",
    question: "Cati copacii (🌲) roz (🩷) sunt? (⬇️)",
    options: [
      { text: "3", correct: false },
      { text: "5", correct: false },
      { text: "7", correct: false },
      { text: "4", correct: true },
    ],
    correctMessage: "Correct! Nice job!",
    wrongMessage: "Wrong answer! Try again.",
    directions: `➡️⬇️ 🏥
    ⬆️ 🏫🎒
    ⬅️ 🏢🏢
    ⬇️ 🌲🌲🌲`,
    sound: "copaci",
  },
  quiz4: {
    type: "quiz",
    question: "Avem voie sa trecem, daca culoarea semaforului(🚦) este ?",
    options: [
      { text: "🟦", correct: false },
      { text: "🟩", correct: true },
      { text: "🟥", correct: false },
      { text: "🟨", correct: false },
    ],
    correctMessage: "Correct! Nice job!",
    wrongMessage: "Wrong answer! Try again.",
    directions: `⬅️ 🗿🗿🗿
    ➡️➡️➡️ 🏫🎒
    ➡️➡️⬇️ 🏢🏢
    ➡️⬇️ 🏪`,
    sound: "semafor",
  },
  quiz5: {
    type: "quiz",
    question: "🍏🍏🍎🍎 + 🍏🍎 = ❓",
    options: [
      { text: "2 🍏 și 4 🍎", correct: false },
      { text: "6 🍏", correct: false },
      { text: "4 🍏 și 2 🍎", correct: false },
      { text: "3 🍏 și 3 🍎", correct: true },
    ],
    correctMessage: "Correct! Nice job!",
    wrongMessage: "Wrong answer! Try again.",
    directions: `➡️ 🌲🌲🌲
    ⬇️➡️ 🏫🎒`,
  },
};
