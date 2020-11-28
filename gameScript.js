const questionDiv = document.querySelector(".question");
const leftSpan = document.querySelector(".left-answer");
const rightSpan = document.querySelector(".right-answer");
const leftRadio = document.querySelector(".left");
const rightRadio = document.querySelector(".right");
const submitBtn = document.querySelector(".submit");

let qno;
let quizData = [];

const makeQuiz = () => {
  // console.log(quizData);
  // console.log(quizData[qno]);
  questionDiv.innerHTML = quizData[qno].question;
  leftSpan.innerHTML = quizData[qno].correct_answer;
  leftRadio.value = quizData[qno].correct_answer;
  rightSpan.innerHTML = quizData[qno].incorrect_answers[0];
  rightRadio.value = quizData[qno].incorrect_answers[0];
};

const getQuiz = async () => {
  qno = 0;
  const resp = await fetch("https://opentdb.com/api.php?amount=100");
  const data = await resp.json();
  const quizArray = data.results;
  quizData = quizArray;
  makeQuiz();
};

submitBtn.addEventListener("click", (e) => {
  if (leftRadio.checked) {
    qno++;
    makeQuiz();
  }
});

getQuiz();
