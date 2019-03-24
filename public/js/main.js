const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

const gameState = {
  quizzes: [],
  currentIndex: 0,
  numberOfCurrent: 0
};

const questionIndex = document.getElementById("question");
const resultIndex = document.getElementById("result");
const answersList = document.getElementById("answers");
const restartButton = document.getElementById("restart-button");

window.addEventListener("load", event => {
  fetchQuizData();
});

restartButton.addEventListener("click", event => {
  fetchQuizData();
});

const fetchQuizData = async () => {
  questionIndex.textContent = "Now loading...";
  resultIndex.value = "";
  restartButton.hidden = true;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    gameState.quizzes = data.results;
    setNextQuiz();
  } catch {
    console.log("loading error");
  }
};

const setNextQuiz = () => {
  questionIndex.textContent = "";
  while (answersList.firstChild) {
    document.removeChild(answersList.firstChild);
  }
  if (gameState.numberOfCurrent <= gameState.quizzes.length) {
    makeQuiz();
  } else {
  }
};

makeQuiz = () => {
  console.log(gameState.quizzes);
};
