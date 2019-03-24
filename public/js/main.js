const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

const gameState = {
  quizzes: [],
  currentIndex: [],
  numberOfCurrent: []
};

const questionIndex = document.getElementById("question");
const resultIndex = document.getElementById("result");
const answersList = document.getElementById("answers");
const restartButton = document.getElementById("restart-button");

window.addEventListener("load", event => {
  fetchQuizData();
});

// 「Restart」ボタンをクリックしたら再度クイズデータを取得する

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
    console.log(data);
  } catch {
    console.log("loading error");
  }
};
