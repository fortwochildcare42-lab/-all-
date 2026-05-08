// ===== Common JS for all lesson pages =====

// Scroll to top button
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.innerHTML = '▲';
  btn.title = 'トップへ戻る';
  btn.setAttribute('aria-label', 'ページトップへ戻る');
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 300);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

// ===== Toggle answer =====
function toggleAnswer(btn, contentId) {
  const content = document.getElementById(contentId);
  if (!content) return;
  const hidden = content.classList.toggle('hidden');
  btn.classList.toggle('revealed', !hidden);
  if (!hidden) {
    btn.textContent = '✅ 解答を隠す';
    content.classList.add('fade-in');
  } else {
    btn.innerHTML = '🔍 解答・解説を見る';
  }
}

// ===== Multiple choice quiz =====
function setupMCQ(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('change', (e) => {
    const radio = e.target;
    if (radio.type !== 'radio') return;
    const name = radio.name;
    const radios = form.querySelectorAll(`input[name="${name}"]`);
    const correct = form.querySelector(`input[name="${name}"][data-correct="true"]`);
    radios.forEach(r => {
      const label = r.parentElement;
      label.classList.remove('correct', 'wrong');
      r.disabled = true;
    });
    const selected = form.querySelector(`input[name="${name}"]:checked`);
    if (selected) {
      selected.parentElement.classList.add(selected.dataset.correct === 'true' ? 'correct' : 'wrong');
      if (correct) correct.parentElement.classList.add('correct');
    }
  });
}

// ===== Timer =====
function startTimer(displayId) {
  const el = document.getElementById(displayId);
  if (!el) return;
  let sec = 0;
  const t = setInterval(() => {
    sec++;
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    el.textContent = `${m}:${s}`;
  }, 1000);
  return t;
}

// ===== Progress calculation =====
function updateProgress(barId, current, total) {
  const bar = document.getElementById(barId);
  if (!bar) return;
  bar.style.width = `${Math.round((current / total) * 100)}%`;
}

// ===== Score calculation =====
function calcScore(formId, resultId) {
  const form = document.getElementById(formId);
  const result = document.getElementById(resultId);
  if (!form || !result) return;
  const questions = [...new Set([...form.querySelectorAll('input[type=radio]')].map(r => r.name))];
  let correct = 0;
  questions.forEach(name => {
    const ans = form.querySelector(`input[name="${name}"]:checked`);
    if (ans && ans.dataset.correct === 'true') correct++;
  });
  const total = questions.length;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  result.innerHTML = `
    <div class="score-display pop-in">
      <div class="score-number">${correct} / ${total}</div>
      <div class="score-label">正答率 ${pct}%&nbsp; ${pct >= 80 ? '🎉 Great job!' : pct >= 60 ? '👍 Good effort!' : '📖 復習しよう!'}</div>
    </div>`;
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== Highlight fill blanks =====
function checkFill(inputEl, correctAnswer) {
  const val = inputEl.value.trim().toLowerCase();
  const ans = correctAnswer.toLowerCase();
  inputEl.classList.remove('correct-input', 'wrong-input');
  inputEl.classList.add(val === ans ? 'correct-input' : 'wrong-input');
}

// ===== Writing self-check helper =====
function toggleSampleAnswer(btnId, areaId) {
  const btn = document.getElementById(btnId);
  const area = document.getElementById(areaId);
  if (!btn || !area) return;
  btn.addEventListener('click', () => {
    const hidden = area.classList.toggle('hidden');
    btn.textContent = hidden ? '📝 模範解答を見る' : '📝 模範解答を隠す';
  });
}
