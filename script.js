const quizValues = {
  color:    ["logical",   "creative",  "logical",   "creative"],
  vacation: ["extrovert", "introvert", "extrovert", "introvert"],
  pizza:    ["creative",  "logical",   "creative",  "logical"],
  house:    ["introvert", "extrovert", "introvert", "extrovert"],
  fruit:    ["logical",   "creative",  "logical",   "creative"],
  activity: ["extrovert", "introvert", "extrovert", "introvert"],
  comic:    ["extrovert", "introvert", "introvert", "extrovert"],
};

const quizTaker = { logical: 0, creative: 0, extrovert: 0, introvert: 0 };
let answeredCount = 0;

const progressFill  = document.getElementById("progress-fill");
const currentQLabel = document.getElementById("current-q");
const progressPct   = document.getElementById("progress-pct");
const dots          = document.querySelectorAll(".step-dot");

function updateProgress() {
  const pct = Math.round((answeredCount / 7) * 100);
  progressFill.style.width = pct + "%";
  currentQLabel.textContent = Math.min(answeredCount + 1, 7);
  progressPct.textContent   = pct + "%";

  dots.forEach((dot, i) => {
    dot.classList.remove("active", "completed");
    if (i < answeredCount)       dot.classList.add("completed");
    else if (i === answeredCount) dot.classList.add("active");
  });
}

updateProgress();

function handleAnswer(card) {
  const [questionKey, indexStr] = card.id.split("-");
  const index = parseInt(indexStr);
  const questionSection = card.closest(".question");
  const siblingCards    = questionSection.querySelectorAll(".answer-card");

  card.classList.add("selected");
  siblingCards.forEach(c => { if (c !== card) c.classList.add("dimmed"); });

  quizTaker[quizValues[questionKey][index]]++;
  answeredCount++;
  updateProgress();

  setTimeout(() => {
    if (questionKey === "comic") {
      showResult();
    } else {
      advanceToNext(questionSection);
    }
  }, 700);
}

function advanceToNext(currentSection) {
  const allQuestions = document.querySelectorAll(".question");
  const idx  = Array.from(allQuestions).indexOf(currentSection);
  const next = allQuestions[idx + 1];
  if (!next) return;

  currentSection.classList.remove("active");
  next.classList.add("active");

  document.getElementById("quiz-container").scrollIntoView({ behavior: "smooth", block: "start" });
}

function showResult() {
  const progressSection = document.getElementById("progress-section");
  const quizContainer   = document.getElementById("quiz-container");

  progressFill.style.width = "100%";
  progressPct.textContent  = "100%";

  let resultId  = quizTaker.logical   > quizTaker.creative  ? "logical-"   : "creative-";
  resultId     += quizTaker.introvert > quizTaker.extrovert ? "introvert"  : "extrovert";

  const resultEl = document.getElementById(resultId);

  progressSection.style.transition = "opacity 0.45s ease";
  progressSection.style.opacity    = "0";

  setTimeout(() => {
    progressSection.style.display = "none";
    quizContainer.style.transition = "opacity 0.45s ease";
    quizContainer.style.opacity    = "0";

    setTimeout(() => {
      quizContainer.style.display = "none";
      resultEl.classList.add("visible");
      resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
      launchConfetti();
    }, 450);
  }, 450);
}

// ── Confetti ──────────────────────────────────────────────────────────────────

function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx    = canvas.getContext("2d");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors   = ["#7c3aed","#a78bfa","#6366f1","#c4b5fd","#f59e0b","#10b981","#ec4899","#f472b6"];
  const particles = Array.from({ length: 160 }, () => ({
    x:             Math.random() * canvas.width,
    y:             -20 - Math.random() * 80,
    w:             Math.random() * 10 + 4,
    h:             Math.random() * 6  + 3,
    color:         colors[Math.floor(Math.random() * colors.length)],
    vx:            (Math.random() - 0.5) * 4.5,
    vy:            Math.random() * 3.5 + 1.5,
    rotation:      Math.random() * 360,
    rotSpeed:      (Math.random() - 0.5) * 7,
    opacity:       1,
  }));

  let frame = 0;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x        += p.vx;
      p.y        += p.vy;
      p.vy       += 0.06;
      p.rotation += p.rotSpeed;
      if (p.y > canvas.height * 0.75) p.opacity -= 0.018;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    frame++;
    if (frame < 200) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  animate();
}

// ── Share button ──────────────────────────────────────────────────────────────

document.querySelectorAll(".share-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    const text = `I just took the Fuzzy Personality Quiz and I'm "${type}"! What are you? 🧠✨`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = "Copied! ✓";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Share Result";
          btn.classList.remove("copied");
        }, 2200);
      });
    }
  });
});

// ── Answer click listeners ────────────────────────────────────────────────────

document.querySelectorAll(".answer-card").forEach(card => {
  card.addEventListener("click", () => {
    if (!card.classList.contains("selected") && !card.classList.contains("dimmed")) {
      handleAnswer(card);
    }
  });
});
