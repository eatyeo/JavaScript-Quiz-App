let scores = {
  'Lisa Vanderpump': 0,
  'Kim Richards': 0,
  'Kyle Richards': 0,
  'Lisa Rinna': 0,
  'Brandi Glanville': 0,
  'null': 0
};

const questions = [
  {
    topic: 'RHOBH',
    question: 'What is your star sign?',
    possibleAnswers: [
      { text: 'Fire (Aries, Sagittarius, Leo)', personality: ['null'] },
      { text: 'Air (Gemini, Libra, Aquarius)', personality: ['null'] },
      { text: 'Earth (Taurus, Virgo, Capricorn)', personality: ['Lisa Vanderpump', 'Kim Richards', 'Kyle Richards'] },
      { text: 'Water (Cancer, Scorpio, Pisces)', personality: ['Lisa Rinna', 'Brandi Glanville'] }
    ]
  },
  {
    topic: 'RHOBH',
    question: 'Pick a drink:',
    possibleAnswers: [
      { text: 'Rosé', personality: ['Lisa Vanderpump'] },
      { text: 'White Wine', personality: ['Kyle Richards'] },
      { text: 'Vodka Soda (a lot of it)', personality: ['Brandi Glanville'] },
      { text: 'Espresso Martini', personality: ['Lisa Rinna'] },
      { text: 'Water, I don’t drink anymore', personality: ['Kim Richards'] }
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
      btn.textContent = answer.text;
      btn.addEventListener('click', () => selectAnswer(answer.personality));
      answerContainer.appendChild(btn);
    });
  }

  function selectAnswer(answer) {
    answer.forEach(name => {
      scores[name] = (scores[name] || 0) + 1;
    });
  
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    let maxScore = 0;
    let topPersonalities = [];
  
    for (const [personality, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        topPersonalities = [personality];
      } else if (score === maxScore && score !== 0) {
        topPersonalities.push(personality);
      }
    }
  
    let resultHTML = '';
  
    if (topPersonalities.length === 1) {
      const top = topPersonalities[0];
      resultHTML = `
        <h2>You're Most Like: ${top}!</h2>
        <p>${getPersonalityDescription(top)}</p>
      `;
    } else {
      resultHTML = `
        <h2>You’re a mix of:</h2>
        <ul>
          ${topPersonalities.map(p => `<li><strong>${p}</strong>: ${getPersonalityDescription(p)}</li>`).join('')}
        </ul>
      `;
    }
  
    quiz.innerHTML = `
      ${resultHTML}
      <button onclick="location.reload()">Retake Quiz</button>
    `;
  }
  
function getPersonalityDescription(name) {
    switch (name) {
      case 'Lisa Vanderpump':
        description = 'You’re LVP — all charm, control, and English roses. You reign with elegance, loyalty, and just enough shade to keep the peasants in line.';
        break;
      case 'Kyle Richards':
        description = 'You’re the heart of the group — grounded, emotional, and forever trying to keep everyone together (even if it means crying in a sprinter van).';
        break;
      case 'Kim Richards':
        description = 'You’re Kim — a spiritual, misunderstood soul with deep loyalty. You may ghost your own reunion, but your bunny scene lives rent-free in everyone’s mind.';
        break;
      case 'Brandi Glanville':
        description = 'You’re Brandi — unfiltered, fiery, and a little messy. You may be controversial, but you always say what the others won’t (often in a confessional).';
        break;
      case 'Lisa Rinna':
          description = 'You’re Rinna — glam, loud, and always *owning it*. You know your brand, your angles, and when to drop a bombshell at dinner.';
          break;
      default:
        description = 'Mysterious... just like a true Housewife!'; //FIGURE OUT WHAT TO DO IF THERE IS A TIE
    }
  }