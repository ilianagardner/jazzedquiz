// 1. Quiz questions and answers with mood types
const questions = [
  {
    text: "Pick a color palette:",
    options: [
      { text: "Cream & Gold", mood: "golden" },
      { text: "Peach & Blush", mood: "romantic" },
      { text: "Emerald & Black", mood: "lazy" },
      { text: "Sky Blue & Sand", mood: "bossa" },
      { text: "Ivory & Gray", mood: "soft" },
    ],
  },
  {
    text: "What's your perfect weekend activity?",
    options: [
      { text: "Vintage shopping downtown", mood: "golden" },
      { text: "Dinner date with candles", mood: "romantic" },
      { text: "Napping with your cat", mood: "lazy" },
      { text: "Beach walk and iced coffee", mood: "bossa" },
      { text: "Reading or journaling in bed", mood: "soft" },
    ],
  },
  {
    text: "Choose a drink:",
    options: [
      { text: "Dirty martini", mood: "golden" },
      { text: "Red wine", mood: "romantic" },
      { text: "Chamomile tea", mood: "lazy" },
      { text: "Caipirinha", mood: "bossa" },
      { text: "Iced matcha", mood: "soft" },
    ],
  },
  {
    text: "Which setting sounds best?",
    options: [
      { text: "Classic jazz bar in NYC", mood: "golden" },
      { text: "A garden dinner party", mood: "romantic" },
      { text: "Your couch with a blanket", mood: "lazy" },
      { text: "Sunset on the balcony", mood: "bossa" },
      { text: "A soft-lit café", mood: "soft" },
    ],
  },
  {
    text: "Pick an instrument:",
    options: [
      { text: "Upright bass", mood: "golden" },
      { text: "Saxophone", mood: "romantic" },
      { text: "Piano", mood: "lazy" },
      { text: "Guitar", mood: "bossa" },
      { text: "Flute", mood: "soft" },
    ],
  },
];

// 2. Results by mood type
const results = {
  golden: {
    title: "Golden Standard",
    description: "Timeless swing and bebop from the greats. You're all about the classics.",
    playlist: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DXbITWG1ZJKYt?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    artists: [
      { name: "Miles Davis", image: "miles.png" },
      { name: "Ella Fitzgerald", image: "ella.png" },
      { name: "Louis Armstrong", image: "louis.png" }
    ],
    color: "#F6E27F",
    background: "url('gold.jpg')",
    quote: "A classic never goes out of style."
  },
  // (other mood types are the same as before)
};

// 3. State to track answers
let currentQuestion = 0;
let moodCounts = {
  golden: 0,
  romantic: 0,
  lazy: 0,
  bossa: 0,
  soft: 0,
};

// 4. Screen switching function
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// 5. Start quiz function
function goToQuestion() {
  currentQuestion = 0;
  moodCounts = { golden: 0, romantic: 0, lazy: 0, bossa: 0, soft: 0 };
  showScreen('question');
  showQuestion();
}

// 6. Show each question
function showQuestion() {
  const container = document.getElementById('question-container');
  container.innerHTML = '';

  const q = questions[currentQuestion];
  const questionText = document.createElement('h2');
  questionText.textContent = q.text;
  container.appendChild(questionText);

  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option.text;
    btn.onclick = () => {
      moodCounts[option.mood]++;
      nextQuestion();
    };
    container.appendChild(btn);
  });
}

// 7. Go to next question or show result
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// 8. Show final mood result
function showResult() {
  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0];
  const result = results[topMood];

  // Set the result title, description, quote, and playlist
  document.getElementById('result-title').textContent = result.title;
  document.getElementById('result-quote').textContent = result.quote || ''; // Ensure this shows an empty string if no quote
  document.getElementById('result-description').textContent = result.description || "No description available."; // Provide a fallback if description is missing
  document.getElementById('playlist-container').innerHTML = result.playlist;

  // Render artist cards
  const artistGrid = document.getElementById('artist-grid');
  artistGrid.innerHTML = '';
  result.artists.forEach(artist => {
    const card = document.createElement('div');
    card.className = 'artist-card';
    card.innerHTML = `
      <img src="${artist.image}" alt="${artist.name}" />
      <p>${artist.name}</p>
    `;
    artistGrid.appendChild(card);
  });

  // Set the mood's background image
  document.body.style.background = result.background;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";

  // Remove any previously added result classes
  document.body.classList.remove('result-golden', 'result-romantic', 'result-lazy', 'result-bossa', 'result-soft');

  // Add the class for the current result
  document.body.classList.add(`result-${topMood}`);

  showScreen('result');
}

// 9. Restart function
function restartQuiz() {
  document.body.style.background = "#f4f1e1"; 
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";

  showScreen('start');
}

// 10. Add event listener for the Start button
document.getElementById('start-button').addEventListener('click', goToQuestion);
