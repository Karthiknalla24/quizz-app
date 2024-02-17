const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Rome"],
      answer: "Paris"
    },
    {
      question: "What is 4 + 4?",
      options: ["8", "12", "6", "10"],
      answer: "8"
    },
    // Add more questions here
  ];
  
  const timerDuration = 10; // in seconds
  let currentQuestion = 0;
  let score = 0;
  let timer;
  
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const scoreElement = document.getElementById('score-value');
  const questionCountElement = document.getElementById('question-number');
  const timeElement = document.getElementById('time');
  const submitButton = document.getElementById('submit-btn');
  
  function startQuiz() {
    loadQuestion();
    startTimer();
  }
  
  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;
    questionCountElement.innerText = `Question ${currentQuestion + 1}`;
    optionsElement.innerHTML = "";
    currentQuizData.options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.innerText = option;
      optionElement.classList.add('option');
      optionElement.addEventListener('click', () => selectOption(option));
      optionsElement.appendChild(optionElement);
    });
  }
  
  function selectOption(selectedOption) {
    const currentQuizData = quizData[currentQuestion];
    if (selectedOption === currentQuizData.answer) {
      score++;
      scoreElement.innerText = score;
    }
    document.querySelectorAll('.option').forEach(option => {
      option.removeEventListener('click', selectOption);
    });
    clearTimeout(timer);
    submitButton.disabled = true;
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      setTimeout(loadQuestion, 1000); // Delay for transition effect
      startTimer();
    } else {
      endQuiz();
    }
  }
  
  function startTimer() {
    let timeLeft = timerDuration;
    updateTimer(timeLeft);
    timer = setInterval(() => {
      timeLeft--;
      updateTimer(timeLeft);
      if (timeLeft === 0) {
        clearTimeout(timer);
        selectOption(null); // Time's up, move to next question
      }
    }, 1000);
  }
  
  function updateTimer(timeLeft) {
    timeElement.innerText = timeLeft;
  }
  
  function endQuiz() {
    alert('Quiz ended! Your score: ' + score);
  }
  
  submitButton.addEventListener('click', () => selectOption(null));
  
  startQuiz();
  
