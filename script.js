const allButton = document.getElementById('choose-buttons')
const pureButton = document.getElementById('pure-btn')
const salahButton = document.getElementById('salah-btn')
const zakatButton = document.getElementById('zakat-btn')
const fastingButton = document.getElementById('fasting-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const chooseScreen = document.getElementById('choose-container')
const answerButtonsElement = document.getElementById('answer-buttons')
const chooseFiqhButton = document.getElementById('choose')
const hideControls = document.getElementById('chooseControls')
const startButton = document.getElementById('start-btn')
const qNum = document.getElementById('number')
const scoreContainer = document.getElementById('score-screen')

let shuffledQuestions, currentQuestionIndex
let numCorrect = -10
let questionNum = 0

startButton.addEventListener('click', returnHome)
pureButton.addEventListener('click', () => startTrivia(pureQuestions))
salahButton.addEventListener('click', () => startTrivia(salahQuestions))
zakatButton.addEventListener('click', () => startTrivia(zakatQuestions))
fastingButton.addEventListener('click', () => startTrivia(fastingQuestions))
nextButton.addEventListener('click', () => {
  document.getElementById("answer-buttons").style.pointerEvents = "auto";
  currentQuestionIndex++
  setNextQuestion()
})

// Return to home screen
function returnHome() {
  allButton.classList.remove('hide')
  questionContainerElement.classList.add('hide')
  chooseFiqhButton.classList.remove('hide')
  scoreContainer.classList.add('hide')
  numCorrect = -10;
  document.getElementById("answer-buttons").style.pointerEvents = "auto";
}

// Start trivia
function startTrivia(questions) {
  allButton.classList.add('hide')
  chooseFiqhButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}


function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  document.getElementById("answer-buttons").style.pointerEvents = "none";
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    /*  ------- This is to make a seperate "View Score" button ------------
    nextButton.classList.remove('hide')
    document.getElementById('next-btn').innerHTML = "View Score"
    nextButton.addEventListener('click', checkScore)
    */
    nextButton.classList.add('hide')
    scoreContainer.classList.remove('hide')
    document.getElementById('score').innerHTML = "Your score is: " + numCorrect + "/10"
  }
}

/* ------- This is to make a seperate "View Score" button ------------
function checkScore(){
    questionContainerElement.classList.add('hide')
    scoreContainer.classList.remove('hide')
    document.getElementById('score').innerHTML = "Your score is: " + numCorrect + "/10"
}
*/

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    numCorrect++
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

// Purification question bank
const pureQuestions = [
  {
    question: 'Which of the following is a pillar of wudu?',
    answers: [
      { text: 'Running fingers through a thick beard', correct: false },
      { text: 'Doing the actions three times each', correct: false },
      { text: 'Wiping part of the head', correct: true },
      { text: 'All of the above', correct: false },
    ]
  },
  {
    question: 'Which utensils are you allowed to use?',
    answers: [
      { text: 'spoons made of silver', correct: false },
      { text: 'cups made of gold', correct: false },
      { text: 'plates made of bamboo', correct: true },
      { text: 'all of the above', correct: false }
    ]
  },
  {
    question: 'When is it NOT recommended to use the miswak (toothstick)?',
    answers: [
      { text: 'When fasting has started', correct: true },
      { text: 'When the smell of your mouth changes', correct: false },
      { text: 'When waking up from sleep', correct: false },
      { text: 'When preparing for the salah', correct: false }
    ]
  },
  {
    question: 'How long can one wipe over their socks for wudu?',
    answers: [
      { text: 'Three days and three nights for the resident of a city', correct: false },
      { text: 'Five days and five nights for the traveler', correct: false },
      { text: 'One day and one night for the traveler', correct: false },
      { text: 'One day and one night for the resident of a city', correct: true }
    ]
  },
  {
    question: 'Which of the following breaks your wudu?',
    answers: [
      { text: 'Losing your mind due to sickness', correct: true },
      { text: 'Eating seafood', correct: false },
      { text: 'Touching the water in a swamp', correct: false },
      { text: 'Excessive crying', correct: false }
    ]
  },
  {
    question: 'Which of the following is NOT a pillar of Ghusl (bath)?',
    answers: [
      { text: 'Intention', correct: false },
      { text: 'Removing impurity on the body', correct: false },
      { text: 'Water reaching everywhere', correct: false },
      { text: 'Saying Bismillah', correct: true }
    ]
  },
  {
    question: 'Which of the following are the pillars of tayyamumm (dry ablution)?',
    answers: [
      { text: 'Intention and making full wudu with dirt/sand', correct: false },
      { text: 'Intention and wiping the face, hands and arms in order.', correct: true },
      { text: 'Making wudu with water than dry yourself with dirt', correct: false },
      { text: 'None of the above', correct: false }
    ]
  },
  {
    question: 'Which of the following is impure (najis) when it found already dead?',
    answers: [
      { text: 'Humans', correct: false },
      { text: 'Sheep', correct: true },
      { text: 'Locusts', correct: false },
      { text: 'Fish', correct: false }
    ]
  },
  {
    question: 'Which of the following animals is pure (i.e. not najis)?',
    answers: [
      { text: 'Boar', correct: false },
      { text: 'Mouse', correct: true },
      { text: 'Pig', correct: false },
      { text: 'Dog', correct: false }
    ]
  },
  {
    question: 'ًWhich of the following is allowed for a woman during menstruation/post-natal bleeding?',
    answers: [
      { text: 'Giving Zakat', correct: true },
      { text: 'Praying Salah', correct: false },
      { text: 'Fasting', correct: false },
      { text: 'Doing Tawaf around the Kaaba', correct: false }
    ]
  }
]

// Salah question bank
const salahQuestions = [
  {
    question: 'Which of the following people would be excused from praying?',
    answers: [
      { text: 'Sick man', correct: false },
      { text: 'Warrior on the battlefield', correct: false },
      { text: '7-year old boy', correct: true },
      { text: 'All of the above', correct: false }
    ]
  },
  {
    question: 'All of the following are pillars of the salah except:',
    answers: [
      { text: 'Opening Takbeer', correct: false },
      { text: 'Making the Iqama', correct: true },
      { text: 'Reading surat al-Fatiha', correct: false },
      { text: 'Standing up if you are able to', correct: false }
    ]
  },
  {
    question: 'All of the following invalidates your salah except:',
    answers: [
      { text: 'Eating', correct: false },
      { text: 'Drinking', correct: false },
      { text: 'Laughing', correct: false },
      { text: 'Crying', correct: true }
    ]
  },
  {
    question: 'If you are on your last rakah and you realize you didn\'t recite al-fatiha in the first rakah, what should you do?',
    answers: [
      { text: 'Just do Sujood As-sahw (prostration of forgetfulness)', correct: false },
      { text: 'Consider the first rakah void, so add another rakah and do sujood as-sahw at the end', correct: true },
      { text: 'Break the salah and repeat it', correct: false },
      { text: 'Any of the above are permissible', correct: false }
    ]
  },
  {
    question: 'In which of the following times should you NOT pray a voluntary salah?',
    answers: [
      { text: 'Directly after sunrise', correct: false },
      { text: 'During sunset', correct: false },
      { text: 'Before dhuhr when the sun is at it\'s highest', correct: false },
      { text: 'All of the above', correct: true }
    ]
  },
  {
    question: 'Which of the following is NOT a pillar of Jummah?',
    answers: [
      { text: 'Two khutbahs', correct: false },
      { text: 'Praying 2 rakahs in congregation', correct: false },
      { text: 'Sitting between the two khutbahs', correct: false },
      { text: 'They are all pillars of Jummah', correct: true }
    ]
  },
  {
    question: 'All the conditions for jummah to be obligatory on you are:',
    answers: [
      { text: 'Being a Muslim man', correct: false },
      { text: 'Muslim man, hit puberty, healthy, able to go', correct: false },
      { text: 'Muslim man, hit puberty, free, healthy, sane, able to go', correct: true },
      { text: 'Muslim men and women, hit puberty, free, healthy, sane, able to go', correct: false }
    ]
  },
  {
    question: 'Which of the following salawaat do not have any sujood?',
    answers: [
      { text: 'Salat al-Khawf (Prayer during times of war)', correct: false },
      { text: 'Salat Al-Janazah (Funeral prayer)', correct: true },
      { text: 'Salat Al-Istisqa (Prayer for rain)', correct: false },
      { text: 'All of the above', correct: false }
    ]
  },
  {
    question: 'You can shorten your salah in all the following cases, except:',
    answers: [
      { text: 'When traveling for 2 days', correct: false },
      { text: 'When traveling to the land of the disbelievers ', correct: false },
      { text: 'Traveling for the purpose of sinning', correct: true },
      { text: 'Completing your journey within 10 hours', correct: false }
    ]
  },
  {
    question: 'Which value is correct regarding the five daily fard prayers (total in one day)?',
    answers: [
      { text: '32 sadja (prostration)', correct: false },
      { text: '10 salams (at the end of the prayer)', correct: true },
      { text: '19 rukoo', correct: false },
      { text: 'None of the above', correct: false }
    ]
  }
]

// Zakat question bank
const zakatQuestions = [
  {
    question: 'True or False: Zakat is required on crops?',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ]
  },
  {
    question: 'The following fall under the livestock (المواشي) category of zakat, except:',
    answers: [
      { text: 'camel', correct: false },
      { text: 'cow', correct: false },
      { text: 'chicken', correct: true },
      { text: 'sheep', correct: false }
    ]
  },
  {
    question: 'True or False: Zakat is required on your merchandise for your business?',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ]
  },
  {
    question: 'The [first] nisab for camels is...',
    answers: [
      { text: '5 camels', correct: true },
      { text: '3 camels', correct: false },
      { text: '10 camels', correct: false },
      { text: '8 camels', correct: false }
    ]
  },
  {
    question: 'The [first] nisab for cows is...',
    answers: [
      { text: '10 cows', correct: false },
      { text: '20 cows', correct: true },
      { text: '30 cows', correct: false },
      { text: '40 cows', correct: false }
    ]
  },
  {
    question: 'The [first] nisab for sheep is...',
    answers: [
      { text: '20 sheep', correct: false },
      { text: '25 sheep', correct: false },
      { text: '30 sheep', correct: false },
      { text: '40 sheep', correct: true }
    ]
  },
  {
    question: 'True or False: Zakat can NOT be given to someone from the Banu Hashim tribe?',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false },
    ]
  },
  {
    question: 'Is Zakat al-Fitr obligatory or voluntary?',
    answers: [
      { text: 'obligatory', correct: true },
      { text: 'voluntary', correct: false }
    ]
  },
  {
    question: 'True or False: You pay more zakat on crops that have been mostly watered by the rain.',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ]
  },
  {
    question: 'How long must you hold the wealth, in terms of days, before it is zakat-eligible?',
    answers: [
      { text: '365 days', correct: false },
      { text: '354 or 355 days', correct: true },
      { text: '300 days', correct: false },
      { text: 'None of the above', correct: false }
    ]
  }
]

// Fasting question bank
const fastingQuestions = [
  {
    question: 'All of the following are pillars of fasting, except:',
    answers: [
      { text: 'Intention', correct: false },
      { text: 'Refraining from marital relations', correct: false },
      { text: 'Refraining from intentional vomitting', correct: false },
      { text: 'Refraining from useless speech', correct: true }
    ]
  },
  {
    question: 'Which of the following is NOT a recommended action while fasting?',
    answers: [
      { text: 'Delaying suhoor (pre-fajr meal)', correct: false },
      { text: 'Giving up pointless speech', correct: false },
      { text: 'Using the miswak (toothstick)', correct: true },
      { text: 'Hurrying to break your fast after maghrib', correct: false }
    ]
  },
  {
    question: 'It is haraam to fast on this day: ',
    answers: [
      { text: 'Eid', correct: true },
      { text: 'The first day of Shaban', correct: false },
      { text: 'The day of Arafaat', correct: false },
      { text: 'The day before Ashura', correct: false }
    ]
  },
  {
    question: 'If someone has marital relations with his wife in the daytime of Ramadan...',
    answers: [
      { text: 'The day is valid, but he must repent', correct: false },
      { text: 'It is sufficient for him to simply make up the day', correct: false },
      { text: 'He must make up the day and offer the kaffaara (expiation)', correct: true },
      { text: 'He must make up the entire month of Ramadan before the next year', correct: false }
    ]
  },
  {
    question: 'What is the first level of kaffaara that one should do if they are able to?',
    answers: [
      { text: 'Feed 60 poor people', correct: false },
      { text: 'Fast 2 consecutive months', correct: false },
      { text: 'Feed 30 poor people', correct: false },
      { text: 'Free a believing slave', correct: true }
    ]
  },
  {
    question: 'What is the second level of kaffaara that one should do if they cannot perform the first?',
    answers: [
      { text: 'Feed 60 poor people', correct: false },
      { text: 'Fast 2 consecutive months', correct: true },
      { text: 'Feed 30 poor people', correct: false },
      { text: 'Free a believing slave', correct: false }
    ]
  },
  {
    question: 'What is the third level of kaffaara that one should do if they cannot perform the first two?',
    answers: [
      { text: 'Feed 60 poor people', correct: true },
      { text: 'Fast 2 consecutive months', correct: false },
      { text: 'Feed 30 poor people', correct: false },
      { text: 'Free a believing slave', correct: false }
    ]
  },
  {
    question: 'An old man who does not fast because is unable to should...',
    answers: [
      { text: 'Not make up/pay anything, because he is excused', correct: false },
      { text: 'Feed a poor person for everyday he misses', correct: true },
      { text: 'Offer the kaffaara just as one who had relations with his wife during the day', correct: false },
      { text: 'Free a believing slave for everyday he misses', correct: false }
    ]
  },
  {
    question: 'True or False: A pregnant/breastfeeding woman can break her fast (and make it up later) if she fears for...',
    answers: [
      { text: 'Her baby', correct: true },
      { text: 'Her husband', correct: false },
      { text: 'Her father', correct: false },
      { text: 'Her mother', correct: false }
    ]
  },
  {
    question: 'The traveler and the one who is sick can break their fast, and...',
    answers: [
      { text: 'They do not have to make it up', correct: false },
      { text: 'They must make it up', correct: true },
      { text: 'They must pay the kaffaara', correct: false },
      { text: 'They must make it up and pay the kaffaara', correct: false }
    ]
  }
]