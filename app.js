const question = [
    {
        topic: 'RHOBH',
        question: 'What is your star sign?',
        possibleAnswers: [
          'Fire (Aries, Sagittarius, Leo)',
          'Air (Gemini, Libra, Aquarius)',
          'Earth (Taurus, Virgo, Capricorn)',
          'Water (Cancer, Scorpio, Pisces)'
        ]
      },
      {
        topic: 'RHOBH',
        question: 'Pick a drink:',
        possibleAnswers: [
          'Champagne',
          'Tequila',
          'Vodka Soda',
          'Rosé'
        ]
      }
    ];

let currentQuestion = 0;

// DOM Elements
const homepage = document.getElementById('homepage');
const startBtn = document.getElementById('startBtn');
const quiz = document.getElementById('quiz');
const questionContainer = document.getElementById('questionContainer');
const answerContainer = document.getElementById('answerContainer');
const quizProgress = document.getElementById('quizProgress');

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    homepage.classList.add('hidden');
    quiz.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const current = questions[currentQuestion];
    quizProgress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionContainer.textContent = current.question;
  
    // Clear previous answers
    answerContainer.innerHTML = '';
  
    current.possibleAnswers.forEach(answer => {
      const btn = document.createElement('button');
      btn.textContent = answer;
      btn.addEventListener('click', () => selectAnswer(answer));
      answerContainer.appendChild(btn);
    });
  }

function selectAnswer(answer) {
    // You can add tally logic here later
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

function showResult() {
    quiz.innerHTML = `
      <h2>You're Most Like: Lisa Vanderpump!</h2>
      <p>Elegant, sharp-witted, and never without a fabulous one-liner.</p>
      <button onclick="location.reload()">Retake Quiz</button>
    `;
  }