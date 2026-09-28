// Main Application Controller for Evrenin Yapıtaşı
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Background Canvas
  if (window.initCosmicCanvas) {
    window.initCosmicCanvas();
  }

  // State
  let currentLang = 'tr';
  let activeEraFilter = 'all';
  let activeLab = 'atom';

  // DOM Elements
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  const soundText = document.getElementById('sound-text');
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const timelineContainer = document.getElementById('timeline-cards-container');
  const timelineFilterBtns = document.querySelectorAll('.timeline-filter-btn');
  const timelineSearchInput = document.getElementById('timeline-search');
  const modalOverlay = document.getElementById('event-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // Sound Toggle Handler
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const isPlaying = window.CosmicAudio.toggleAmbient();
      if (isPlaying) {
        soundIcon.textContent = '🔊';
        soundText.textContent = currentLang === 'tr' ? 'Ses Açık (432Hz)' : 'Sound On (432Hz)';
        soundToggleBtn.classList.add('border-quantum-cyan', 'text-quantum-cyan');
      } else {
        soundIcon.textContent = '🔇';
        soundText.textContent = currentLang === 'tr' ? 'Kozmik Ses' : 'Cosmic Sound';
        soundToggleBtn.classList.remove('border-quantum-cyan', 'text-quantum-cyan');
      }
    });
  }

  // Language Toggle Handler
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'tr' ? 'en' : 'tr';
      langToggleBtn.textContent = currentLang === 'tr' ? '🇹🇷 TR | EN' : '🇬🇧 EN | TR';
      updatePageLanguage();
      renderTimeline();
      renderComparisonMatrix();
      renderQuiz();
      if (window.CosmicAudio) {
        window.CosmicAudio.playQuantumPing(640);
      }
    });
  }

  function updatePageLanguage() {
    document.querySelectorAll('[data-tr]').forEach(el => {
      const trText = el.getAttribute('data-tr');
      const enText = el.getAttribute('data-en');
      if (currentLang === 'tr' && trText) {
        el.textContent = trText;
      } else if (currentLang === 'en' && enText) {
        el.textContent = enText;
      }
    });

    document.querySelectorAll('[data-tr-placeholder]').forEach(el => {
      const trPl = el.getAttribute('data-tr-placeholder');
      const enPl = el.getAttribute('data-en-placeholder');
      el.placeholder = currentLang === 'tr' ? trPl : enPl;
    });
  }

  // Render Timeline Cards
  function renderTimeline() {
    if (!timelineContainer) return;
    const searchTerm = (timelineSearchInput ? timelineSearchInput.value : '').toLowerCase().trim();
    
    const events = window.APP_DATA.timeline.filter(item => {
      const matchesEra = activeEraFilter === 'all' || item.era === activeEraFilter;
      const title = (currentLang === 'tr' ? item.title : item.titleEn).toLowerCase();
      const thinker = item.thinker.toLowerCase();
      const summary = (currentLang === 'tr' ? item.summary : item.summaryEn).toLowerCase();
      const matchesSearch = !searchTerm || title.includes(searchTerm) || thinker.includes(searchTerm) || summary.includes(searchTerm);
      return matchesEra && matchesSearch;
    });

    timelineContainer.innerHTML = '';

    if (events.length === 0) {
      timelineContainer.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          <p class="text-lg">${currentLang === 'tr' ? 'Aramanızla eşleşen olay bulunamadı.' : 'No timeline events found matching your criteria.'}</p>
        </div>
      `;
      return;
    }

    events.forEach(evt => {
      const card = document.createElement('div');
      card.className = 'glass-panel p-6 rounded-2xl cursor-pointer hover:border-cyan-400/50 hover:bg-slate-900/80 transition-all-300 transform hover:-translate-y-1 relative group flex flex-col justify-between';
      
      const eraBadgeColors = {
        ancient: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        classical: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        quantum: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        digital: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
      };

      const title = currentLang === 'tr' ? evt.title : evt.titleEn;
      const summary = currentLang === 'tr' ? evt.summary : evt.summaryEn;
      const tag = evt.tag;

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${eraBadgeColors[evt.era]}">
              ${evt.year}
            </span>
            <span class="text-xs text-slate-400 font-mono bg-slate-800/60 px-2 py-0.5 rounded">
              ${tag}
            </span>
          </div>
          <h3 class="text-lg font-bold text-white mb-1 group-hover:text-quantum-cyan transition-colors">
            ${title}
          </h3>
          <p class="text-xs font-semibold text-quantum-purple mb-3">
            👤 ${evt.thinker}
          </p>
          <p class="text-sm text-slate-300 line-clamp-3 mb-4">
            ${summary}
          </p>
        </div>

        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-quantum-cyan font-medium">
          <span>${currentLang === 'tr' ? 'Detaylı İncele →' : 'Explore Details →'}</span>
          <span class="opacity-0 group-hover:opacity-100 transition-opacity">⚡</span>
        </div>
      `;

      card.addEventListener('click', () => {
        openModal(evt);
        if (window.CosmicAudio) window.CosmicAudio.playQuantumPing(700);
      });

      timelineContainer.appendChild(card);
    });
  }

  // Filter Buttons
  timelineFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timelineFilterBtns.forEach(b => b.classList.remove('bg-cyan-500/20', 'text-quantum-cyan', 'border-quantum-cyan/50'));
      btn.classList.add('bg-cyan-500/20', 'text-quantum-cyan', 'border-quantum-cyan/50');
      activeEraFilter = btn.getAttribute('data-era') || 'all';
      renderTimeline();
    });
  });

  if (timelineSearchInput) {
    timelineSearchInput.addEventListener('input', () => {
      renderTimeline();
    });
  }

  // Modal Open/Close
  function openModal(evt) {
    if (!modalOverlay) return;
    const titleEl = document.getElementById('modal-title');
    const thinkerEl = document.getElementById('modal-thinker');
    const yearEl = document.getElementById('modal-year');
    const quoteEl = document.getElementById('modal-quote');
    const quoteAuthorEl = document.getElementById('modal-quote-author');
    const quoteBox = document.getElementById('modal-quote-box');
    const descEl = document.getElementById('modal-desc');
    const conceptsEl = document.getElementById('modal-concepts');
    const impactEl = document.getElementById('modal-impact');
    const formulaEl = document.getElementById('modal-formula');
    const formulaBox = document.getElementById('modal-formula-box');

    const title = currentLang === 'tr' ? evt.title : evt.titleEn;
    const desc = currentLang === 'tr' ? evt.fullDescription : evt.fullDescriptionEn;
    const impact = currentLang === 'tr' ? evt.impact : evt.impactEn;

    if (titleEl) titleEl.textContent = title;
    if (thinkerEl) thinkerEl.textContent = evt.thinker;
    if (yearEl) yearEl.textContent = evt.year;
    if (descEl) descEl.textContent = desc;
    if (impactEl) impactEl.textContent = impact;

    if (quoteEl && evt.quote) {
      quoteBox.classList.remove('hidden');
      quoteEl.textContent = `"${evt.quote}"`;
      if (quoteAuthorEl) quoteAuthorEl.textContent = `— ${evt.quoteAuthor || evt.thinker}`;
    } else if (quoteBox) {
      quoteBox.classList.add('hidden');
    }

    if (formulaEl && evt.formula) {
      formulaBox.classList.remove('hidden');
      formulaEl.textContent = evt.formula;
    } else if (formulaBox) {
      formulaBox.classList.add('hidden');
    }

    if (conceptsEl && evt.keyConcepts) {
      conceptsEl.innerHTML = evt.keyConcepts.map(c => `
        <span class="px-2.5 py-1 bg-slate-800 text-cyan-300 rounded-lg text-xs font-mono border border-cyan-500/20">
          # ${c}
        </span>
      `).join('');
    }

    modalOverlay.classList.remove('hidden');
    modalOverlay.classList.add('flex');
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('hidden');
      modalOverlay.classList.remove('flex');
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Render Comparison Matrix
  function renderComparisonMatrix() {
    const tableBody = document.getElementById('comparison-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    window.APP_DATA.comparisonMatrix.forEach(row => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-800/80 hover:bg-slate-900/50 transition-colors';
      const feature = currentLang === 'tr' ? row.feature : row.featureEn;
      const matter = currentLang === 'tr' ? row.matter : row.matterEn;
      const energy = currentLang === 'tr' ? row.energy : row.energyEn;
      const info = currentLang === 'tr' ? row.information : row.informationEn;

      tr.innerHTML = `
        <td class="p-4 font-semibold text-cyan-300 font-mono text-xs md:text-sm bg-slate-950/40">${feature}</td>
        <td class="p-4 text-slate-300 text-xs md:text-sm">${matter}</td>
        <td class="p-4 text-slate-300 text-xs md:text-sm bg-purple-950/20">${energy}</td>
        <td class="p-4 text-slate-300 text-xs md:text-sm bg-cyan-950/20 font-medium text-white">${info}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  // Interactive Quiz Engine
  let quizCurrentIndex = 0;
  let quizScore = 0;
  let quizSelectedAnswers = {};

  function renderQuiz() {
    const quizCard = document.getElementById('quiz-card');
    if (!quizCard) return;
    const questions = window.APP_DATA.quiz;

    if (quizCurrentIndex >= questions.length) {
      // Finished
      const pct = Math.round((quizScore / questions.length) * 100);
      let rankTr = 'Kozmik Başlangıç Seviyesi';
      let rankEn = 'Cosmic Apprentice';
      if (pct >= 80) { rankTr = 'Kozmik Enformasyon Mimarı 🌌'; rankEn = 'Cosmic Information Architect 🌌'; }
      else if (pct >= 60) { rankTr = 'Kuantum Alan Kaşifi ⚡'; rankEn = 'Quantum Field Explorer ⚡'; }

      quizCard.innerHTML = `
        <div class="text-center py-8">
          <div class="text-5xl mb-4">🏆</div>
          <h3 class="text-2xl font-bold text-white mb-2">
            ${currentLang === 'tr' ? 'Test Tamamlandı!' : 'Quiz Completed!'}
          </h3>
          <p class="text-quantum-cyan font-mono text-xl mb-4">
            ${currentLang === 'tr' ? `Puanınız: %${pct} (${quizScore} / ${questions.length})` : `Score: ${pct}% (${quizScore} / ${questions.length})`}
          </p>
          <div class="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-xl text-purple-300 font-semibold mb-6">
            ${currentLang === 'tr' ? `Unvan: ${rankTr}` : `Title: ${rankEn}`}
          </div>
          <p class="text-sm text-slate-300 max-w-md mx-auto mb-6">
            ${currentLang === 'tr' ? 'Maddeden Enerjiye, Enerjiden Enformasyona uzanan kozmik yolculuğu başarıyla test ettiniz.' : 'You have explored the cosmic journey from Matter to Energy to Information.'}
          </p>
          <button id="restart-quiz-btn" class="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all">
            ${currentLang === 'tr' ? 'Tekrar Çöz' : 'Restart Quiz'}
          </button>
        </div>
      `;

      const restartBtn = document.getElementById('restart-quiz-btn');
      if (restartBtn) {
        restartBtn.addEventListener('click', () => {
          quizCurrentIndex = 0;
          quizScore = 0;
          quizSelectedAnswers = {};
          renderQuiz();
        });
      }
      return;
    }

    const q = questions[quizCurrentIndex];
    const qText = currentLang === 'tr' ? q.question : q.questionEn;
    const explanation = currentLang === 'tr' ? q.explanation : q.explanationEn;
    const hasAnswered = quizSelectedAnswers[quizCurrentIndex] !== undefined;
    const selectedIdx = quizSelectedAnswers[quizCurrentIndex];

    quizCard.innerHTML = `
      <div>
        <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 pb-2 border-b border-slate-800">
          <span>${currentLang === 'tr' ? `Soru ${quizCurrentIndex + 1} / ${questions.length}` : `Question ${quizCurrentIndex + 1} / ${questions.length}`}</span>
          <span>${currentLang === 'tr' ? `Mevcut Puan: ${quizScore}` : `Current Score: ${quizScore}`}</span>
        </div>
        <h3 class="text-base md:text-lg font-bold text-white mb-6">
          ${qText}
        </h3>
        <div class="space-y-3 mb-6" id="quiz-options-container">
          ${q.options.map((opt, idx) => {
            const optText = currentLang === 'tr' ? opt.text : opt.textEn;
            let optClass = 'glass-panel p-4 rounded-xl border border-slate-700/60 hover:border-cyan-400/50 cursor-pointer text-sm transition-all flex items-start gap-3';
            if (hasAnswered) {
              if (opt.isCorrect) {
                optClass = 'bg-emerald-950/60 border border-emerald-500 text-emerald-200 p-4 rounded-xl text-sm flex items-start gap-3';
              } else if (idx === selectedIdx && !opt.isCorrect) {
                optClass = 'bg-red-950/60 border border-red-500 text-red-200 p-4 rounded-xl text-sm flex items-start gap-3';
              } else {
                optClass = 'opacity-40 p-4 rounded-xl border border-slate-800 text-sm flex items-start gap-3';
              }
            }
            return `
              <div class="${optClass}" data-opt-idx="${idx}">
                <span class="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center font-mono text-xs flex-shrink-0 mt-0.5">
                  ${String.fromCharCode(65 + idx)}
                </span>
                <span>${optText}</span>
              </div>
            `;
          }).join('')}
        </div>

        ${hasAnswered ? `
          <div class="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-xs md:text-sm text-cyan-200 mb-6 animate-modal">
            <strong>💡 ${currentLang === 'tr' ? 'Açıklama' : 'Explanation'}:</strong> ${explanation}
          </div>
          <div class="flex justify-end">
            <button id="next-question-btn" class="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-semibold text-sm shadow-md hover:shadow-cyan-500/30">
              ${quizCurrentIndex + 1 === questions.length ? (currentLang === 'tr' ? 'Sonuçları Gör' : 'See Results') : (currentLang === 'tr' ? 'Sonraki Soru →' : 'Next Question →')}
            </button>
          </div>
        ` : ''}
      </div>
    `;

    if (!hasAnswered) {
      document.querySelectorAll('#quiz-options-container > div').forEach(el => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.getAttribute('data-opt-idx') || '0', 10);
          quizSelectedAnswers[quizCurrentIndex] = idx;
          if (q.options[idx].isCorrect) {
            quizScore++;
            if (window.CosmicAudio) window.CosmicAudio.playQuantumPing(880);
          } else {
            if (window.CosmicAudio) window.CosmicAudio.playQuantumPing(220);
          }
          renderQuiz();
        });
      });
    } else {
      const nextBtn = document.getElementById('next-question-btn');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          quizCurrentIndex++;
          renderQuiz();
        });
      }
    }
  }

  // -------------------------------------------------------------
  // SIMULATION LABS CONTROLLERS
  // -------------------------------------------------------------
  const labNavBtns = document.querySelectorAll('.lab-nav-btn');
  const labViews = document.querySelectorAll('.lab-view');

  labNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      labNavBtns.forEach(b => b.classList.remove('bg-cyan-500/20', 'text-quantum-cyan', 'border-quantum-cyan/50'));
      btn.classList.add('bg-cyan-500/20', 'text-quantum-cyan', 'border-quantum-cyan/50');
      activeLab = btn.getAttribute('data-lab') || 'atom';
      labViews.forEach(v => v.classList.add('hidden'));
      const activeView = document.getElementById(`lab-${activeLab}`);
      if (activeView) activeView.classList.remove('hidden');
      initOrResumeLab(activeLab);
    });
  });

  function initOrResumeLab(labKey) {
    if (labKey === 'atom') initAtomLab();
    else if (labKey === 'doubleslit') initDoubleSlitLab();
    else if (labKey === 'cellular') initCellularLab();
    else if (labKey === 'qubit') initQubitLab();
    else if (labKey === 'blackhole') initBlackHoleLab();
    else if (labKey === 'bostrom') initBostromLab();
  }

  // LAB 1: Atom & Quantum Orbitals Lab
  let atomCanvas, atomCtx, atomModel = 'schrodinger', atomEnergy = 2, atomAngle = 0;
  function initAtomLab() {
    atomCanvas = document.getElementById('atom-canvas');
    if (!atomCanvas) return;
    atomCtx = atomCanvas.getContext('2d');
    atomCanvas.width = atomCanvas.parentElement.clientWidth || 500;
    atomCanvas.height = 340;

    const atomModelSelect = document.getElementById('atom-model-select');
    if (atomModelSelect) {
      atomModelSelect.onchange = (e) => {
        atomModel = e.target.value;
      };
    }

    const exciteBtn = document.getElementById('atom-excite-btn');
    if (exciteBtn) {
      exciteBtn.onclick = () => {
        atomEnergy = (atomEnergy % 4) + 1;
        if (window.CosmicAudio) window.CosmicAudio.playQuantumPing(400 + atomEnergy * 150);
      };
    }

    if (!window._atomAnimStarted) {
      window._atomAnimStarted = true;
      function renderAtom() {
        if (activeLab === 'atom' && atomCtx) {
          atomCtx.clearRect(0, 0, atomCanvas.width, atomCanvas.height);
          const cx = atomCanvas.width / 2;
          const cy = atomCanvas.height / 2;
          atomAngle += 0.02;

          if (atomModel === 'democritus') {
            // Indivisible solid sphere
            atomCtx.beginPath();
            atomCtx.arc(cx, cy, 60, 0, Math.PI * 2);
            atomCtx.fillStyle = '#64748b';
            atomCtx.fill();
            atomCtx.strokeStyle = '#94a3b8';
            atomCtx.lineWidth = 3;
            atomCtx.stroke();
            atomCtx.fillStyle = '#ffffff';
            atomCtx.font = '12px Inter';
            atomCtx.textAlign = 'center';
            atomCtx.fillText('Atomos (Sert Küre)', cx, cy + 5);
          } else if (atomModel === 'bohr') {
            // Nucleus
            atomCtx.beginPath();
            atomCtx.arc(cx, cy, 14, 0, Math.PI * 2);
            atomCtx.fillStyle = '#f72585';
            atomCtx.fill();

            // Energy levels
            for (let n = 1; n <= 4; n++) {
              const r = n * 35;
              atomCtx.beginPath();
              atomCtx.arc(cx, cy, r, 0, Math.PI * 2);
              atomCtx.strokeStyle = n === atomEnergy ? '#00f2fe' : 'rgba(255,255,255,0.15)';
              atomCtx.lineWidth = n === atomEnergy ? 2 : 1;
              atomCtx.setLineDash(n === atomEnergy ? [] : [4, 4]);
              atomCtx.stroke();
              atomCtx.setLineDash([]);
            }

            // Electron on current orbit
            const er = atomEnergy * 35;
            const ex = cx + Math.cos(atomAngle * (5 - atomEnergy)) * er;
            const ey = cy + Math.sin(atomAngle * (5 - atomEnergy)) * er;
            atomCtx.beginPath();
            atomCtx.arc(ex, ey, 6, 0, Math.PI * 2);
            atomCtx.fillStyle = '#00f2fe';
            atomCtx.shadowBlur = 10;
            atomCtx.shadowColor = '#00f2fe';
            atomCtx.fill();
            atomCtx.shadowBlur = 0;
          } else {
            // Schrödinger Quantum Probability Cloud
            const cloudPoints = 600;
            const spread = atomEnergy * 28;
            for (let i = 0; i < cloudPoints; i++) {
              const r = (Math.random() + Math.random() + Math.random()) / 3 * spread * 2;
              const th = Math.random() * Math.PI * 2;
              const px = cx + Math.cos(th + atomAngle * 0.2) * r;
              const py = cy + Math.sin(th + atomAngle * 0.2) * r;
              atomCtx.beginPath();
              atomCtx.arc(px, py, 1.2, 0, Math.PI * 2);
              atomCtx.fillStyle = 'rgba(0, 242, 254, 0.45)';
              atomCtx.fill();
            }
            // Nucleus
            atomCtx.beginPath();
            atomCtx.arc(cx, cy, 8, 0, Math.PI * 2);
            atomCtx.fillStyle = '#f72585';
            atomCtx.fill();
          }
        }
        requestAnimationFrame(renderAtom);
      }
      renderAtom();
    }
  }

  // LAB 2: Double Slit Experiment
  let dsCanvas, dsCtx, dsObserver = false, dsPhotons = [], dsHits = [];
  function initDoubleSlitLab() {
    dsCanvas = document.getElementById('doubleslit-canvas');
    if (!dsCanvas) return;
    dsCtx = dsCanvas.getContext('2d');
    dsCanvas.width = dsCanvas.parentElement.clientWidth || 500;
    dsCanvas.height = 340;

    const obsToggle = document.getElementById('ds-observer-toggle');
    if (obsToggle) {
      obsToggle.onchange = (e) => {
        dsObserver = e.target.checked;
        dsHits = [];
        if (window.CosmicAudio) window.CosmicAudio.playQuantumPing(dsObserver ? 300 : 700);
      };
    }

    const clearBtn = document.getElementById('ds-clear-btn');
    if (clearBtn) {
      clearBtn.onclick = () => { dsHits = []; };
    }

    if (!window._dsAnimStarted) {
      window._dsAnimStarted = true;
      function renderDoubleSlit() {
        if (activeLab === 'doubleslit' && dsCtx) {
          const w = dsCanvas.width;
          const h = dsCanvas.height;
          dsCtx.clearRect(0, 0, w, h);

          // Emitter barrier at left (x = 30)
          dsCtx.fillStyle = '#00f2fe';
          dsCtx.fillRect(10, h / 2 - 15, 10, 30);

          // Double slit barrier at x = w * 0.4
          const bx = w * 0.4;
          dsCtx.fillStyle = '#334155';
          dsCtx.fillRect(bx, 0, 8, h / 2 - 40);
          dsCtx.fillRect(bx, h / 2 - 20, 8, 40);
          dsCtx.fillRect(bx, h / 2 + 40, 8, h / 2 - 40);

          // Slit openings: y1 = h/2 - 30, y2 = h/2 + 30
          // Detector indicator if active
          if (dsObserver) {
            dsCtx.fillStyle = '#f72585';
            dsCtx.font = '11px Inter';
            dsCtx.fillText('👁️ Gözlemci Dedektörü AÇIK', bx - 30, 25);
          }

          // Screen at right: x = w - 40
          const sx = w - 40;
          dsCtx.fillStyle = '#1e293b';
          dsCtx.fillRect(sx, 10, 10, h - 20);

          // Emit new photons
          if (Math.random() < 0.6) {
            dsPhotons.push({
              x: 25,
              y: h / 2 + (Math.random() - 0.5) * 10,
              vx: 4,
              passedSlit: false,
              targetY: 0
            });
          }

          // Update photons
          for (let i = dsPhotons.length - 1; i >= 0; i--) {
            const p = dsPhotons[i];
            p.x += p.vx;

            if (!p.passedSlit && p.x >= bx) {
              p.passedSlit = true;
              if (dsObserver) {
                // Collapses to one slit and travels like a particle
                const slitY = Math.random() > 0.5 ? h / 2 - 30 : h / 2 + 30;
                p.y = slitY;
                p.vy = (Math.random() - 0.5) * 1.5;
              } else {
                // Wave interference distribution at screen
                const interference = Math.sin(Math.random() * Math.PI * 4);
                p.vy = interference * 2.2;
              }
            }

            if (p.passedSlit) {
              p.y += p.vy || 0;
            }

            if (p.x >= sx) {
              dsHits.push(p.y);
              if (dsHits.length > 300) dsHits.shift();
              dsPhotons.splice(i, 1);
              continue;
            }

            dsCtx.beginPath();
            dsCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            dsCtx.fillStyle = dsObserver ? '#f72585' : '#00f2fe';
            dsCtx.fill();
          }

          // Draw hit accumulation pattern on screen
          dsHits.forEach(hy => {
            dsCtx.fillStyle = 'rgba(0, 242, 254, 0.25)';
            dsCtx.fillRect(sx + 12, hy - 1, 15, 2);
          });
        }
        requestAnimationFrame(renderDoubleSlit);
      }
      renderDoubleSlit();
    }
  }

  // LAB 3: Cellular Automata (Wolfram & Conway's Game of Life)
  let caCanvas, caCtx, caGrid = [], caRule = 30, caMode = '1d', caRunning = true;
  function initCellularLab() {
    caCanvas = document.getElementById('cellular-canvas');
    if (!caCanvas) return;
    caCtx = caCanvas.getContext('2d');
    caCanvas.width = caCanvas.parentElement.clientWidth || 500;
    caCanvas.height = 320;

    const ruleSelect = document.getElementById('ca-rule-select');
    if (ruleSelect) {
      ruleSelect.onchange = (e) => {
        caRule = parseInt(e.target.value, 10);
        resetCellular();
      };
    }

    const resetBtn = document.getElementById('ca-reset-btn');
    if (resetBtn) {
      resetBtn.onclick = () => resetCellular();
    }

    function resetCellular() {
      caCtx.fillStyle = '#030712';
      caCtx.fillRect(0, 0, caCanvas.width, caCanvas.height);
      const cols = Math.floor(caCanvas.width / 4);
      caGrid = new Array(cols).fill(0);
      caGrid[Math.floor(cols / 2)] = 1; // single center seed
      window._caRow = 0;
    }

    resetCellular();

    if (!window._caAnimStarted) {
      window._caAnimStarted = true;
      setInterval(() => {
        if (activeLab === 'cellular' && caCtx && window._caRow < caCanvas.height / 4) {
          const cellSize = 4;
          const cols = caGrid.length;
          for (let x = 0; x < cols; x++) {
            if (caGrid[x] === 1) {
              caCtx.fillStyle = caRule === 30 ? '#00f2fe' : caRule === 110 ? '#9d4edd' : '#06d6a0';
              caCtx.fillRect(x * cellSize, window._caRow * cellSize, cellSize - 0.5, cellSize - 0.5);
            }
          }
          // Step 1D Wolfram
          const next = new Array(cols);
          for (let i = 0; i < cols; i++) {
            const left = caGrid[(i - 1 + cols) % cols];
            const center = caGrid[i];
            const right = caGrid[(i + 1) % cols];
            next[i] = window.PhysicsEngine.evaluateWolfram(caRule, left, center, right);
          }
          caGrid = next;
          window._caRow++;
        }
      }, 50);
    }
  }

  // LAB 4: Qubit & Bloch Sphere
  let qubitCanvas, qubitCtx, theta = 0, phi = 0;
  function initQubitLab() {
    qubitCanvas = document.getElementById('qubit-canvas');
    if (!qubitCanvas) return;
    qubitCtx = qubitCanvas.getContext('2d');
    qubitCanvas.width = qubitCanvas.parentElement.clientWidth || 400;
    qubitCanvas.height = 300;

    const btnH = document.getElementById('gate-h');
    const btnX = document.getElementById('gate-x');
    const btnZ = document.getElementById('gate-z');
    const btnReset = document.getElementById('gate-reset');

    if (btnH) btnH.onclick = () => { theta = Math.PI / 2; updateBloch(); };
    if (btnX) btnX.onclick = () => { theta = theta === 0 ? Math.PI : 0; updateBloch(); };
    if (btnZ) btnZ.onclick = () => { phi += Math.PI; updateBloch(); };
    if (btnReset) btnReset.onclick = () => { theta = 0; phi = 0; updateBloch(); };

    function updateBloch() {
      if (!qubitCtx) return;
      const w = qubitCanvas.width;
      const h = qubitCanvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const r = 90;

      qubitCtx.clearRect(0, 0, w, h);

      // Draw sphere circle & equator ellipse
      qubitCtx.beginPath();
      qubitCtx.arc(cx, cy, r, 0, Math.PI * 2);
      qubitCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      qubitCtx.stroke();

      qubitCtx.beginPath();
      qubitCtx.ellipse(cx, cy, r, r * 0.35, 0, 0, Math.PI * 2);
      qubitCtx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
      qubitCtx.stroke();

      // Axes
      qubitCtx.beginPath();
      qubitCtx.moveTo(cx, cy - r - 15);
      qubitCtx.lineTo(cx, cy + r + 15);
      qubitCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      qubitCtx.stroke();

      // Labels |0> and |1>
      qubitCtx.fillStyle = '#00f2fe';
      qubitCtx.font = '13px monospace';
      qubitCtx.textAlign = 'center';
      qubitCtx.fillText('|0⟩', cx, cy - r - 20);
      qubitCtx.fillText('|1⟩', cx, cy + r + 25);

      // State vector (Bloch coordinates)
      const vx = cx + r * Math.sin(theta) * Math.cos(phi);
      const vy = cy - r * Math.cos(theta);

      qubitCtx.beginPath();
      qubitCtx.moveTo(cx, cy);
      qubitCtx.lineTo(vx, vy);
      qubitCtx.strokeStyle = '#f72585';
      qubitCtx.lineWidth = 3;
      qubitCtx.stroke();

      qubitCtx.beginPath();
      qubitCtx.arc(vx, vy, 6, 0, Math.PI * 2);
      qubitCtx.fillStyle = '#f72585';
      qubitCtx.shadowBlur = 10;
      qubitCtx.shadowColor = '#f72585';
      qubitCtx.fill();
      qubitCtx.shadowBlur = 0;

      // Update state display text
      const prob0 = (Math.cos(theta / 2) ** 2) * 100;
      const prob1 = (Math.sin(theta / 2) ** 2) * 100;
      const stateTxt = document.getElementById('qubit-state-text');
      const probBar0 = document.getElementById('qubit-prob0-bar');
      const probBar1 = document.getElementById('qubit-prob1-bar');
      if (stateTxt) {
        stateTxt.textContent = `|Ψ⟩ = ${Math.cos(theta / 2).toFixed(2)}|0⟩ + ${Math.sin(theta / 2).toFixed(2)}|1⟩`;
      }
      if (probBar0) probBar0.style.width = `${prob0}%`;
      if (probBar1) probBar1.style.width = `${prob1}%`;
    }

    updateBloch();
  }

  // LAB 5: Black Hole Holographic Calculator
  function initBlackHoleLab() {
    const massSlider = document.getElementById('bh-mass-slider');
    const massValEl = document.getElementById('bh-mass-val');
    const rsEl = document.getElementById('bh-rs-val');
    const areaEl = document.getElementById('bh-area-val');
    const entropyEl = document.getElementById('bh-entropy-val');
    const bitsEl = document.getElementById('bh-bits-val');
    const tempEl = document.getElementById('bh-temp-val');

    function update() {
      if (!massSlider) return;
      const mSun = parseFloat(massSlider.value);
      if (massValEl) massValEl.textContent = `${mSun} M☉ (${(mSun * 1.989e30).toExponential(2)} kg)`;
      const info = window.PhysicsEngine.calculateBlackHoleInfo(mSun * 1.98847e30);

      if (rsEl) rsEl.textContent = `${(info.rs / 1000).toFixed(2)} km`;
      if (areaEl) areaEl.textContent = `${window.PhysicsEngine.formatSciNum(info.area)} m²`;
      if (entropyEl) entropyEl.textContent = `${window.PhysicsEngine.formatSciNum(info.entropyJK)} J/K`;
      if (bitsEl) bitsEl.textContent = `${window.PhysicsEngine.formatSciNum(info.bits)} bit (~${window.PhysicsEngine.formatSciNum(info.gigabytes)} GB)`;
      if (tempEl) tempEl.textContent = `${window.PhysicsEngine.formatSciNum(info.hawkingTempK)} K`;
    }

    if (massSlider) {
      massSlider.oninput = update;
      update();
    }
  }

  // LAB 6: Bostrom Simulation Calculator
  function initBostromLab() {
    const fpSlider = document.getElementById('bostrom-fp-slider');
    const niSlider = document.getElementById('bostrom-ni-slider');
    const fpValEl = document.getElementById('bostrom-fp-val');
    const niValEl = document.getElementById('bostrom-ni-val');
    const probEl = document.getElementById('bostrom-prob-val');
    const barEl = document.getElementById('bostrom-prob-bar');

    function update() {
      if (!fpSlider || !niSlider) return;
      const fp = parseFloat(fpSlider.value);
      const ni = parseFloat(niSlider.value);
      if (fpValEl) fpValEl.textContent = fp.toFixed(2);
      if (niValEl) niValEl.textContent = ni.toLocaleString('tr-TR');

      const prob = window.PhysicsEngine.calculateBostromSimProb(fp, ni);
      const pct = (prob * 100).toFixed(4);
      if (probEl) probEl.textContent = `%${pct}`;
      if (barEl) barEl.style.width = `${Math.min(prob * 100, 100)}%`;
    }

    if (fpSlider && niSlider) {
      fpSlider.oninput = update;
      niSlider.oninput = update;
      update();
    }
  }

  // Initial Runs
  renderTimeline();
  renderComparisonMatrix();
  renderQuiz();
  initOrResumeLab('atom');
});
