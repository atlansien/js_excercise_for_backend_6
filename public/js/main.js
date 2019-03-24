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
    answersList.removeChild(answersList.firstChild);
  }
  if (gameState.currentIndex < gameState.quizzes.length) {
    const quiz = gameState.quizzes[gameState.currentIndex];
    makeQuiz(quiz);
  } else {
    console.log("end");
  }
};

const finishQuiz = () => {};

const makeQuiz = quiz => {
  console.log(gameState.quizzes);
  questionIndex.textContent = unescapeHTML(quiz.question);

  const answers = shuffle(quiz);

  answers.forEach(answer => {
    const liElement = document.createElement("li");
    liElement.textContent = unescapeHTML(answer);
    answersList.appendChild(liElement);
    liElement.addEventListener("click", event => {
      if (answer === quiz.correct_answer) {
        alert(`Correct answer!!`);
        gameState.numberOfCurrent++;
      } else {
        alert(`Wrong answer... (The correct answer is　${quiz.correct_answer}`);
      }

      gameState.currentIndex++;
      setNextQuiz();
    });
  });
};

shuffle = quiz => {
  answers = quiz.incorrect_answers.concat(quiz.correct_answer);
  for (let i = answers.length - 1; i >= 0; i--) {
    // 0~iのランダムな数値を取得
    let rand = Math.floor(Math.random() * (i + 1));

    // 配列の数値を入れ替える
    [answers[i], answers[rand]] = [answers[rand], answers[i]];
  }
  return answers;
};

const unescapeHTML = str => {
  const div = document.createElement("div");
  div.innerHTML = str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/ /g, "&nbsp;")
    .replace(/\r/g, "&#13;")
    .replace(/\n/g, "&#10;");
  return div.textContent || div.innerText;
};
