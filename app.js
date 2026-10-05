// ========== SHAPE INFO & CONCEPTS ==========
const shapeInfo = {
  cylinder: {
    base: {
      title: "📍 Alas Tabung",
      description: "Alas tabung berbentuk lingkaran. Karena alas adalah bidang datar yang melingkupi tabung, rumus yang tepat untuk menghitung luas alas adalah luas lingkaran.",
      formula: "Luas Alas = πr²",
      conceptTitle: "Bagaimana rumus luas alas didapat?",
      conceptText: "Alas tabung berupa lingkaran. Luas lingkaran didapat dari bentuk dasar lingkaran yang dibagi menjadi banyak potongan kecil seperti juring pizza, lalu disusun seperti jajar genjang. Dari proses ini diperoleh luas = πr².",
      focus: "Luas Alas = πr²"
    },
    lateral: {
      title: "🔄 Selimut Tabung",
      description: "Selimut tabung adalah sisi lengkung yang membungkus bangun. Bila dibuka, selimut tabung akan membentuk persegi panjang, sehingga rumusnya melibatkan keliling lingkaran dan tinggi tabung.",
      formula: "Luas Selimut = 2πrt",
      conceptTitle: "Mengapa menggunakan 2πr × t?",
      conceptText: "Ketika selimut tabung dibuka atau direntangkan, bentuknya menjadi persegi panjang. Panjangnya sama dengan keliling lingkaran = 2πr, dan lebarnya sama dengan tinggi tabung = t. Jadi luas persegi panjang = panjang × lebar = 2πr × t.",
      focus: "Selimut = 2πrt"
    },
    height: {
      title: "📋 Tinggi Tabung",
      description: "Tinggi tabung adalah jarak tegak lurus antara alas dan tutup tabung. Tinggi ini sangat berpengaruh pada volume dan luas selimut.",
      formula: "Volume = πr²t",
      conceptTitle: "Kenapa tinggi penting dalam volume?",
      conceptText: "Volume tabung dihitung dengan mengalikan luas alas dengan tinggi. Karena alas tabung adalah lingkaran dengan luas πr², maka volume = luas alas × tinggi = πr² × t. Semakin tinggi tabung, semakin besar volumenya.",
      focus: "Tinggi = t"
    }
  },
  cone: {
    base: {
      title: "📍 Alas Kerucut",
      description: "Alas kerucut berbentuk lingkaran. Karena bentuk alasnya sama dengan tabung, rumus luas alas kerucut juga menggunakan luas lingkaran.",
      formula: "Luas Alas = πr²",
      conceptTitle: "Bagaimana alas kerucut dihitung?",
      conceptText: "Kerucut memiliki alas yang berupa lingkaran, sama seperti tabung. Karena alasnya tidak berubah bentuk, rumusnya sama dengan luas lingkaran. Jadi luas alas = πr². Perbedaannya, kerucut memiliki satu titik puncak.",
      focus: "Alas = πr²"
    },
    lateral: {
      title: "🔄 Selimut Kerucut",
      description: "Selimut kerucut adalah sisi lengkung yang membungkus kerucut. Jika dibuka, selimut itu membentuk juring lingkaran. Jadi rumusnya melibatkan panjang busur dan garis pelukis.",
      formula: "Luas Selimut = πrs",
      conceptTitle: "Kenapa rumusnya πrs?",
      conceptText: "Selimut kerucut jika dibuka akan membentuk juring lingkaran. Luas juring sebanding dengan panjang busur dan jari-jari juring. Panjang busur sama dengan keliling alas kerucut = 2πr, dan jari-jari juring adalah garis pelukis s. Namun, luas juring = (1/2) × keliling × s = πrs.",
      focus: "Selimut = πrs"
    },
    height: {
      title: "📋 Garis Pelukis Kerucut",
      description: "Garis pelukis adalah garis lurus dari puncak kerucut ke tepi alas. Garis ini penting untuk menghitung luas selimut.",
      formula: "s = √(r² + t²)",
      conceptTitle: "Bagaimana garis pelukis dihitung?",
      conceptText: "Garis pelukis (s) adalah garis yang menghubungkan puncak kerucut dengan satu titik di tepi lingkaran alas. Menggunakan Teorema Pythagoras: jika kita tarik garis dari puncak ke pusat alas (tinggi = t) dan dari pusat alas ke tepi (jari-jari = r), keduanya membentuk segitiga siku-siku.",
      focus: "s = √(r² + t²)"
    }
  },
  sphere: {
    base: {
      title: "🌍 Permukaan Bola",
      description: "Permukaan bola adalah semua bagian luar dari bola. Karena bentuknya bulat dan tidak memiliki sisi datar, maka luas permukaan dihitung dengan rumus khusus.",
      formula: "Luas Permukaan = 4πr²",
      conceptTitle: "Bagaimana rumus luas bola didapat?",
      conceptText: "Bola dapat dianggap sebagai 4 lingkaran besar. Setiap lingkaran besar memiliki luas πr², sehingga luas permukaan bola = 4 × πr² = 4πr². Ini adalah perpaduan sempurna antara lingkaran di berbagai sudut bola.",
      focus: "Permukaan = 4πr²"
    },
    lateral: {
      title: "🌍 Permukaan Bola",
      description: "Seluruh permukaan bola berjarak sama dari pusat. Karena semua titik berada pada jarak r, rumus luas permukaan tetap 4πr².",
      formula: "Luas Permukaan = 4πr²",
      conceptTitle: "Mengapa permukaan bola menggunakan 4πr²?",
      conceptText: "Bola terbentuk oleh semua titik yang berjarak sama dari pusat (radius = r). Karena bentuknya melengkung secara merata di semua arah, permukaan bola sama dengan 4 kali luas lingkaran besar.",
      focus: "Permukaan = 4πr²"
    },
    height: {
      title: "📋 Jari-jari Bola",
      description: "Jari-jari bola merupakan jarak dari pusat bola ke permukaan bola. Jari-jari sangat penting dalam menghitung luas permukaan dan volume bola.",
      formula: "Volume = 4/3 πr³",
      conceptTitle: "Kenapa volume bola menggunakan r³?",
      conceptText: "Volume bola dihitung berdasarkan ruang yang ditempati seluruh permukaan bola. Karena bola mempunyai tiga dimensi dan bentuknya sempurna bulat, ukuran volume bergantung pada kubik jari-jari (r³), sehingga volume = 4/3 × πr³.",
      focus: "Volume = (4/3)πr³"
    }
  }
};

// ========== UTILITIES ==========
function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function shuffleSeeded(arr, seed) {
  const copy = [...arr];
  let s = seed;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    const j = Math.floor(r * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getSessionFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('session');
}

function ensureSession() {
  sessionId = getSessionFromURL() || `SESI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const url = new URL(window.location.href);
  url.searchParams.set('session', sessionId);
  window.history.replaceState({}, '', url);
  document.getElementById('sessionCode').textContent = 'Kode Sesi: ' + sessionId;
}

function generateQRCode() {
  const url = `${window.location.origin}${window.location.pathname}?session=${sessionId}`;
  const qrBox = document.getElementById('qrCode');
  qrBox.innerHTML = '';
  QRCode.toCanvas(qrBox, url, {
    width: 260,
    margin: 2,
    color: { dark: '#4f46e5', light: '#ffffff' }
  }, (error) => {
    if (error) console.error(error);
  });
}

// ========== THREE.JS ==========
let scene, camera, renderer, mesh;
let currentShape = 'cylinder';
let currentZoom = 'base';
let sessionId = '';

function initThreeJS() {
  const canvas = document.getElementById('canvas');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 3.4;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);

  const ambient = new THREE.AmbientLight(0xffffff, 0.75);
  scene.add(ambient);
  const light = new THREE.DirectionalLight(0xffffff, 0.9);
  light.position.set(4, 5, 4);
  scene.add(light);

  drawShape();
  animate();
}

function drawShape() {
  if (mesh) scene.remove(mesh);
  const material = new THREE.MeshPhongMaterial({
    color: 0x667eea,
    shininess: 100,
    emissive: 0x1e293b,
    emissiveIntensity: 0.05
  });

  let geometry;
  if (currentShape === 'cylinder') geometry = new THREE.CylinderGeometry(1, 1, 2.1, 36);
  else if (currentShape === 'cone') geometry = new THREE.ConeGeometry(1.15, 2.5, 36);
  else geometry = new THREE.SphereGeometry(1.25, 36, 36);

  mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = 0.4;
  mesh.rotation.z = 0.2;
  scene.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);
  if (mesh) {
    mesh.rotation.y += 0.01;
    mesh.rotation.x += 0.003;
  }
  renderer.render(scene, camera);
}

function setShape(shape) {
  currentShape = shape;
  currentZoom = 'base';
  document.querySelectorAll('.shape-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.shape === shape);
  });
  document.querySelectorAll('.zoom-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.part === 'base');
  });
  drawShape();
  updateInfo();
  generateQuiz();
}

function setPart(part) {
  currentZoom = part;
  document.querySelectorAll('.zoom-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.part === part);
  });
  updateInfo();
}

function updateInfo() {
  const info = shapeInfo[currentShape][currentZoom];
  document.getElementById('partTitle').textContent = info.title;
  document.getElementById('partDescription').textContent = info.description;
  document.getElementById('formulaBox').textContent = info.formula;
  document.getElementById('conceptTitle').textContent = info.conceptTitle;
  document.getElementById('conceptText').textContent = info.conceptText;
  document.getElementById('focusFormula').textContent = info.focus;
  document.getElementById('focusLabel').classList.add('show');
  setTimeout(() => {
    document.getElementById('focusLabel').classList.remove('show');
  }, 2500);

  if (currentZoom === 'base') camera.position.z = 3.4;
  if (currentZoom === 'lateral') camera.position.z = 2.9;
  if (currentZoom === 'height') camera.position.z = 3.0;
}

// ========== QUIZ SYSTEM ==========
let quizState = { currentQuestion: 0, score: 0, selectedAnswer: null, answered: false, questions: [] };

function buildQuestions() {
  const data = quizDatabase[currentShape] || quizDatabase.cylinder;
  const seed = hashSeed(`${sessionId}-${currentShape}`);
  return shuffleSeeded(data, seed).slice(0, 3);
}

function generateQuiz() {
  quizState = {
    currentQuestion: 0,
    score: 0,
    selectedAnswer: null,
    answered: false,
    questions: buildQuestions()
  };

  document.getElementById('resultPanel').classList.remove('show');
  document.getElementById('quizContainer').style.display = 'block';
  renderQuestion();
}

function renderQuestion() {
  const q = quizState.questions[quizState.currentQuestion];
  const total = quizState.questions.length;
  document.getElementById('questionCounter').textContent = `Soal ${quizState.currentQuestion + 1} dari ${total}`;
  document.getElementById('progressBar').style.width = `${((quizState.currentQuestion + 1) / total) * 100}%`;

  const difficultyClass = `difficulty-${q.difficulty}`;
  const difficultyLabel = q.difficulty === 'easy' ? '⭐ Mudah' : q.difficulty === 'medium' ? '⭐⭐ Sedang' : '⭐⭐⭐ Sulit';

  let html = `
    <div class="question">
      <div class="difficulty-badge ${difficultyClass}">${difficultyLabel}</div>
      <h3>${q.question}</h3>
      <div class="options">
  `;
  
  q.options.forEach((option, index) => {
    html += `
      <label class="option">
        <input type="radio" name="answer" value="${index}" ${quizState.answered ? 'disabled' : ''}>
        <span>${String.fromCharCode(65 + index)}. ${option}</span>
      </label>
    `;
  });
  html += '</div>';

  if (quizState.answered) {
    const isCorrect = quizState.selectedAnswer === q.correct;
    const cls = isCorrect ? 'correct' : 'incorrect';
    const label = isCorrect ? '✅ Jawaban benar!' : '❌ Jawaban salah!';
    const stepsHtml = q.steps ? q.steps.map((step, idx) => `<div>• ${step}</div>`).join('') : q.explanation;
    html += `
      <div class="feedback show ${cls}">
        <strong>${label}</strong>
        <div class="explanation">
          <strong>Penjelasan:</strong> ${q.explanation}
          <br><br>
          <strong>Langkah Pengerjaan:</strong>
          <div style="margin-top: 8px;">${stepsHtml}</div>
        </div>
      </div>
    `;
  }

  html += '</div>';
  document.getElementById('quizContent').innerHTML = html;

  const inputs = document.querySelectorAll('input[name="answer"]');
  inputs.forEach((input) => {
    input.addEventListener('change', (e) => {
      if (quizState.answered) return;
      const selected = Number(e.target.value);
      quizState.selectedAnswer = selected;
      quizState.answered = true;

      const isCorrect = selected === q.correct;
      if (isCorrect) quizState.score++;

      const options = [...document.querySelectorAll('.option')];
      options.forEach((optionEl, idx) => {
        if (idx === q.correct) optionEl.classList.add('correct');
        if (idx === selected && idx !== q.correct) optionEl.classList.add('incorrect');
      });

      document.getElementById('nextBtn').disabled = false;
      renderQuestion();
    });
  });
}

function nextQuestion() {
  if (!quizState.answered) return;
  if (quizState.currentQuestion < quizState.questions.length - 1) {
    quizState.currentQuestion += 1;
    quizState.selectedAnswer = null;
    quizState.answered = false;
    renderQuestion();
    document.getElementById('nextBtn').disabled = true;
  } else {
    showResults();
  }
}

function showResults() {
  const total = quizState.questions.length;
  const percent = (quizState.score / total) * 100;
  const score = document.getElementById('scoreDisplay');
  const message = document.getElementById('resultMessage');
  score.textContent = `${quizState.score}/${total}`;
  score.className = 'score';

  if (percent >= 80) {
    score.classList.add('excellent');
    message.textContent = '🎉 Luar biasa! Kamu sudah sangat paham bangun ruang sisi lengkung.';
  } else if (percent >= 60) {
    score.classList.add('good');
    message.textContent = '👍 Bagus! Terus latihan agar pemahamanmu makin kuat.';
  } else if (percent >= 40) {
    score.classList.add('fair');
    message.textContent = '📚 Masih perlu latihan lagi, tapi kamu sudah mulai paham konsep dasar.';
  } else {
    score.classList.add('poor');
    message.textContent = '💪 Jangan menyerah! Pelajari kembali konsepnya dan coba lagi.';
  }

  document.getElementById('quizContainer').style.display = 'none';
  document.getElementById('resultPanel').classList.add('show');
}

function setupDrag() {
  let isDragging = false;
  let previousX = 0, previousY = 0;
  const canvas = document.getElementById('canvas');

  canvas.addEventListener('pointerdown', (event) => {
    isDragging = true;
    previousX = event.clientX;
    previousY = event.clientY;
  });

  canvas.addEventListener('pointermove', (event) => {
    if (!isDragging || !mesh) return;
    const dx = event.clientX - previousX;
    const dy = event.clientY - previousY;
    mesh.rotation.y += dx * 0.008;
    mesh.rotation.x += dy * 0.008;
    previousX = event.clientX;
    previousY = event.clientY;
  });

  canvas.addEventListener('pointerup', () => {
    isDragging = false;
  });

  canvas.addEventListener('pointerleave', () => {
    isDragging = false;
  });

  canvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    camera.position.z += event.deltaY * 0.001;
    camera.position.z = Math.min(5.5, Math.max(2.2, camera.position.z));
  }, { passive: false });
}

function generatePartTabs() {
  const tabs = document.getElementById('partTabs');
  tabs.innerHTML = '';
  const parts = ['base', 'lateral', 'height'];
  const labels = ['Alas', 'Selimut', 'Tinggi'];
  const icons = ['📍', '🔄', '📋'];
  
  parts.forEach((part, idx) => {
    const btn = document.createElement('button');
    btn.className = `zoom-btn ${part === 'base' ? 'active' : ''}`;
    btn.dataset.part = part;
    btn.textContent = `${icons[idx]} ${labels[idx]}`;
    btn.addEventListener('click', () => setPart(part));
    tabs.appendChild(btn);
  });
}

// ========== EVENT LISTENERS ==========
document.querySelectorAll('.shape-btn').forEach((btn) => {
  btn.addEventListener('click', () => setShape(btn.dataset.shape));
});

document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('restartBtn').addEventListener('click', () => {
  document.getElementById('resultPanel').classList.remove('show');
  document.getElementById('quizContainer').style.display = 'block';
  generateQuiz();
});

window.addEventListener('resize', () => {
  const canvas = document.getElementById('canvas');
  if (!camera || !renderer) return;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
});

// ========== INITIALIZATION ==========
window.addEventListener('load', () => {
  ensureSession();
  initThreeJS();
  setupDrag();
  generatePartTabs();
  updateInfo();
  generateQuiz();
  generateQRCode();
});