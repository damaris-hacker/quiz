const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', startQuiz);

let currentQuestionNumber = 0;


// startQuiz function
function startQuiz() {
  document.getElementById('quiz').style.display = 'block';
  document.getElementById('start').style.display = 'none';
  currentQuestionNumber = 0;
  showProgress();
  showQuestions();
  showTopic();
  showChoices();
  hideBackButton();
  hideNextButton();
  hideSubmitButton();
}

// counter of questions "Progress"
function showProgress() {
  let element = document.getElementById('progress');
  element.innerHTML =
    'Question ' + (currentQuestionNumber + 1) + ' of ' + questions.length;
}

// showQuestions function

function showQuestions() {
  let element = document.getElementById('question');

  // clear questions before re-populating it
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
  let newParagraphForQuestion = document.createElement('p');
  let textForQuestion = document.createTextNode(
    questions[currentQuestionNumber].question
  );
  newParagraphForQuestion.appendChild(textForQuestion);
  newParagraphForQuestion.className = 'theQuestion';
  element.appendChild(newParagraphForQuestion);

  if ('imgURL' in questions[currentQuestionNumber]) {
    let imgObj = document.createElement('img'); // <img> <img1>
    imgObj.setAttribute('src', questions[currentQuestionNumber].imgURL);
    imgObj.setAttribute('alt', 'imgObj');
    let x = document.getElementById('question');
    x.appendChild(imgObj);
    imgObj.className = 'theImage';
  }
}

// showTopic function
function showTopic () {
  const topicQuestion = document.getElementById('topic');
  topicQuestion.innerHTML = questions[currentQuestionNumber].topic;
  }

// let enteredPoints = 0; // challenge 1

// showChoices function
function showChoices() {
  // answers of the question object
  let choices = questions[currentQuestionNumber].answers;
  // console.log(questions[currentQuestionNumber].answers); // is logging the current question-no and the answers to the question
  for (let i = 0; i < choices.length; i++) {
    // choiceButton
    let choiceButton = document.getElementById('btn' + i);

    // console.log(choiceButton);

    choiceButton.onclick = function() {
      // enteredPoints ++; // challenge 1
      if (currentQuestionNumber === questions.length - 1) {
        hideNextButton();
      } else {
        showNextButton();
      }

      if (currentQuestionNumber === questions.length - 1) {
        showSubmitButton();
      } else {
        hideSubmitButton();
      }
      saveTheAnswer(currentQuestionNumber, i); // challenge 2
    };
    // show choices:
    let choiceContent = document.getElementById('choice' + i);
    choiceContent.innerText = choices[i].name;
  }
}


// hide/ show buttons
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


// next & back - button

const nextButton = document.getElementById('next-btn');
const backButton = document.getElementById('back-btn');

// onclick of button-next go to the next question and save the answer
nextButton.addEventListener('click', showNextQuestion);
backButton.addEventListener('click', showPreviousQuestion);


// showPreviousQuestion function
function showPreviousQuestion() {
  currentQuestionNumber = currentQuestionNumber - 1;
  showQuestions();
  showTopic();
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

// showNextQuestion function

function showNextQuestion() {
  currentQuestionNumber = currentQuestionNumber + 1;
  showProgress();
  showQuestions();
  showTopic();
  showChoices();
  hideNextButton();
  if (currentQuestionNumber > 0) {
    showBackButton();
  } else {
    hideBackButton();
  }
}



// save the answer & have an array with the chosen answers

let chosenAnswers = []; // challenge 2

function saveTheAnswer(currentQuestionNumber, choiceIndex) {
  let choices = questions[currentQuestionNumber].answers;
  // that is the clicked answer with question index 
  // console.log(currentQuestionNumber, choices[choiceIndex]);
  chosenAnswers[currentQuestionNumber] = choices[choiceIndex].name;
  console.log(chosenAnswers);
}

// submit Button
const submitButton = document.getElementById('submit-btn');
submitButton.addEventListener('click', showResults);

// showResults function 
function showResults() {
  let resultPage = document.getElementById('results');
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('results').style.display = 'block';

  // clear result page before re-populating it
  while (resultPage.firstChild) {
    resultPage.removeChild(resultPage.lastChild);
  }

  // create image logo JS / header 'Javascript Quiz'

  let jsLogo = document.createElement('img');
  jsLogo.setAttribute('src', 'images/1024.png');
  jsLogo.setAttribute('class', 'rund');

  resultPage.appendChild(jsLogo);

  let h1JS = document.createElement('h1');
  let texth1 = document.createTextNode('JavaScript Quiz');
  h1JS.appendChild(texth1);
  resultPage.appendChild(h1JS);

  // header
  let headerResults = document.createElement('h2');
  let text = document.createTextNode('Your results:');
  headerResults.appendChild(text);
  resultPage.appendChild(headerResults);

  // resultscore

  let resultscore = document.createElement('div');
  resultscore.className = 'resultscore';
  resultPage.appendChild(resultscore);

  let enteredPoints = 0; // challenge 1: solution

  for (let i = 0; i < questions.length; i++) {
    for (let j = 0; j < questions[i].answers.length; j++) {
      // answer to every question
      let answer = questions[i].answers[j];
      // console.log(questions[i].answers[j]);
      // console.log(chosenAnswers[i]);
      if (answer.correct === true) {
        if (chosenAnswers[i] === answer.name) {
          enteredPoints++;
        }
      }
    }
  }


  // forEach solution: 
  // questions.forEach((element, i) => {
  //   element.answers.forEach(answer => {
  //     if(answer.correct === true) {
  //       if(chosenAnswers[i] === answer.name) {
  //         enteredPoints++;
  //       }
  //     }
  //   });
  // });

  // x right answers of x
  let rightAnswers = document.createElement('p');
  let textAns = document.createTextNode(
    `${enteredPoints} out of ${questions.length}`
  );
  rightAnswers.appendChild(textAns);
  rightAnswers.id = 'rightanswers';
  resultscore.appendChild(rightAnswers);

  // percent
  let totalPoints = questions.length;
  let percent = (enteredPoints * 100) / totalPoints;
  let roundedPercent = Math.round(percent);

  let userPercent = document.createElement('p');
  let userPercentElement = document.createTextNode(roundedPercent + ' %');
  userPercent.appendChild(userPercentElement);
  userPercent.id = 'percent';

  resultscore.appendChild(userPercent);

  // show sentence & gif depending on percent
  if (percent >= 80) {
    let p1 = document.createElement('p');
    let text1 = document.createTextNode('Impressive. You did an amazing job!');
    p1.appendChild(text1);
    p1.id = 'result-text';
    resultscore.appendChild(p1);

    let img1 = document.createElement('img');
    img1.setAttribute(
      'src',
      'https://media.giphy.com/media/YRuFixSNWFVcXaxpmX/giphy.gif'
    );
    img1.setAttribute('alt', 'img1');
    img1.className = 'result-img';
    let src1 = document.getElementById('results');

    src1.appendChild(img1);
  } else if (percent >= 45) {
    let p2 = document.createElement('p');
    let text2 = document.createTextNode('Well, I think you can do better…');
    p2.appendChild(text2);
    p2.id = 'result-text';
    resultscore.appendChild(p2);

    let img2 = document.createElement('img');
    img2.setAttribute(
      'src',
      'https://media.giphy.com/media/qLWdMYX1NYF2g/giphy.gif'
    );
    img2.setAttribute('alt', 'img2');
    img2.className = 'result-img';
    let src2 = document.getElementById('results');
    src2.appendChild(img2);
  } else {
    let p3 = document.createElement('p');
    let text3 = document.createTextNode('Loser! Please try again.');
    p3.appendChild(text3);
    p3.id = 'result-text';
    resultscore.appendChild(p3);

    let img3 = document.createElement('img'); 
    img3.setAttribute(
      'src',
      'https://media.giphy.com/media/pGYmjOL2vDiak/giphy.gif'
    );
    img3.setAttribute('alt', 'img3');
    img3.className = 'result-img';
    let src3 = document.getElementById('results');
    src3.appendChild(img3);
  }

  // create a div for the two buttons on the resultpage
  let buttonsResultPage = document.createElement('div');
  buttonsResultPage.className = 'resultpage-btns';
  resultPage.appendChild(buttonsResultPage);

  //check your answers button
  let checkYourAnswersButton = document.createElement('button');
  checkYourAnswersButton.setAttribute('id', 'check-answers-btn');
  let text1 = document.createTextNode('Check your answers');

  checkYourAnswersButton.appendChild(text1);
  buttonsResultPage.appendChild(checkYourAnswersButton);

  checkYourAnswersButton.addEventListener('click', showChosenAnswers);

  // try again button
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
// showChosenAnswers function 
function showChosenAnswers() {
  let resultPage = document.getElementById('results');

  // creating a new header for the chosen answers in the dom
  let answerHeader = document.createElement('h2');
  let newText = document.createTextNode('Your answers:');
  answerHeader.appendChild(newText);
  answerHeader.id = 'answers';
  resultPage.appendChild(answerHeader);

// new div for answers
  let newDivForAnswers = document.createElement('div');
  newDivForAnswers.className = 'answers';
  resultPage.appendChild(newDivForAnswers);



  // question loop 
  for (let i = 0; i < questions.length; i++) {
    let answerCard = document.createElement("div");
    answerCard.className = "answerCard"
    let questionNoForChosenAnswers = questions[i];

    let questionElement = document.createElement('p');
    questionElement.id = 'questionElement';
    questionElement.innerHTML = `${i + 1}. ${questions[i].question}`;
    answerCard.appendChild(questionElement)

    newDivForAnswers.appendChild(answerCard);

    // image of the answers:
    if ('imgURL' in questions[i]) {
      let imageElement = document.createElement('img');
      imageElement.setAttribute('src', questions[i].imgURL);
      imageElement.setAttribute('alt', 'imageForChosenQuestion');
      answerCard.appendChild(imageElement)
      newDivForAnswers.appendChild(answerCard);
    }

    let answerElement = document.createElement('p');
    answerElement.id= 'answerElement';
    answerCard.appendChild(answerElement)
    newDivForAnswers.appendChild(answerCard);
    

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

    }

    answerElement.innerHTML = answers;
  }
}

// Questions 
const questions = [
  {
    question: 'What will be printed to the console?',
    imgURL: 'images/Mod1-1.png',
    topic: 'Module 1: Introduction JS',

    answers: [
      { name: 'half of 100 is 100/2' },
      { name: 'half of 100 is ${100 / 2}' },
      { name: 'half of 100 is 50', correct: true },
      { name: 'NaN' }
    ],
  },
  {
    question: 'What will be printed to the console?',
    imgURL: 'images/Mod1-2.png',
    topic: 'Module 1: Introduction JS',

    answers: [
      { name: 'true / false / false / true', correct: true  },
      { name: 'false / true / false /false' },
      { name: 'NaN'},
      { name: 'undefined' }
    ],
  },
  {
    question: 'If you enter 5, 100 and your name, what will be printed to the console?',
    imgURL:'images/Mod2-1.png',
    topic: 'Module 2: Conditionals & Loops',

    answers: [
      { name: 'small, medium , undefined' },
      { name: 'small, large, undefined', correct: true },
      { name: 'small, medium, "Your Name"' },
      { name: 'small, medium, NaN' }
    ],
  },
  {
    question: 'What happens when you create an infinite loop?',
    topic: 'Module 2: Conditionals & Loops',

    answers: [
      { name: 'The programm will go through the loop and stops until the condition has been met.' },
      { name: 'Your computer becomes very responsive to your commands.' },
      { name: 'The computer will stop working straight away.' },
      { name: `The programm will never finish running. You will have to close the tab you're working in or close the whole browser`, correct: true }
    ],
  },

  {
    question: 'What will be printed to the console?',
    imgURL:'images/Mod2-3.png',
    topic: 'Module 2: Conditionals & Loops',

    answers: [
      { name: '0,1,2....12' },
      { name: '0,2,4,6,...14', correct: true },
      { name: '2,4,6,8...12' },
      { name: '0,1,2,...14'}
    ],
  },

  {
    question: 'How do you define a function?',
  
    topic: 'Module 3: Functions',

    answers: [
      { name: 'helloFunction () {}' },
      { name: 'console.log(function () {})' },
      { name: 'function helloFunction(){}', correct: true  },
      { name: 'let myFunction = () {}'}
    ],
  },

  {
    question: 'Can you use the variable carName outside of the function?',
  imgURL:'images/Mod3-2.png',
    topic: 'Module 3: Functions',

    answers: [
      { name: 'Yes' },
      { name: 'No', correct: true },
      { name: 'Who knows' },
      { name: 'Yes & No' },

    ],
  },
  {
    question: 'What will be printed to the console?',
  imgURL:'images/Mod3-3.png',
    topic: 'Module 3: Functions',

    answers: [
      { name: '16',correct:true },
      { name: '16, true, "hedgehog"' },
      { name: '4, true, "hedgehog"' },
      { name: '16(4, true, "hedgehog")' },

    ],
  },

  {
    question: 'What will be printed to the console?',
  imgURL:'images/Mod3-4.png',
    topic: 'Module 3: Functions',

    answers: [
      { name: '5, 10' },
      { name: '5, 5' },
      { name: '50, 100' },
      { name: '50, 10',correct:true  },

    ],
  },

  {
    question: 'What is printed?',
  imgURL:'images/Mod4-1.png',
    topic: 'Module 4: Arrays & Objects',

    answers: [
      { name: '3, 2, 3 ' },
      { name: '5, 2, 3', correct:true },
      { name: '5, 3, 2' },
      { name: '3, 0, 2' },

    ],
  },

  {
    question: 'How do you access properties in Javascript?',
    topic: 'Module 4: Arrays & Objects',

    answers: [
      { name: 'with a () ' },
      { name: 'with a dot and with square brackets', correct:true },
      { name: 'with a _ ' },
      { name: 'with a {}' },

    ],
  },

  {
    question: 'What will be printed?',
    imgURL:'images/Mod4-3.png',
    topic: 'Module 4: Arrays & Objects',

    answers: [
      { name: '[1, 2, 3, 4, 5], 5, [1, 2, 3, 4]', correct:true },
      { name: '[1, 2, 3], [], []' },
      { name: '[1, 2, 3], [], [1, 2, 3]' },
      { name: '[1, 2, 3, 4, 5], [1, 2, 3], [1, 2, 3]' },

    ],
  },

  {
    question: `What happens when you read a property of an object that doesn't exist?`,
    topic: 'Module 4: Arrays & Objects',

    answers: [
      { name: 'TypeError' },
      { name: 'NaN' },
      { name: 'undefined', correct:true},
      { name: 'SyntaxError' },

    ],
  },

  {
    question: 'What does the assign function do?',
    imgURL:'images/Mod4-5.png',
    topic: 'Module 4: Arrays & Objects',

    answers: [
      { name: '{a: 1, b: 2}' },
      { name: '{a: 1, b: 3, c: 4}', correct:true },
      { name: '{b: 3, c: 4}'},
      { name: '{a: 1, b: 2} {b: 3, c: 4}' },

    ],
  },

  {
    question: 'What will be printed to the console?',
    imgURL:'images/Mod4-6.png',
    topic: 'Module 4: Arrays & Objects',

    answers: [
      { name: '["a", "b", "c", "d", "e"]' },
      { name: '["a", "c", "d", "e"]'},
      { name: '["a", "b", "d", "e"] ', correct:true},
      { name: '["a", "b", "c", "e"]' },

    ],
  },


  {
    question: 'What will be printed to the console?',
    imgURL:'images/Mod4-7.png',
    topic: 'Module 4: Arrays & Objects',

    answers: [
      { name: '["will", "fully", "understand"]' },
      { name: '["will", "never", "understand"]'},
      { name: '["will", ...words, "understand"] '},
      { name: '["will", "never", "fully", "understand"]', correct:true },

    ],
  },

  {
    question: 'Why should you use .forEach or why for loop?',
    topic: 'Module 4: Arrays & Objects',

    answers: [
      { name: 'There is no difference between forEach and for loop.' },
      { name: 'forEach: lower chance of accidental errors, easier to read, less code lines, for Loop: you can break out of a loop with an if statement and break.', correct:true},
      { name: 'forEach has higher performance. '},
      { name: 'for loop has higher performance.'},

    ],
  },

  {
    question: 'What is special about the filter function?',
    topic: 'Module 4: Arrays & Objects',

    answers: [
      { name: 'It changes the given array and filters it to the condition.' },
      { name: 'It builds a new array with only the elements that passed the test. It also changes the array given.'},
      { name: 'It creates a new array with the condition and adds the passed elements after the elements of the given array.'},
      { name: `It builds up a new array with only the elements that passed the test. It doesn't modify the array given.`, correct:true},

    ],
  },


  {
    question: 'What will you see on the website in the demo-paragraph?',
    imgURL:'images/Mod4-10.png',
    topic: 'Module 4: Arrays & Objects',

    answers: [
      { name: '650, 440, 120, 40', correct:true },
      { name: '65,44,12,40'},
      { name: '64*10, 44*10, 12*10, 40*10'},
      { name: '650'},

    ],
  },


  {
    question: 'What does the reduce() function do?',
    imgURL:'images/Mod4-11.png',
    topic: 'Module 4: Arrays & Objects',

    answers: [
      { name: 'It reduces every element of the array.' },
      { name: 'It reduces the array by half.'},
      { name: 'It reduces the array to a single value.', correct:true},
      { name: 'It creates a new array with only one element.'},

    ],
  },


  {
    question: 'We created a new instance of Hero using the new keyword, and assign some values. What will be printed to the console?',
    imgURL:'images/Mod5-1.png',
    topic: 'Module 5: Class & Inheritance',

    answers: [
      { name: 'Hero {name: "Damaris", level: 1}', correct:true },
      { name: 'Damaris says Hello.'},
      { name: 'Damaris, 1; Damaris says Hello.'},
      { name: 'Hero {this.name: "Damaris", this.level: 1}.'},

    ],
  },

  {
    question: 'A class created with a class inheritance inherits all the methods from another class. What will be printed to the console?',
    imgURL:'images/Mod5-2.png',
    topic: 'Module 5: Class & Inheritance',

    answers: [
      { name: 'I have a Ford, it is a this.model' },
      { name: ', it is a Mustang'},
      { name: 'I have a Ford.'},
      { name: 'I have a Ford, it is a Mustang', correct:true},

    ],
  },

  {
    question: 'What is the Document Object Model (DOM)?',
    topic: 'Module 6: Document Object Model (DOM)',

    answers: [
      { name: 'The Document Object Model (DOM) can be defined by functions of Javascript.' },
      { name: 'The Document Object Model (DOM) is a tool, that can be used to access elements of HTML.'},
      { name: 'The DOM is an object-based representation of the source HTML document.  It defines the logical structure of documents and the way a document is accessed and manipulated.', correct:true},
      { name: `The Document Object Model (DOM) is a JavaScript Framework, which let's you manipulate elements of HTML.`},

    ],
  },

  {
    question: `How can you get the h1-element with DOM?`,
    imgURL:'images/Mod6-2.png',
    topic: 'Module 6: Document Object Model (DOM)',

    answers: [
      { name: `document.getElementsByTagName('h1')`, correct:true },
      { name: `getElementsByTagName('h1')`},
      { name: `document.getElementByTagName('h1')`},
      { name: `document.getElementById('h1')`},

    ],
  },

  {
    question: `How do you add an image element to the DOM?`,
    topic: 'Module 6: Document Object Model (DOM)',

    answers: [
      { name: 'Create an empty img element using document.createElement() method.' },
      { name: `Create an empty img element using document.createElement() method. Then set its attributes like (src, height, width, alt, title etc).
      Finally, insert it into the document with append.Child.`, correct: true},
      { name: 'Create an img element using document.createElement and add into the parentheses the source.'},
      { name: 'Create an empty img element using document.createElement() method. Insert it into the document with append.Child.'},

    ],
  },

];
