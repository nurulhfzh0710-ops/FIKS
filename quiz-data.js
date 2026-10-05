// DATABASE SOAL DENGAN 3 TINGKAT KESULITAN
const quizDatabase = {
  cylinder: [
    {
      question: "Sebuah tabung memiliki jari-jari 7 cm dan tinggi 10 cm. Berapa luas alas tabung? (π = 22/7)",
      type: "calculation",
      difficulty: "easy",
      options: ["154 cm²", "220 cm²", "308 cm²", "77 cm²"],
      correct: 0,
      explanation: "Luas alas tabung adalah luas lingkaran.",
      steps: [
        "Langkah 1: Identifikasi rumus luas lingkaran = πr²",
        "Langkah 2: Diketahui r = 7 cm dan π = 22/7",
        "Langkah 3: Substitusi ke rumus: Luas = (22/7) × 7²",
        "Langkah 4: Luas = (22/7) × 49 = 22 × 7 = 154 cm²",
        "Kesimpulan: Luas alas tabung = 154 cm²"
      ]
    },
    {
      question: "Luas selimut tabung dengan r = 5 cm dan t = 12 cm adalah? (π = 3,14)",
      type: "calculation",
      difficulty: "medium",
      options: ["188,4 cm²", "314 cm²", "376,8 cm²", "565,2 cm²"],
      correct: 2,
      explanation: "Selimut tabung berbentuk persegi panjang saat dibuka.",
      steps: [
        "Langkah 1: Rumus luas selimut = 2πrt",
        "Langkah 2: Diketahui r = 5 cm, t = 12 cm, π = 3,14",
        "Langkah 3: Substitusi: Luas = 2 × 3,14 × 5 × 12",
        "Langkah 4: Luas = 2 × 3,14 × 60 = 6,28 × 60 = 376,8 cm²",
        "Kesimpulan: Luas selimut tabung = 376,8 cm²"
      ]
    },
    {
      question: "Sebuah drum berbentuk tabung memiliki diameter 70 cm dan tinggi 100 cm. Berapa volume air yang dapat ditampung? (π = 22/7)",
      type: "word_problem",
      difficulty: "hard",
      options: ["38.500 cm³", "385.000 cm³", "3.850.000 cm³", "38.500.000 cm³"],
      correct: 2,
      explanation: "Ini adalah soal cerita tentang volume tabung.",
      steps: [
        "Langkah 1: Identifikasi data: diameter = 70 cm, tinggi = 100 cm",
        "Langkah 2: Cari jari-jari: r = diameter ÷ 2 = 70 ÷ 2 = 35 cm",
        "Langkah 3: Rumus volume tabung = πr²t",
        "Langkah 4: Volume = (22/7) × 35² × 100",
        "Langkah 5: Volume = (22/7) × 1.225 × 100 = 22 × 175 × 100 = 3.850.000 cm³",
        "Kesimpulan: Drum dapat menampung 3.850.000 cm³ air"
      ]
    }
  ],

  cone: [
    {
      question: "Sebuah kerucut memiliki jari-jari 6 cm dan tinggi 8 cm. Berapa garis pelukisnya?",
      type: "calculation",
      difficulty: "easy",
      options: ["10 cm", "12 cm", "14 cm", "16 cm"],
      correct: 0,
      explanation: "Garis pelukis adalah hipotenusa segitiga siku-siku.",
      steps: [
        "Langkah 1: Gunakan Teorema Pythagoras: s² = r² + t²",
        "Langkah 2: Diketahui r = 6 cm dan t = 8 cm",
        "Langkah 3: Substitusi: s² = 6² + 8² = 36 + 64 = 100",
        "Langkah 4: s = √100 = 10 cm",
        "Kesimpulan: Garis pelukis kerucut = 10 cm"
      ]
    },
    {
      question: "Luas selimut kerucut dengan r = 5 cm dan s = 13 cm adalah? (π = 3,14)",
      type: "calculation",
      difficulty: "medium",
      options: ["157 cm²", "204,1 cm²", "251,2 cm²", "314 cm²"],
      correct: 1,
      explanation: "Selimut kerucut membentuk juring lingkaran saat dibuka.",
      steps: [
        "Langkah 1: Rumus luas selimut kerucut = πrs",
        "Langkah 2: Diketahui r = 5 cm, s = 13 cm, π = 3,14",
        "Langkah 3: Substitusi: Luas = 3,14 × 5 × 13",
        "Langkah 4: Luas = 3,14 × 65 = 204,1 cm²",
        "Kesimpulan: Luas selimut kerucut = 204,1 cm²"
      ]
    },
    {
      question: "Sebuah es krim berbentuk kerucut memiliki diameter alas 4 cm dan tinggi 10 cm. Berapa volume es krim tersebut? (π = 3,14)",
      type: "word_problem",
      difficulty: "hard",
      options: ["41,87 cm³", "125,6 cm³", "251,2 cm³", "502,4 cm³"],
      correct: 0,
      explanation: "Soal cerita tentang volume kerucut.",
      steps: [
        "Langkah 1: Identifikasi data: diameter = 4 cm, tinggi = 10 cm",
        "Langkah 2: Cari jari-jari: r = diameter ÷ 2 = 4 ÷ 2 = 2 cm",
        "Langkah 3: Rumus volume kerucut = (1/3)πr²t",
        "Langkah 4: Volume = (1/3) × 3,14 × 2² × 10",
        "Langkah 5: Volume = (1/3) × 3,14 × 4 × 10 = (1/3) × 125,6 = 41,87 cm³",
        "Kesimpulan: Volume es krim = 41,87 cm³"
      ]
    }
  ],

  sphere: [
    {
      question: "Luas permukaan bola dengan r = 7 cm adalah? (π = 22/7)",
      type: "calculation",
      difficulty: "easy",
      options: ["154 cm²", "308 cm²", "616 cm²", "924 cm²"],
      correct: 2,
      explanation: "Luas permukaan bola mencakup seluruh bagian luar bola.",
      steps: [
        "Langkah 1: Rumus luas permukaan bola = 4πr²",
        "Langkah 2: Diketahui r = 7 cm dan π = 22/7",
        "Langkah 3: Substitusi: Luas = 4 × (22/7) × 7²",
        "Langkah 4: Luas = 4 × (22/7) × 49 = 4 × 22 × 7 = 616 cm²",
        "Kesimpulan: Luas permukaan bola = 616 cm²"
      ]
    },
    {
      question: "Volume bola dengan r = 10 cm adalah? (π = 3,14)",
      type: "calculation",
      difficulty: "medium",
      options: ["1.256 cm³", "2.512 cm³", "4.186,7 cm³", "6.283,2 cm³"],
      correct: 2,
      explanation: "Volume bola adalah ruang yang ditempati oleh bola.",
      steps: [
        "Langkah 1: Rumus volume bola = (4/3)πr³",
        "Langkah 2: Diketahui r = 10 cm dan π = 3,14",
        "Langkah 3: Hitung r³ = 10³ = 1.000 cm³",
        "Langkah 4: Volume = (4/3) × 3,14 × 1.000",
        "Langkah 5: Volume = 1,33 × 3,14 × 1.000 = 4.186,7 cm³",
        "Kesimpulan: Volume bola = 4.186,7 cm³"
      ]
    },
    {
      question: "Sebuah bola basket memiliki diameter 24 cm. Berapa volume udara yang dapat ditampung bola tersebut? (π = 3,14)",
      type: "word_problem",
      difficulty: "hard",
      options: ["2.304 cm³", "7.234,56 cm³", "7.234 cm³", "14.469 cm³"],
      correct: 1,
      explanation: "Soal cerita tentang volume bola.",
      steps: [
        "Langkah 1: Identifikasi data: diameter = 24 cm",
        "Langkah 2: Cari jari-jari: r = diameter ÷ 2 = 24 ÷ 2 = 12 cm",
        "Langkah 3: Rumus volume bola = (4/3)πr³",
        "Langkah 4: Hitung r³ = 12³ = 1.728 cm³",
        "Langkah 5: Volume = (4/3) × 3,14 × 1.728",
        "Langkah 6: Volume = 1,33 × 3,14 × 1.728 = 7.234,56 cm³",
        "Kesimpulan: Volume bola basket = 7.234,56 cm³"
      ]
    }
  ]
};