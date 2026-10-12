// 🎮 GAME-LIKE INTERACTIVE LEARNING APP
const shapeInfo = {
  cylinder: {
    base: { title: "🎯 Alas Tabung", description: "Alas tabung berbentuk lingkaran.", formula: "πr²", concept: "Luas lingkaran dengan jari-jari r", explanation: "Alas dibentuk dari lingkaran sempurna. Luas alas = π × r², di mana r adalah jari-jari." },
    lateral: { title: "🔄 Selimut Tabung", description: "Sisi lengkung tabung.", formula: "2πrt", concept: "Persegi panjang dengan panjang = keliling lingkaran", explanation: "Saat dibuka, selimut membentuk persegi panjang dengan panjang = 2πr (keliling alas) dan lebar = t (tinggi)." },
    height: { title: "📏 Tinggi Tabung", description: "Jarak antara alas dan tutup.", formula: "Luas Permukaan = 2πr² + 2πrt", concept: "Faktor penting", explanation: "Tinggi (t) adalah jarak vertikal antara alas dan tutup tabung. Makin tinggi, makin besar volume dan luas permukaan." },
  },
  cone: {
    base: { title: "🎯 Alas Kerucut", description: "Alas kerucut berbentuk lingkaran.", formula: "πr²", concept: "Sama seperti tabung", explanation: "Kerucut juga punya alas lingkaran dengan rumus luas yang sama: Luas Alas = π × r²." },
    lateral: { title: "🔄 Selimut Kerucut", description: "Sisi lengkung kerucut.", formula: "πrs", concept: "Juring lingkaran", explanation: "Saat dibuka, selimut kerucut membentuk juring dengan jari-jari s (garis pelukis) dan panjang busur 2πr." },
    height: { title: "📐 Garis Pelukis", description: "Garis dari puncak ke tepi alas.", formula: "s = √(r² + t²)", concept: "Teorema Pythagoras", explanation: "Garis pelukis (s) adalah hipotenusa yang menghubungkan puncak dengan tepi alas. Panjangnya dihitung dengan Pythagoras." },
  },
  sphere: {
    base: { title: "⚪ Luas Permukaan Bola", description: "Seluruh bagian luar bola.", formula: "4πr²", concept: "4 × luas lingkaran besar", explanation: "Permukaan bola setara dengan 4 lingkaran besar. Luas Permukaan = 4 × π × r²." },
    lateral: { title: "⚪ Volume Bola", description: "Isi dalam bola.", formula: "(4/3)πr³", concept: "Kapasitas bola", explanation: "Volume bola dihitung dengan rumus V = (4/3) × π × r³, di mana r adalah jari-jari bola." },
    height: { title: "🔊 Jari-jari Bola", description: "Jarak pusat ke permukaan.", formula: "r = diameter ÷ 2", concept: "Dimensi utama bola", explanation: "Jari-jari (r) adalah jarak dari pusat bola ke permukaan. Diameter adalah 2 × jari-jari. Semua titik di permukaan berjarak sama dari pusat." },
  }
};

let scene, camera, renderer, mesh, sessionId = '', currentShape = 'cylinder', currentZoom = 'base';
let quizState = { currentQuestion: 0, score: 0, selectedAnswer: null, answered: false, questions: [] };
let dashLines = [];

// 🔐 UTILITY FUNCTIONS
function hashSeed(str) { let h = 0; for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; } return Math.abs(h); }
function shuffleSeeded(arr, seed) { const copy = [...arr]; let s = seed; for (let i = copy.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const r = s / 233280; const j = Math.floor(r * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }
function getSessionFromURL() { return new URLSearchParams(window.location.search).get('session'); }
function ensureSession() { sessionId = getSessionFromURL() || `SESI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`; const url = new URL(window.location); url.searchParams.set('session', sessionId); window.history.replaceState({}, '', url); }
function generateQRCode() { const url = `${window.location.origin}${window.location.pathname}?session=${sessionId}`; const qrBox = document.getElementById('qrCode'); qrBox.innerHTML = ''; QRCode.toCanvas(qrBox, url, { width: 200, margin: 2 }, err => { if (err) console.error(err); }); document.getElementById('sessionCode').textContent = `Kode: ${sessionId}`; }

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

function createDashedLine(start, end, color = 0xff6b6b) {
  const points = [];
  const direction = new THREE.Vector3().subVectors(end, start).normalize();
  const distance = start.distanceTo(end);
  const dashLength = 0.09;
  const gapLength = 0.06;
  let current = start.clone();
  while (current.distanceTo(end) > 0.01) {
    const next = current.clone().addScaledVector(direction, Math.min(dashLength, current.distanceTo(end)));
    points.push(current.clone());
    points.push(next);
    current.addScaledVector(direction, dashLength + gapLength);
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color, linewidth: 2 });
  return new THREE.LineSegments(geometry, material);
}

function createTextLabel(text, position, color = '#ff6b6b') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 256, 64);
  ctx.fillStyle = color;
  ctx.font = 'Bold 26px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 32);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
  const geometry = new THREE.PlaneGeometry(0.9, 0.22);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  mesh.position.z += 0.5;
  return mesh;
}

function drawShape() {
  if (mesh) scene.remove(mesh);
  dashLines.forEach(line => scene.remove(line));
  dashLines = [];
  const material = new THREE.MeshPhongMaterial({
    color: 0x667eea, shininess: 120, emissive: 0x1a1a2e, emissiveIntensity: 0.08
  });
  let geometry;

  if (currentShape === 'cylinder') {
    geometry = new THREE.CylinderGeometry(1, 1, 2.2, 48);
    mesh = new THREE.Mesh(geometry, material);
    if (currentZoom === 'height') {
      const heightLine = createDashedLine(new THREE.Vector3(0, -1.1, 0), new THREE.Vector3(0, 1.1, 0), 0xff6b6b);
      const heightLabel = createTextLabel('t', new THREE.Vector3(0.28, 0, 0), '#ff6b6b');
      scene.add(heightLine);
      scene.add(heightLabel);
      dashLines.push(heightLine, heightLabel);
    } else if (currentZoom === 'base') {
      const radiusLine = createDashedLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0), 0x4ecdc4);
      const radiusLabel = createTextLabel('r', new THREE.Vector3(0.54, 0.22, 0), '#4ecdc4');
      scene.add(radiusLine);
      scene.add(radiusLabel);
      dashLines.push(radiusLine, radiusLabel);
    }
  } else if (currentShape === 'cone') {
    geometry = new THREE.ConeGeometry(1.2, 2.6, 48);
    mesh = new THREE.Mesh(geometry, material);
    if (currentZoom === 'height') {
      const heightLine = createDashedLine(new THREE.Vector3(0, 1.3, 0), new THREE.Vector3(0, -1.3, 0), 0xff6b6b);
      const heightLabel = createTextLabel('t', new THREE.Vector3(0.28, 0, 0), '#ff6b6b');
      scene.add(heightLine);
      scene.add(heightLabel);
      dashLines.push(heightLine, heightLabel);
    } else if (currentZoom === 'lateral') {
      const slantLine = createDashedLine(new THREE.Vector3(0, 1.3, 0), new THREE.Vector3(1.2, -1.3, 0), 0xffa500);
      const slantLabel = createTextLabel('s', new THREE.Vector3(0.8, -0.1, 0.2), '#ffa500');
      scene.add(slantLine);
      scene.add(slantLabel);
      dashLines.push(slantLine, slantLabel);
    } else if (currentZoom === 'base') {
      const radiusLine = createDashedLine(new THREE.Vector3(0, -1.3, 0), new THREE.Vector3(1.2, -1.3, 0), 0x4ecdc4);
      const radiusLabel = createTextLabel('r', new THREE.Vector3(0.6, -1.05, 0), '#4ecdc4');
      scene.add(radiusLine);
      scene.add(radiusLabel);
      dashLines.push(radiusLine, radiusLabel);
    }
  } else {
    geometry = new THREE.SphereGeometry(1.3, 48, 48);
    mesh = new THREE.Mesh(geometry, material);
    const radiusLine = createDashedLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.3, 0, 0), 0x4ecdc4);
    const radiusLabel = createTextLabel('r', new THREE.Vector3(0.7, 0.2, 0), '#4ecdc4');
    const diameterLine = createDashedLine(new THREE.Vector3(-1.3, 0, 0), new THREE.Vector3(1.3, 0, 0), 0xff6b6b);
    const diameterLabel = createTextLabel('d', new THREE.Vector3(0, -0.28, 0), '#ff6b6b');
    scene.add(radiusLine);
    scene.add(radiusLabel);
    scene.add(diameterLine);
    scene.add(diameterLabel);
    dashLines.push(radiusLine, radiusLabel, diameterLine, diameterLabel);
  }

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
  generatePartButtons();
}

function setPart(part) {
  currentZoom = part;
  document.querySelectorAll('.part-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.part === part));
  updateInfo();
  drawShape();
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
  let parts, icons, labels;

  if (currentShape === 'sphere') {
    parts = ['base', 'lateral', 'height'];
    icons = ['⚪', '📊', '📏'];
    labels = ['Luas Permukaan', 'Volume', 'Jari-jari'];
  } else if (currentShape === 'cone') {
    parts = ['base', 'lateral', 'height'];
    icons = ['🎯', '🔄', '📐'];
    labels = ['Alas', 'Selimut', 'Garis Pelukis'];
  } else {
    parts = ['base', 'lateral', 'height'];
    icons = ['🎯', '🔄', '📏'];
    labels = ['Alas', 'Selimut', 'Tinggi'];
  }

  parts.forEach((part, idx) => {
    const btn = document.createElement('button');
    btn.className = `part-btn ${part === 'base' ? 'active' : ''}`;
    btn.dataset.part = part;
    btn.textContent = `${icons[idx]} ${labels[idx]}`;
    btn.addEventListener('click', () => setPart(part));
    container.appendChild(btn);
  });
}

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
