// ⚡ GAME-LIKE QUIZ DATABASE WITH DETAILED EXPLANATIONS
const quizDatabase = {
  cylinder: [
    {
      question: "📦 Sebuah tabung memiliki jari-jari 7 cm dan tinggi 10 cm. Berapa luas alas tabung? (π = 22/7)",
      type: "calculation",
      difficulty: "easy",
      points: 100,
      options: ["154 cm²", "220 cm²", "308 cm²", "77 cm²"],
      correct: 0,
      explanation: "✅ BENAR! Luas alas tabung adalah luas lingkaran karena alasnya berbentuk lingkaran sempurna.",
      steps: [
        "1️⃣ Rumus luas lingkaran = πr²",
        "2️⃣ Diketahui: r = 7 cm, π = 22/7",
        "3️⃣ Hitung: (22/7) × 7² = (22/7) × 49",
        "4️⃣ Sederhanakan: 22 × 7 = 154 cm²",
        "🎯 Jawaban Final: 154 cm²"
      ]
    },
    {
      question: "🎨 Luas selimut tabung dengan r = 5 cm dan t = 12 cm adalah? (π = 3,14)",
      type: "calculation",
      difficulty: "medium",
      points: 150,
      options: ["188,4 cm²", "314 cm²", "376,8 cm²", "565,2 cm²"],
      correct: 2,
      explanation: "✅ MANTAP! Selimut tabung membentuk persegi panjang saat dibuka dengan panjang = keliling lingkaran.",
      steps: [
        "1️⃣ Rumus selimut = 2πrt (panjang × lebar)",
        "2️⃣ Panjang = keliling = 2πr = 2 × 3,14 × 5 = 31,4 cm",
        "3️⃣ Lebar = tinggi = 12 cm",
        "4️⃣ Luas = 31,4 × 12 = 376,8 cm²",
        "5️⃣ Atau langsung: 2 × 3,14 × 5 × 12 = 376,8 cm²"
      ]
    },
    {
      question: "🛢️ Sebuah drum minyak berbentuk tabung diameter 70 cm dan tinggi 100 cm. Volume maksimal air? (π = 22/7)",
      type: "word_problem",
      difficulty: "hard",
      points: 200,
      options: ["38.500 cm³", "385.000 cm³", "3.850.000 cm³", "38.500.000 cm³"],
      correct: 2,
      explanation: "🔥 SEMPURNA! Ini soal real-world. Kamu harus cari jari-jari dari diameter dulu!",
      steps: [
        "1️⃣ Data: diameter = 70 cm, tinggi = 100 cm",
        "2️⃣ Cari jari-jari: r = 70 ÷ 2 = 35 cm",
        "3️⃣ Rumus volume tabung = πr²t",
        "4️⃣ Volume = (22/7) × 35² × 100",
        "5️⃣ = (22/7) × 1.225 × 100",
        "6️⃣ = 22 × 175 × 100 = 3.850.000 cm³"
      ]
    }
  ],

  cone: [
    {
      question: "🎯 Kerucut punya jari-jari 6 cm dan tinggi 8 cm. Berapa garis pelukisnya (s)?",
      type: "calculation",
      difficulty: "easy",
      points: 100,
      options: ["10 cm", "12 cm", "14 cm", "16 cm"],
      correct: 0,
      explanation: "✨ HEBAT! Garis pelukis adalah hipotenusa segitiga siku-siku antara tinggi dan jari-jari.",
      steps: [
        "1️⃣ Gunakan Teorema Pythagoras: s² = r² + t²",
        "2️⃣ s² = 6² + 8² = 36 + 64 = 100",
        "3️⃣ s = √100 = 10 cm",
        "💡 Ingat: Ini segitiga 6-8-10 (triple Pythagoras!)",
        "🎯 Jawaban: 10 cm"
      ]
    },
    {
      question: "🌙 Luas selimut kerucut dengan r = 5 cm dan s = 13 cm adalah? (π = 3,14)",
      type: "calculation",
      difficulty: "medium",
      points: 150,
      options: ["157 cm²", "204,1 cm²", "251,2 cm²", "314 cm²"],
      correct: 1,
      explanation: "🌟 NICE! Selimut kerucut membentuk juring lingkaran saat dibuka, rumusnya πrs!",
      steps: [
        "1️⃣ Rumus selimut kerucut = πrs",
        "2️⃣ π = 3,14, r = 5 cm, s = 13 cm",
        "3️⃣ Luas = 3,14 × 5 × 13",
        "4️⃣ = 3,14 × 65",
        "5️⃣ = 204,1 cm²"
      ]
    },
    {
      question: "🍦 Es krim kerucut: diameter alas 4 cm, tinggi 10 cm. Volume es krim? (π = 3,14)",
      type: "word_problem",
      difficulty: "hard",
      points: 200,
      options: ["41,87 cm³", "125,6 cm³", "251,2 cm³", "502,4 cm³"],
      correct: 0,
      explanation: "🎉 LUAR BIASA! Kamu ingatnya volume kerucut = 1/3 dari tabung dengan ukuran sama!",
      steps: [
        "1️⃣ Data: diameter = 4 cm → r = 2 cm, tinggi = 10 cm",
        "2️⃣ Rumus volume kerucut = (1/3)πr²t",
        "3️⃣ = (1/3) × 3,14 × 2² × 10",
        "4️⃣ = (1/3) × 3,14 × 4 × 10",
        "5️⃣ = (1/3) × 125,6 = 41,87 cm³"
      ]
    }
  ],

  sphere: [
    {
      question: "⚽ Bola berjari-jari 7 cm. Luas permukaan bola adalah? (π = 22/7)",
      type: "calculation",
      difficulty: "easy",
      points: 100,
      options: ["154 cm²", "308 cm²", "616 cm²", "924 cm²"],
      correct: 2,
      explanation: "🏆 KEREN! Luas permukaan bola = 4 × luas lingkaran besar (4πr²)!",
      steps: [
        "1️⃣ Rumus luas permukaan bola = 4πr²",
        "2️⃣ π = 22/7, r = 7 cm",
        "3️⃣ Luas = 4 × (22/7) × 7²",
        "4️⃣ = 4 × (22/7) × 49",
        "5️⃣ = 4 × 22 × 7 = 616 cm²"
      ]
    },
    {
      question: "🌍 Volume bola berjari-jari 10 cm? (π = 3,14)",
      type: "calculation",
      difficulty: "medium",
      points: 150,
      options: ["1.256 cm³", "2.512 cm³", "4.186,7 cm³", "6.283,2 cm³"],
      correct: 2,
      explanation: "💫 SEMPURNA! Volume bola = (4/3)πr³ - perhatikan r³ bukan r²!",
      steps: [
        "1️⃣ Rumus volume bola = (4/3)πr³",
        "2️⃣ π = 3,14, r = 10 cm",
        "3️⃣ r³ = 10³ = 1.000 cm³",
        "4️⃣ Volume = (4/3) × 3,14 × 1.000",
        "5️⃣ = 1,33 × 3,14 × 1.000 = 4.186,7 cm³"
      ]
    },
    {
      question: "🏀 Bola basket diameter 24 cm. Volume udara dalam bola? (π = 3,14)",
      type: "word_problem",
      difficulty: "hard",
      points: 200,
      options: ["2.304 cm³", "7.234,56 cm³", "7.234 cm³", "14.469 cm³"],
      correct: 1,
      explanation: "🚀 HEBAT SEKALI! Kamu sudah pro! Ingat: dari diameter ke jari-jari harus dibagi 2!",
      steps: [
        "1️⃣ Data: diameter = 24 cm → r = 12 cm",
        "2️⃣ Rumus volume = (4/3)πr³",
        "3️⃣ r³ = 12³ = 1.728 cm³",
        "4️⃣ Volume = (4/3) × 3,14 × 1.728",
        "5️⃣ = 1,33 × 3,14 × 1.728",
        "6️⃣ = 7.234,56 cm³"
      ]
    }
  ]
};