// 🎮 GAME-LIKE INTERACTIVE LEARNING APP
const shapeInfo = {
  cylinder: {
    base: { title: "🎯 Alas Tabung", description: "Alas tabung berbentuk lingkaran.", formula: "πr²", concept: "Luas lingkaran dengan jari-jari r", explanation: "Alas dibentuk dari lingkaran sempurna, rumusnya sama dengan luas lingkaran biasa." },
    lateral: { title: "🔄 Selimut Tabung", description: "Sisi lengkung tabung.", formula: "2πrt", concept: "Persegi panjang dengan panjang = keliling", explanation: "Saat dibuka, selimut membentuk persegi panjang dengan panjang = 2πr (keliling) dan lebar = t (tinggi)." },
    height: { title: "📏 Tinggi Tabung", description: "Jarak antara alas dan tutup.", formula: "πr²t (Volume)", concept: "Faktor penting volume", explanation: "Tinggi menentukan seberapa dalam tabung. Semakin tinggi, semakin besar volume." }
  },
  cone: {
    base: { title: "🎯 Alas Kerucut", description: "Alas kerucut berbentuk lingkaran.", formula: "πr²", concept: "Sama seperti tabung", explanation: "Kerucut juga punya alas lingkaran, jadi rumus luasnya sama: πr²." },
    lateral: { title: "🔄 Selimut Kerucut", description: "Sisi lengkung kerucut.", formula: "πrs", concept: "Juring lingkaran", explanation: "Saat dibuka, selimut kerucut membentuk juring dengan luas = πrs (r = jari-jari, s = garis pelukis)." },
    height: { title: "📐 Garis Pelukis", description: "Garis dari puncak ke tepi alas.", formula: "√(r² + t²)", concept: "Teorema Pythagoras", explanation: "Garis pelukis adalah hipotenusa segitiga siku-siku antara tinggi dan jari-jari." }
  },
  sphere: {
    base: { title: "⚪ Permukaan Bola", description: "Seluruh bagian luar bola.", formula: "4πr²", concept: "4 × luas lingkaran", explanation: "Permukaan bola setara dengan 4 lingkaran besar, jadi luasnya 4πr²." },
    lateral: { title: "⚪ Permukaan Bola", description: "Semua titik berjarak r dari pusat.", formula: "4πr²", concept: "Rumus universal", explanation: "Tidak ada pembedaan di bola, semuanya permukaan dengan rumus 4πr²." },
    height: { title: "🔊 Jari-jari Bola", description: "Jarak pusat ke permukaan.", formula: "(4/3)πr³ (Volume)", concept: "r³ sangat penting!", explanation: "Volume bola menggunakan r³ (bukan r²) karena bola 3D sempurna." }
  }
};

let scene, camera, renderer, mesh, sessionId = '', currentShape = 'cylinder', currentZoom = 'base';
let quizState = { currentQuestion: 0, score: 0, selectedAnswer: null, answered: false, questions: [] };

// 🔐 UTILITY FUNCTIONS
function hashSeed(str) { let h = 0; for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; } return Math.abs(h); }
function shuffleSeeded(arr, seed) { const copy = [...arr]; let s = seed; for (let i = copy.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const r = s / 233280; const j = Math.floor(r * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }
function getSessionFromURL() { return new URLSearchParams(window.location.search).get('session'); }
function ensureSession() { sessionId = getSessionFromURL() || `SESI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`; const url = new URL(window.location.href); url.searchParams.set('session', sessionId); window.history.replaceState({}, '', url); document.getElementById('sessionCode').textContent = '📍 Kode: ' + sessionId; }
function generateQRCode() { const url = `${window.location.origin}${window.location.pathname}?session=${sessionId}`; const qrBox = document.getElementById('qrCode'); qrBox.innerHTML = ''; QRCode.toCanvas(qrBox, url, { width: 280, margin: 2, color: { dark: '#667eea', light: '#ffffff' } }); }

// 🎨 THREE.JS SETUP
function initThreeJS() {
  const canvas = document.getElementById('canvas');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 3.4;
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient);
  const light = new THREE.DirectionalLight(0xffffff, 0.9);
  light.position.set(5, 6, 5);
  scene.add(light);
  drawShape();
  animate();
}

function drawShape() {
  if (mesh) scene.remove(mesh);
  const material = new THREE.MeshPhongMaterial({
    color: 0x667eea, shininess: 120, emissive: 0x1a1a2e, emissiveIntensity: 0.08
  });
  let geometry;
  if (currentShape === 'cylinder') geometry = new THREE.CylinderGeometry(1, 1, 2.2, 48);
  else if (currentShape === 'cone') geometry = new THREE.ConeGeometry(1.2, 2.6, 48);
  else geometry = new THREE.SphereGeometry(1.3, 48, 48);
  mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = 0.35;
  mesh.rotation.z = 0.25;
  scene.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);
  if (mesh) { mesh.rotation.y += 0.012; mesh.rotation.x += 0.004; }
  renderer.render(scene, camera);
}

function setShape(shape) {
  currentShape = shape;
  currentZoom = 'base';
  document.querySelectorAll('.shape-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.shape === shape));
  document.querySelectorAll('.part-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.part === 'base'));
  drawShape();
  updateInfo();
  generateQuiz();
}

function setPart(part) {
  currentZoom = part;
  document.querySelectorAll('.part-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.part === part));
  updateInfo();
  showFormulaPopup();
}

function updateInfo() {
  const info = shapeInfo[currentShape][currentZoom];
  document.getElementById('conceptTitle').textContent = info.title;
  document.getElementById('conceptDesc').textContent = info.description;
  document.getElementById('formulaBox').textContent = '🎯 ' + info.formula;
  document.getElementById('conceptExplain').textContent = info.explanation;
}

function showFormulaPopup() {
  const info = shapeInfo[currentShape][currentZoom];
  const popup = document.getElementById('formulaPopup');
  document.getElementById('formulaText').textContent = info.formula;
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 3000);
}

function generatePartButtons() {
  const container = document.getElementById('partButtons');
  container.innerHTML = '';
  const parts = ['base', 'lateral', 'height'];
  const icons = ['🎯', '🔄', '📏'];
  const labels = ['Alas', 'Selimut', 'Tinggi'];
  parts.forEach((part, idx) => {
    const btn = document.createElement('button');
    btn.className = `part-btn ${part === 'base' ? 'active' : ''}`;
    btn.dataset.part = part;
    btn.textContent = `${icons[idx]} ${labels[idx]}`;
    btn.addEventListener('click', () => setPart(part));
    container.appendChild(btn);
  });
}

// 🎮 QUIZ SYSTEM
function buildQuestions() {
  const data = quizDatabase[currentShape] || quizDatabase.cylinder;
  const seed = hashSeed(`${sessionId}-${currentShape}`);
  return shuffleSeeded(data, seed).slice(0, 3);
}

function generateQuiz() {
  quizState = { currentQuestion: 0, score: 0, selectedAnswer: null, answered: false, questions: buildQuestions() };
  document.getElementById('resultsPanel').classList.remove('show');
  document.getElementById('quizContainer').style.display = 'block';
  renderQuestion();
}

function renderQuestion() {
  const q = quizState.questions[quizState.currentQuestion];
  const total = quizState.questions.length;
  document.getElementById('questionCounter').textContent = `${quizState.currentQuestion + 1}/${total}`;
  document.getElementById('progressBar').style.width = `${((quizState.currentQuestion + 1) / total) * 100}%`;
  document.getElementById('progressPercent').textContent = `${Math.round(((quizState.currentQuestion + 1) / total) * 100)}%`;
  
  const diffClass = `difficulty-${q.difficulty}`;
  const diffLabel = { easy: '⭐ Mudah', medium: '⭐⭐ Sedang', hard: '⭐⭐⭐ Sulit' }[q.difficulty];
  
  let html = `<div class="difficulty-tag ${diffClass}">${diffLabel}</div><h4>${q.question}</h4><div class="options-list">`;
  q.options.forEach((opt, i) => {
    html += `<label class="option-item"><input type="radio" name="answer" value="${i}" ${quizState.answered ? 'disabled' : ''}><span>${String.fromCharCode(65 + i)}. ${opt}</span></label>`;
  });
  html += '</div>';
  
  if (quizState.answered) {
    const isCorrect = quizState.selectedAnswer === q.correct;
    const cls = isCorrect ? 'correct' : 'incorrect';
    const emoji = isCorrect ? '✅' : '❌';
    const stepsHtml = q.steps.map(s => `<div class="step-item">${s}</div>`).join('');
    html += `<div class="feedback-box show ${cls}"><strong>${emoji} ${q.explanation}</strong><div class="steps-container"><strong>📖 Langkah Pengerjaan:</strong>${stepsHtml}</div></div>`;
  }
  
  document.getElementById('quizContent').innerHTML = html;
  const inputs = document.querySelectorAll('input[name="answer"]');
  inputs.forEach(input => {
    input.addEventListener('change', e => {
      if (quizState.answered) return;
      const selected = Number(e.target.value);
      quizState.selectedAnswer = selected;
      quizState.answered = true;
      if (selected === q.correct) quizState.score++;
      [...document.querySelectorAll('.option-item')].forEach((opt, i) => {
        if (i === q.correct) opt.classList.add('correct');
        if (i === selected && i !== q.correct) opt.classList.add('incorrect');
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
  const scoreCircle = document.getElementById('scoreCircle');
  scoreCircle.textContent = `${quizState.score}/${total}`;
  scoreCircle.className = 'score-circle';
  
  let message = '', emoji = '';
  if (percent >= 80) { scoreCircle.classList.add('excellent'); message = '🎉 LUAR BIASA! Kamu sudah mahir bangun ruang!'; emoji = '🏆'; }
  else if (percent >= 60) { scoreCircle.classList.add('good'); message = '😊 Bagus! Terus latihan untuk sempurna.'; emoji = '⭐'; }
  else if (percent >= 40) { scoreCircle.classList.add('fair'); message = '📚 Lumayan! Pelajari lagi konsepnya.'; emoji = '💪'; }
  else { scoreCircle.classList.add('poor'); message = '🚀 Jangan menyerah! Coba lagi dengan serius.'; emoji = '🎯'; }
  
  document.getElementById('resultMessage').textContent = `${emoji} ${message}`;
  document.getElementById('quizContainer').style.display = 'none';
  document.getElementById('resultsPanel').classList.add('show');
}

function setupDrag() {
  let isDragging = false, prevX = 0, prevY = 0;
  const canvas = document.getElementById('canvas');
  canvas.addEventListener('pointerdown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
  canvas.addEventListener('pointermove', e => {
    if (!isDragging || !mesh) return;
    mesh.rotation.y += (e.clientX - prevX) * 0.01;
    mesh.rotation.x += (e.clientY - prevY) * 0.01;
    prevX = e.clientX; prevY = e.clientY;
  });
  canvas.addEventListener('pointerup', () => { isDragging = false; });
  canvas.addEventListener('pointerleave', () => { isDragging = false; });
  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    camera.position.z += e.deltaY * 0.0015;
    camera.position.z = Math.min(5.5, Math.max(2, camera.position.z));
  }, { passive: false });
}

window.addEventListener('resize', () => {
  const canvas = document.getElementById('canvas');
  if (!camera) return;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
});

document.querySelectorAll('.shape-btn').forEach(btn => {
  btn.addEventListener('click', () => setShape(btn.dataset.shape));
});

document.getElementById('nextBtn').addEventListener('click', nextQuestion);

window.addEventListener('load', () => {
  ensureSession();
  initThreeJS();
  setupDrag();
  generatePartButtons();
  updateInfo();
  generateQuiz();
  generateQRCode();
});