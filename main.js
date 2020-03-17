const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', startQuiz);

let currentQuestionNumber = 0;

// Questions

const questions = [
  {
    question: 'Who invented JavaScript?',
    imgURL: 'https://media.giphy.com/media/W7dBXzbnEpOBG/source.gif',
    answers: [
      { name: 'Douglas Crockford' },
      { name: 'Sheryl Sandberg' },
      { name: 'Brendan Eich', correct: true },
      { name: 'Random name' }
    ],
    topic: 'Introduction JS'
  },
  {
    question: 'Which one of these is a JavaScript package manager?',
    answers: [
      { name: 'Node.js' },
      { name: 'TypeScript' },
      { name: 'npm', correct: true },
      { name: 'Random name' }
    ],
    topic: 'Introduction JS'
  },
  {
    question: 'Which tool can you use to ensure code quality??',
    answers: [
      { name: 'Angular' },
      { name: 'jQuery' },
      { name: 'RequireJS' },
      { name: 'ESLint', correct: true }
    ],
    topic: 'Introduction JS'
  },
  {
    question: 'Which tool can you use to ensure code quality??',
    imgURL: 'https://media.giphy.com/media/W7dBXzbnEpOBG/source.gif',
    answers: [
      { name: 'Angular' },
      { name: 'jQuery' },
      { name: 'RequireJS' },
      { name: 'ESLint', correct: true }
    ],
    topic: 'Introduction JS'
  }
];

// Counter of questions "Progress"
function showProgress() {
  let element = document.getElementById('progress');
  element.innerHTML =
    'Question ' + (currentQuestionNumber + 1) + ' of ' + questions.length;
}

// Save the answer & have an array with the chosen answers

let chosenAnswers = [];

function saveTheAnswer(currentQuestionNumber, choiceIndex) {
  
  let choices = questions[currentQuestionNumber].answers;
  // das ist die angeklickte Antwort mit dem Fragenindex und der Antwort
  console.log(currentQuestionNumber, choices[choiceIndex]);
  chosenAnswers[currentQuestionNumber] = choices[choiceIndex].name;

  // if (choices[choiceIndex].correct === true) {
  //   // alert(`congratulations`);
  //   pointsCounter++;
  // }
}

// let pointsCounter = 0;

function showChoices() {
  // antworten aus dem fragen objekt
  let choices = questions[currentQuestionNumber].answers;
  console.log(questions[currentQuestionNumber].answers);
  for (let i = 0; i < choices.length; i++) {
    // choiceButton
    let choiceButton = document.getElementById('btn' + i);

    // console.log(choiceButton);

    choiceButton.onclick = function() {
      choiceButton.style.border = 'solid #00000';
      if (currentQuestionNumber === questions.length - 1) {
        hideNextButton();
      } else {
        showNextButton();
      };

      if (currentQuestionNumber === questions.length -1) {
        showSubmitButton();
      } else {
        hideSubmitButton ();
      }
      saveTheAnswer(currentQuestionNumber, i);
    };
// show choices:
    let choiceContent = document.getElementById('choice' + i);
    choiceContent.innerText = choices[i].name;
  }
}


// Topic Header Input HTML
const topicQuestion = document.getElementById('topic');
topicQuestion.innerHTML = questions[currentQuestionNumber].topic;

// Show Questions
function showQuestions() {
  let element = document.getElementById('question');
  element.innerHTML = questions[currentQuestionNumber].question;
  if ('imgURL' in questions[currentQuestionNumber]) {
    let y = document.createElement('br');
    element.appendChild(y);

    let imgObj = document.createElement('img'); // <img> <img1>
    imgObj.setAttribute('src', questions[currentQuestionNumber].imgURL);
    imgObj.setAttribute('alt', 'imgObj');
    let x = document.getElementById('question');
    x.appendChild(imgObj);
  }
}

const nextButton = document.getElementById('next-btn');
const backButton = document.getElementById('back-btn');

// onclick of button-next go to the next question and save the answer
nextButton.addEventListener('click', showNextQuestion);

backButton.addEventListener('click', showPreviousQuestion);

function showPreviousQuestion() {
  currentQuestionNumber = currentQuestionNumber - 1;
  showQuestions();
  showChoices();
  hideNextButton();
  if (currentQuestionNumber > 0) {
    showBackButton();
  } else {
    hideBackButton();
  }
  hideSubmitButton();

  showProgress();
}

function showNextQuestion() {
  currentQuestionNumber = currentQuestionNumber + 1;
  showProgress();
  showQuestions();
  showChoices();
  hideNextButton();
  if (currentQuestionNumber > 0) {
    showBackButton();
  } else {
    hideBackButton();
  };

  // let choiceButton = document.getElementById('btn' + i);
  // choiceButton.onclick = function() {
  // if (currentQuestionNumber === questions.length - 1) {
  //   showSubmitButton();
  // } else {
  //   hideSubmitButton();
  // }

}


// Submit Button
const submitButton = document.getElementById('submit-btn');

submitButton.addEventListener('click', showResults);

// let resultPage = document.createElement('results');


function showResults() {
  let resultPage = document.getElementById('results');
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('results').style.display = 'block';

  // clear result page before re-populating it
  while (resultPage.firstChild) {
    resultPage.removeChild(resultPage.lastChild);
  }

  let headerResults = document.createElement('h1');
  let text = document.createTextNode('Your results:');
  headerResults.appendChild(text);
  resultPage.appendChild(headerResults);

  let enteredPoints = 0;
  
for (let i = 0; i<questions.length; i++){
  for (let j=0; j<questions[i].answers.length; j++){
    let answer = questions[i].answers[j];
    if(answer.correct === true) {
      if(chosenAnswers[i] === answer.name) {
        enteredPoints++;
      }
    }
  }
}

  // questions.forEach((element, i) => {
  //   element.answers.forEach(answer => {
  //     if(answer.correct === true) {
  //       if(chosenAnswers[i] === answer.name) {
  //         enteredPoints++;
  //       }
  //     }
  //   });
  // });

  let rightAnswers = document.createElement('p');
  let textAns = document.createTextNode(
    `${enteredPoints} out of ${questions.length}`
  );
  rightAnswers.appendChild(textAns);
  resultPage.appendChild(rightAnswers);
  
  let totalPoints = questions.length;
  let percent = (enteredPoints * 100) / totalPoints;

  let userPercent = document.createElement('p');
  let userPercentElement = document.createTextNode(percent + ' %');
  userPercent.appendChild(userPercentElement);
  resultPage.appendChild(userPercent);


  if (percent >= 80) {
    let p1 = document.createElement('p');
    let text1 = document.createTextNode('Impressive. You did an amazing job!');
    p1.appendChild(text1);
    resultPage.appendChild(p1);
    
    let img1 = document.createElement('img'); 
    img1.setAttribute(
      'src',
      'https://media.giphy.com/media/YRuFixSNWFVcXaxpmX/giphy.gif'
    );
    img1.setAttribute('alt', 'img1');
    let src1 = document.getElementById('results');

    src1.appendChild(img1);
  } else if (percent >= 45) {
    let p2 = document.createElement('p');
    let text2 = document.createTextNode('Well, I think you can do better…');
    p2.appendChild(text2);
    resultPage.appendChild(p2);

    let img2 = document.createElement('img'); 
    img2.setAttribute(
      'src',
      'https://media.giphy.com/media/qLWdMYX1NYF2g/giphy.gif'
    );
    img2.setAttribute('alt', 'img2');
    let src2 = document.getElementById('results');
    src2.appendChild(img2);
  } else {
    let p3 = document.createElement('p');
    let text3 = document.createTextNode('Loser! Please try again.');
    p3.appendChild(text3);
    resultPage.appendChild(p3);

    let img3 = document.createElement('img'); // <img> <img1>
    img3.setAttribute(
      'src',
      'https://media.giphy.com/media/pGYmjOL2vDiak/giphy.gif'
    );
    img3.setAttribute('alt', 'img3');
    let src3 = document.getElementById('results');
    src3.appendChild(img3);
  }

  // create a div for the two buttons on the resultpage
  let buttonsResultPage = document.createElement('div');
  resultPage.appendChild(buttonsResultPage);

  let checkYourAnswersButton = document.createElement('BUTTON');
  checkYourAnswersButton.setAttribute('id', 'check-answers-btn');
  let text1 = document.createTextNode('Check your answers');

  checkYourAnswersButton.appendChild(text1);
  buttonsResultPage.appendChild(checkYourAnswersButton);

  checkYourAnswersButton.addEventListener('click', showChosenAnswers);

  let tryAgainButton = document.createElement('BUTTON');
  tryAgainButton.setAttribute('id', 'try-again-btn');

  let text2 = document.createTextNode('Try again');

  tryAgainButton.appendChild(text2);
  buttonsResultPage.appendChild(tryAgainButton);

  tryAgainButton.onclick = function() {
    startQuiz();
    resultPage.style.display = 'none';
  };
}

function showChosenAnswers() {
  // creating a new header for the chosen answers in the dom
  let answerHeader = document.createElement('h1');
  let newText = document.createTextNode('Your answers:');
  answerHeader.appendChild(newText);
  let resultPage = document.getElementById('results');
  resultPage.appendChild(answerHeader);

  // Fragen Loop
  for (let i = 0; i < questions.length; i++) {
    let questionNoForChosenAnswers = questions[i];

    let questionElement = document.createElement('p');
    questionElement.innerHTML = `${i + 1}. ${questions[i].question}`;

    // let imageElement = document.createElement('img');
    // imageElement.innerHTML = `${questions[i].imgURL}`;

    let answerElement = document.createElement('p');
    // answerElement.innerText = questions[i].answers;

    resultPage.appendChild(questionElement);
    // resultPage.appendChild(imageElement);
    resultPage.appendChild(answerElement);

    // show all answers from the right question
    let answers = '';
    for (let j = 0; j < questions[i].answers.length; j++) {
      let className = '';
      if (questions[i].answers[j].correct === true) {
        className += 'correct ';
      } else {
        className += 'false ';
      }

      if (questions[i].answers[j].name === chosenAnswers[i]) {
        className += 'chosen ';
      }

      answers += `<p class="${className}">${questions[i].answers[j].name}</p>`;

      // console.log(answers);
    }

    answerElement.innerHTML = answers;
  }

}


// let resultPage = document.getElementById('results');
// resultPage.appendChild(newDiv);

//   chosenAnswers[currentQuestionNumber] = choices[choiceIndex];

// show the answers below the resultpage

// resultPage.innerText = 'Your results:';
// console.log(resultPage.innerText)

// let userScore = document.getElementById('score');

// // // save the answer if clicked
// function saveTheAnswer(chosenAnswer) {
//   for (let i = 0; i < 4; i++) {
//     questions[currentQuestionNumber].answers[i].selected = false;
//     if (i != chosenAnswer) {
//       document.getElementById('choice' + i).innerText =
//         questions[currentQuestionNumber].answers[i].name;
//     }
//   }

//   questions[currentQuestionNumber].answers[chosenAnswer].selected = true;

//   document.getElementById('choice' + chosenAnswer).innerText =
//     questions[currentQuestionNumber].answers[chosenAnswer].name + ' - selected';
// }

// Is Choice Selected?
// function isChoiceSelected() {
//   let choice0 = document.getElementById('btn0');
//   let choice1 = document.getElementById('btn1');
//   let choice2 = document.getElementById('btn2');
//   let choice3 = document.getElementById('btn3');
// }

function startQuiz() {
  document.getElementById('quiz').style.display = 'block';
  document.getElementById('start').style.display = 'none';
  // shuffledQuestions = questions.sort(()=> Math.random()-.5)
  currentQuestionNumber = 0;
  showProgress();
  showQuestions();
  showChoices();
  hideBackButton();
  hideNextButton();
  hideSubmitButton();
}

function showBackButton() {
  document.getElementById('back-btn').style.display = 'block';
}
function hideBackButton() {
  document.getElementById('back-btn').style.display = 'none';
}

function hideNextButton() {
  document.getElementById('next-btn').style.display = 'none';
}
function showNextButton() {
  document.getElementById('next-btn').style.display = 'block';
}

function showSubmitButton() {
  document.getElementById('submit-btn').style.display = 'block';
}
function hideSubmitButton() {
  document.getElementById('submit-btn').style.display = 'none';
}

// Timer
// let minutesLabel = document.getElementById('minutes');
// let secondsLabel = document.getElementById('seconds');
// let totalSeconds = 0;
// setInterval(setTime, 1000);

// function setTime() {
//   ++totalSeconds;
//   secondsLabel.innerHTML = pad(totalSeconds % 60);
//   minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
// }

// function pad(val) {
//   let valString = val + '';
//   if (valString.length < 2) {
//     return '0' + valString;
//   } else {
//     return valString;
//   };
