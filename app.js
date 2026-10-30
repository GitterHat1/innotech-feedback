/**
 * TrustVault - Apple-Inspired Minimalist Feedback Portal
 * Innotech 2026 Showcase
 * Client-Side Persistence via HTML5 LocalStorage
 */

const STORAGE_KEY = 'trustvault_submissions';

// DOM Elements
const feedbackForm = document.getElementById('feedback-form');
const formCard = document.getElementById('form-card');
const successCard = document.getElementById('success-card');
const submitBtn = document.getElementById('submit-btn');
const submitAnotherBtn = document.getElementById('submit-another-btn');

const reviewerNameInput = document.getElementById('reviewer-name');
const reviewerRoleSelect = document.getElementById('reviewer-role');
const reviewContentInput = document.getElementById('review-content');
const charCount = document.getElementById('char-count');

const starsContainer = document.getElementById('stars-container');
const starButtons = starsContainer.querySelectorAll('.star');
const ratingInput = document.getElementById('selected-rating');
const ratingFeedbackLabel = document.getElementById('rating-feedback-label');

const emojiChips = document.querySelectorAll('.emoji-chip');
const selectedEmojiInput = document.getElementById('selected-emoji');

// Receipt View Elements
const resName = document.getElementById('res-name');
const resRating = document.getElementById('res-rating');
const resEmoji = document.getElementById('res-emoji');
const resCode = document.getElementById('res-code');
const resText = document.getElementById('res-text');

// Confetti Canvas
const confettiCanvas = document.getElementById('confetti-canvas');

const RATING_LABELS = {
  1: 'Needs improvement',
  2: 'Fair',
  3: 'Good',
  4: 'Great',
  5: 'Exceptional'
};

/* ============================================================
   INITIALIZATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  setupStars();
  setupEmojis();
  setupTextarea();
  setupFormSubmission();
  setupConfetti();

  if (submitAnotherBtn) {
    submitAnotherBtn.addEventListener('click', resetToForm);
  }
});

/* ============================================================
   STARS HANDLER
   ============================================================ */
function setupStars() {
  starButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      const val = parseInt(btn.dataset.val, 10);
      highlightStars(val, true);
    });

    btn.addEventListener('mouseleave', () => {
      const current = parseInt(ratingInput.value, 10) || 0;
      highlightStars(current, false);
    });

    btn.addEventListener('click', () => {
      const val = parseInt(btn.dataset.val, 10);
      ratingInput.value = val;
      ratingFeedbackLabel.textContent = RATING_LABELS[val] || '';
      highlightStars(val, false);
    });
  });
}

function highlightStars(count, isHover) {
  starButtons.forEach(btn => {
    const val = parseInt(btn.dataset.val, 10);
    if (isHover) {
      if (val <= count) {
        btn.classList.add('hovered');
      } else {
        btn.classList.remove('hovered');
      }
    } else {
      btn.classList.remove('hovered');
      if (val <= count) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  });
}

/* ============================================================
   EMOJIS HANDLER
   ============================================================ */
function setupEmojis() {
  emojiChips.forEach(chip => {
    chip.addEventListener('click', () => {
      emojiChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedEmojiInput.value = chip.dataset.emoji;
    });
  });
}

/* ============================================================
   TEXTAREA CHARACTER COUNTER
   ============================================================ */
function setupTextarea() {
  reviewContentInput.addEventListener('input', () => {
    const len = reviewContentInput.value.length;
    charCount.textContent = `${len} / 500`;
  });
}

/* ============================================================
   FORM SUBMISSION & LOCAL STORAGE
   ============================================================ */
function setupFormSubmission() {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = reviewerNameInput.value.trim();
    const role = reviewerRoleSelect.value;
    const rating = parseInt(ratingInput.value, 10) || 0;
    const emoji = selectedEmojiInput.value || '🤩';
    const text = reviewContentInput.value.trim();

    if (rating === 0) {
      ratingFeedbackLabel.textContent = 'Please choose a rating';
      ratingFeedbackLabel.style.color = '#ff3b30';
      starsContainer.style.transform = 'translateX(4px)';
      setTimeout(() => starsContainer.style.transform = '', 150);
      return;
    }

    if (!name) {
      reviewerNameInput.focus();
      return;
    }

    if (!text) {
      reviewContentInput.focus();
      return;
    }

    // Button feedback
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-flex';

    setTimeout(() => {
      const code = 'TV-' + Math.floor(100000 + Math.random() * 900000);
      const submission = {
        id: code,
        name: name,
        role: role,
        rating: rating,
        emoji: emoji,
        text: text,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      saveSubmission(submission);

      // Render Receipt
      resName.textContent = `${submission.name} (${submission.role})`;
      resRating.textContent = `${'★'.repeat(submission.rating)} (${submission.rating} / 5)`;
      resEmoji.textContent = submission.emoji;
      resCode.textContent = submission.id;
      resText.textContent = `"${submission.text}"`;

      // Switch to success view
      formCard.style.display = 'none';
      successCard.style.display = 'block';

      // Reset button
      submitBtn.disabled = false;
      btnText.style.display = 'inline-flex';
      btnLoader.style.display = 'none';

      // Confetti celebration
      launchPastelConfetti();
    }, 400);
  });
}

function saveSubmission(submission) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.unshift(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

function resetToForm() {
  feedbackForm.reset();
  ratingInput.value = '0';
  highlightStars(0, false);
  ratingFeedbackLabel.textContent = 'Tap a star';
  ratingFeedbackLabel.style.color = 'var(--apple-blue)';
  charCount.textContent = '0 / 500';

  emojiChips.forEach(c => c.classList.remove('selected'));
  const defaultEmoji = document.querySelector('.emoji-chip[data-emoji="🤩"]');
  if (defaultEmoji) defaultEmoji.classList.add('selected');
  selectedEmojiInput.value = '🤩';

  successCard.style.display = 'none';
  formCard.style.display = 'block';
  reviewerNameInput.focus();
}

/* ============================================================
   APPLE-STYLE PASTEL CONFETTI
   ============================================================ */
let confettiCtx = null;
let confettiParticles = [];
let animId = null;

function setupConfetti() {
  if (!confettiCanvas) return;
  confettiCtx = confettiCanvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
  if (!confettiCanvas) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function launchPastelConfetti() {
  if (!confettiCtx) return;
  resizeCanvas();

  const colors = ['#0071e3', '#34c759', '#ff9500', '#af52de', '#5ac8fa', '#ffd60a'];
  confettiParticles = [];

  for (let i = 0; i < 70; i++) {
    confettiParticles.push({
      x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 150,
      y: window.innerHeight * 0.38 + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 10,
      vy: Math.random() * -8 - 3,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      opacity: 1,
      gravity: 0.28,
      friction: 0.98
    });
  }

  if (animId) cancelAnimationFrame(animId);
  animateConfetti();
}

function animateConfetti() {
  if (!confettiCtx) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  let active = 0;
  for (let p of confettiParticles) {
    p.vx *= p.friction;
    p.vy += p.gravity;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotationSpeed;
    p.opacity -= 0.014;

    if (p.opacity > 0 && p.y < window.innerHeight) {
      active++;
      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = Math.max(0, p.opacity);
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.3);
      confettiCtx.restore();
    }
  }

  if (active > 0) {
    animId = requestAnimationFrame(animateConfetti);
  } else {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}
