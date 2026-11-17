const pageName = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (href === pageName || (pageName === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

const quizForm = document.getElementById('quiz-form');
if (quizForm) {
  const correctAnswers = {
    q1: 'B',
    q2: 'A',
    q3: 'A',
    q4: 'A',
    q5: 'A',
    q6: 'A',
    q7: 'A',
    q8: 'A',
    q9: 'A',
    q10: 'A'
  };

  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let score = 0;
    for (const [key, value] of Object.entries(correctAnswers)) {
      const selected = document.querySelector(`input[name="${key}"]:checked`);
      if (selected && selected.value === value) {
        score += 10;
      }
    }

    const resultBox = document.getElementById('quiz-result');
    const meter = document.getElementById('power-fill');
    const percent = Math.min((score / 100) * 100, 100);

    meter.style.width = `${percent}%`;

    let rank = 'JUNIOR WARRIOR';
    let message = 'Great Job! Teruskan latihan!';

    if (score >= 80) {
      rank = 'JUMPING MASTER';
      message = 'Tahniah! Anda telah menjadi Jumping Master!';
    } else if (score >= 60) {
      rank = 'SUPER JUMPER';
      message = 'Amazing! Anda berjaya!';
    }

    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `
      <h3>Keputusan Kuiz</h3>
      <p>Jumlah markah: <strong>${score}</strong> / 100</p>
      <p> Tahap: <strong>${rank}</strong></p>
      <p>${message}</p>
    `;
  });
}

const video = document.getElementById('learning-video');
if (video) {
  const questions = [
    {
      time: 5,
      title: 'Soalan 1',
      prompt: 'Apakah kemahiran yang ditunjukkan dalam video?',
      answers: [
        { text: 'A. Berlari', value: 'A' },
        { text: 'B. Melompat', value: 'B' },
        { text: 'C. Membaling', value: 'C' }
      ],
      correct: 'B',
      feedback: 'Betul! Kemahiran yang ditunjukkan ialah melompat.'
    },
    {
      time: 12,
      title: 'Soalan 2',
      prompt: 'Mengapakah kita perlu memilih kaki yang sesuai untuk melonjak?',
      answers: [
        { text: 'A. Untuk memperlahankan pergerakan', value: 'A' },
        { text: 'B. Untuk membantu menghasilkan lonjakan yang sesuai', value: 'B' },
        { text: 'C. Untuk mengelakkan aktiviti', value: 'C' }
      ],
      correct: 'B',
      feedback: 'Betul! Kaki yang sesuai membantu menghasilkan lonjakan yang lebih stabil.'
    },
    {
      time: 20,
      title: 'Soalan 3',
      prompt: 'Apakah yang perlu dilakukan selepas melepasi halangan?',
      answers: [
        { text: 'A. Mendarat dengan selamat', value: 'A' },
        { text: 'B. Terus duduk', value: 'B' },
        { text: 'C. Menolak rakan', value: 'C' }
      ],
      correct: 'A',
      feedback: 'Betul! Pendaratan yang selamat sangat penting untuk keselamatan.'
    }
  ];

  const questionBox = document.getElementById('question-box');
  const questionTitle = document.getElementById('question-title');
  const questionContent = document.getElementById('question-content');

  let currentQuestionIndex = 0;
  let isQuestionVisible = false;

  const showQuestion = (item) => {
    if (isQuestionVisible) return;
    isQuestionVisible = true;
    video.pause();
    questionTitle.textContent = item.title;
    questionContent.innerHTML = `
      <p>${item.prompt}</p>
      ${item.answers
        .map(
          (answer) => `
            <label>
              <input type="radio" name="video-answer" value="${answer.value}" />
              ${answer.text}
            </label>
          `
        )
        .join('')}
      <button type="button" class="btn btn-primary answer-btn" id="check-answer">Semak Jawapan</button>
    `;
    questionBox.classList.remove('hidden');

    document.getElementById('check-answer').addEventListener('click', () => {
      const selected = document.querySelector('input[name="video-answer"]:checked');
      if (!selected) {
        alert('Sila pilih jawapan terlebih dahulu.');
        return;
      }

      const userAnswer = selected.value;
      const isCorrect = userAnswer === item.correct;
      questionContent.innerHTML = `
        <p>${isCorrect ? 'Betul!' : 'Maaf, jawapan yang betul ialah ' + item.correct}</p>
        <p>${item.feedback}</p>
        <button type="button" class="btn btn-primary answer-btn" id="continue-video">Teruskan</button>
      `;

      document.getElementById('continue-video').addEventListener('click', () => {
        questionBox.classList.add('hidden');
        isQuestionVisible = false;
        currentQuestionIndex += 1;
        video.play();
      });
    });
  };

  video.addEventListener('timeupdate', () => {
    const current = Math.floor(video.currentTime);
    const nextQuestion = questions[currentQuestionIndex];

    if (nextQuestion && current >= nextQuestion.time) {
      showQuestion(nextQuestion);
    }
  });
}

const chatForm = document.getElementById('chat-form');
if (chatForm) {
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');

  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.textContent = message;
    chatWindow.appendChild(userBubble);

    const reply = (() => {
      const text = message.toLowerCase();
      if (text.includes('halangan')) return 'Halangan bertingkat bermaksud anda perlu melompat melepasi objek dengan pelbagai aras. Fokus pada kawalan badan dan pendaratan yang selamat.';
      if (text.includes('kaki')) return 'Pilih kaki yang paling kuat dan stabil untuk melonjak. Kaki yang sesuai membantu menghasilkan lonjakan yang lebih baik.';
      if (text.includes('selamat') || text.includes('keselamatan')) return 'Keselamatan utama ialah melakukan persediaan, berlatih mengikut kemampuan, dan mendarat dengan kawalan.';
      if (text.includes('lompatan')) return 'Lompatan yang baik bermula dengan persediaan, diikuti lonjakan kuat, melepasi halangan, dan diakhiri dengan pendaratan yang selamat.';
      if (text.includes('jumping master') || text.includes('gelaran')) return 'Hebat! Semakin anda berlatih dengan yakin, semakin hampir anda kepada gelaran Jumping Master.';
      return 'Bagus! Teruskan latihan anda dan fokus kepada teknik, keseimbangan dan keselamatan semasa melompat.';
    })();

    const botBubble = document.createElement('div');
    botBubble.className = 'chat-bubble bot';
    botBubble.textContent = reply;
    chatWindow.appendChild(botBubble);
    chatInput.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });
}

const reflectionForm = document.getElementById('reflection-form');
if (reflectionForm) {
  reflectionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = {
      lessonLearned: document.getElementById('lesson-learned').value.trim(),
      jumpSuccess: document.getElementById('jump-success').value.trim(),
      enjoyment: document.getElementById('enjoyment').value.trim(),
      challenge: document.getElementById('challenge').value.trim()
    };

    localStorage.setItem('dragon-training-reflection', JSON.stringify(fields));
    alert('Refleksi anda telah disimpan.');
  });

  const saved = JSON.parse(localStorage.getItem('dragon-training-reflection') || 'null');
  if (saved) {
    document.getElementById('lesson-learned').value = saved.lessonLearned || '';
    document.getElementById('jump-success').value = saved.jumpSuccess || '';
    document.getElementById('enjoyment').value = saved.enjoyment || '';
    document.getElementById('challenge').value = saved.challenge || '';
  }
}

if (document.getElementById('power-fill')) {
  const meter = document.getElementById('power-fill');
  meter.style.width = '0%';
}

