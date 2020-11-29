const quizContainer = document.querySelector(".quiz");
const questionDiv = document.querySelector(".question");
const leftSpan = document.querySelector(".left-answer");
const rightSpan = document.querySelector(".right-answer");
const leftRadio = document.querySelector(".left");
const rightRadio = document.querySelector(".right");
const submitBtn = document.querySelector(".submit");
const seconds = document.querySelector(".seconds");

let qno;
let quizData = [];
let interval;
let timeVal;

const selectRandom = () => {
  // 0 or 1
  return Math.round(Math.random());
};

const makeQuiz = () => {
  quizContainer.classList.add("active");
  submitBtn.disabled = false;
  questionDiv.innerHTML = quizData[qno].question;
  const random = selectRandom();
  if (random === 0) {
    leftSpan.innerHTML = quizData[qno].correct_answer;
    leftRadio.value = quizData[qno].correct_answer;
    rightSpan.innerHTML = quizData[qno].incorrect_answers[0];
    rightRadio.value = quizData[qno].incorrect_answers[0];
  } else {
    rightSpan.innerHTML = quizData[qno].correct_answer;
    rightRadio.value = quizData[qno].correct_answer;
    leftSpan.innerHTML = quizData[qno].incorrect_answers[0];
    leftRadio.value = quizData[qno].incorrect_answers[0];
  }
  setTimer(false);
};

const getQuiz = async () => {
  qno = 0;
  const resp = await fetch("https://opentdb.com/api.php?amount=100");
  const data = await resp.json();
  const quizArray = data.results;
  quizData = quizArray;
};

submitBtn.addEventListener("click", (e) => {
  if (leftRadio.checked && leftRadio.value === quizData[qno].correct_answer) {
    qno++;
    quizContainer.classList.remove("active");
    submitBtn.disabled = true;
    run = true;
    inGame = true;
  } else if (
    rightRadio.checked &&
    rightRadio.value === quizData[qno].correct_answer
  ) {
    qno++;
    quizContainer.classList.remove("active");
    submitBtn.disabled = true;
    run = true;
    inGame = true;
  } else {
    quizContainer.classList.remove("active");
    submitBtn.disabled = true;
    run = true;
    lost();
  }
});

getQuiz();
