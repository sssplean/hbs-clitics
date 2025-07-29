    let currentExample = {};
    // key: slot index, value: array of clitic elements in that slot
    let insertedMap = {};
    // currently dragged element when moving from a slot
    let draggedEl = null;
    let scoreCorrect = 0;
    let scoreIncorrect = 0;
    let autoPhase = 1;
    let autoTimer = null;
    let translationLang = 'ru';
    const availableLangs = ['ru', 'uk', 'en', 'de', 'es', 'fr'];
  const autoIcons = [
    `<svg view="0 0 24 24" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C12.5523 20 13 20.4477 13 21C13 21.5523 12.5523 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.5523 21.5523 13 21 13C20.4477 13 20 12.5523 20 12C20 7.58172 16.4183 4 12 4ZM12 5C12.5523 5 13 5.44772 13 6V11.5858L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V6C11 5.44772 11.4477 5 12 5ZM16.7071 15.2929C16.3166 14.9024 15.6834 14.9024 15.2929 15.2929C14.9024 15.6834 14.9024 16.3166 15.2929 16.7071L17.5858 19L15.2929 21.2929C14.9024 21.6834 14.9024 22.3166 15.2929 22.7071C15.6834 23.0976 16.3166 23.0976 16.7071 22.7071L19 20.4142L21.2929 22.7071C21.6834 23.0976 22.3166 23.0976 22.7071 22.7071C23.0976 22.3166 23.0976 21.6834 22.7071 21.2929L20.4142 19L22.7071 16.7071C23.0976 16.3166 23.0976 15.6834 22.7071 15.2929C22.3166 14.9024 21.6834 14.9024 21.2929 15.2929L19 17.5858L16.7071 15.2929Z" fill="#ffffff"></path></g></svg>`,
    `<svg view="0 0 24 24" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13 11.5858V6Z" fill="#ffffff"></path></g></svg>`,
    `<svg view="0 0 24 24" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 12C4 7.58172 7.58172 4 12 4C12.5523 4 13 3.55228 13 3C13 2.44772 12.5523 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C14.7611 22 17.2625 20.8796 19.0711 19.0711C19.4616 18.6805 19.4616 18.0474 19.0711 17.6569C18.6805 17.2663 18.0474 17.2663 17.6569 17.6569C16.208 19.1057 14.2094 20 12 20C7.58172 20 4 16.4183 4 12ZM13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13 11.5858V6ZM21.7483 15.1674C21.535 15.824 20.8298 16.1833 20.1732 15.97C19.5167 15.7566 19.1574 15.0514 19.3707 14.3949C19.584 13.7383 20.2892 13.379 20.9458 13.5923C21.6023 13.8057 21.9617 14.5108 21.7483 15.1674ZM21.0847 11.8267C21.7666 11.7187 22.2318 11.0784 22.1238 10.3966C22.0158 9.71471 21.3755 9.2495 20.6937 9.3575C20.0118 9.46549 19.5466 10.1058 19.6546 10.7877C19.7626 11.4695 20.4029 11.9347 21.0847 11.8267ZM20.2924 5.97522C20.6982 6.53373 20.5744 7.31544 20.0159 7.72122C19.4574 8.127 18.6757 8.00319 18.2699 7.44468C17.8641 6.88617 17.9879 6.10446 18.5464 5.69868C19.1049 5.2929 19.8867 5.41671 20.2924 5.97522ZM17.1997 4.54844C17.5131 3.93333 17.2685 3.18061 16.6534 2.86719C16.0383 2.55378 15.2856 2.79835 14.9722 3.41346C14.6588 4.02858 14.9033 4.78129 15.5185 5.09471C16.1336 5.40812 16.8863 5.16355 17.1997 4.54844Z" fill="#ffffff"></path></g></svg>`
  ];

    function getNextIndex(idx) {
      const val = parseFloat(idx);
      return parseFloat(((Math.floor(val * 10) + 1) / 10).toFixed(1));
    }

    function renumberFollowingSlots(startSlot) {
      if (!startSlot) return;
      const base = Math.floor(parseFloat(startSlot.dataset.index));
      let slot = startSlot;
      while (slot && slot.classList.contains('drop-slot')) {
        const oldIdx = parseFloat(slot.dataset.index);
        if (Math.floor(oldIdx) !== base) break;
        const newIdx = parseFloat((oldIdx - 0.1).toFixed(1));
        slot.dataset.index = newIdx;
        if (insertedMap[oldIdx]) {
          insertedMap[newIdx] = insertedMap[oldIdx];
          delete insertedMap[oldIdx];
        }
        slot = slot.nextElementSibling;
      }
    }

    function shiftGroupRight(baseIdx, parent) {
      const slots = Array.from(parent.querySelectorAll('.drop-slot'))
        .filter(s => !s.dataset.index.startsWith('-') &&
          Math.floor(parseFloat(s.dataset.index)) === baseIdx)
        .sort((a, b) => parseFloat(b.dataset.index) - parseFloat(a.dataset.index));
      slots.forEach(s => {
        const oldIdx = parseFloat(s.dataset.index);
        const newIdx = parseFloat((oldIdx + 0.1).toFixed(1));
        s.dataset.index = newIdx;
        if (insertedMap[oldIdx]) {
          insertedMap[newIdx] = insertedMap[oldIdx];
          delete insertedMap[oldIdx];
        }
      });
    }

    function ensureLeftSlot(baseIdx, refSlot) {
      const parent = refSlot.parentElement;
      if (!parent.querySelector(`.drop-slot[data-index="-${baseIdx}"]`)) {
        const left = createDropSlot(`-${baseIdx}`);
        parent.insertBefore(left, refSlot);
      }
    }

    function cleanupAfterRemoval(baseIdx) {
      const parent = document.getElementById('sentence');
      const neg = parent.querySelector(`.drop-slot[data-index="-${baseIdx}"]`);
      const baseSlots = Array.from(parent.querySelectorAll('.drop-slot'))
        .filter(s => !s.dataset.index.startsWith('-') &&
          Math.floor(parseFloat(s.dataset.index)) === baseIdx)
        .sort((a, b) => parseFloat(a.dataset.index) - parseFloat(b.dataset.index));

      if (baseSlots.length && baseSlots[0].children.length === 0 && baseSlots.length > 1) {
        const firstSub = baseSlots[1];
        parent.removeChild(baseSlots[0]);
        renumberFollowingSlots(firstSub);
        baseSlots.shift();
      }

      const anyFilled = baseSlots.some(s => s.children.length > 0);
      if (!anyFilled && neg && neg.children.length === 0) {
        parent.removeChild(neg);
      }
    }

          function removeSlotIfNeeded(slot) {
        if (!slot || slot.children.length) return;
        slot.classList.remove('has-clitic');
        const parent = slot.parentElement;
        const idx = parseFloat(slot.dataset.index);
        const base = Math.floor(idx);

        const sameBaseSlots = Array.from(parent.querySelectorAll('.drop-slot'))
          .filter(s => Math.floor(parseFloat(s.dataset.index)) === base);
        const subSlots = sameBaseSlots.filter(s => parseFloat(s.dataset.index) !== base);
        const baseHasClitic = insertedMap[base] && insertedMap[base].length;

        if (idx === base) {
          if (subSlots.length) {
            const last = subSlots[subSlots.length - 1];
            if (!baseHasClitic && last.children.length === 0) {
              parent.removeChild(last);
              delete insertedMap[last.dataset.index];
            }
          }
          return;
        }

        if (subSlots.length === 1) {
          if (!baseHasClitic) {
            parent.removeChild(slot);
            delete insertedMap[slot.dataset.index];
          }
          return;
        }

        const next = slot.nextElementSibling;

        if (next && next.classList.contains('drop-slot') &&
            Math.floor(parseFloat(next.dataset.index)) === base &&
            next.children.length === 0) {
          parent.removeChild(next);
          delete insertedMap[next.dataset.index];
          renumberFollowingSlots(next);
          return;
        }

        parent.removeChild(slot);
        delete insertedMap[slot.dataset.index];

        if (next && next.classList.contains('drop-slot') &&
            Math.floor(parseFloat(next.dataset.index)) === base) {
          renumberFollowingSlots(next);
        }
      }

    function optionExists(text) {
      return Array.from(document.querySelectorAll('.clitic-option'))
        .some(opt => opt.textContent === text);
    }

    function createOption(text) {
      if (optionExists(text)) return;
      const opt = document.createElement('div');
      opt.className = 'clitic-option';
      opt.textContent = text;
      opt.draggable = true;
      opt.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', text);
        e.dataTransfer.setData('source', 'bank');
      });
      document.getElementById('cliticOptions').appendChild(opt);
    }

    function renderTally(count) {
      let html = '';
      const groups = Math.floor(count / 5);
      const remainder = count % 5;
      for (let i = 0; i < groups; i++) {
        html += `<div class="tally-block full">` +
                `<span class="tally-bar"></span>` +
                `<span class="tally-bar"></span>` +
                `<span class="tally-bar"></span>` +
                `<span class="tally-bar"></span>` +
                `</div>`;
      }
      if (remainder) {
        html += '<div class="tally-block">';
        for (let i = 0; i < remainder; i++) {
          html += '<span class="tally-bar"></span>';
        }
        html += '</div>';
      }
      return html;
    }

    function updateScoreboard(isCorrect) {
      if (isCorrect === true) {
        scoreCorrect++;
      } else if (isCorrect === false) {
        scoreIncorrect++;
      }
      document.getElementById('correct-tally').innerHTML = renderTally(scoreCorrect);
      document.getElementById('incorrect-tally').innerHTML = renderTally(scoreIncorrect);
      const total = scoreCorrect + scoreIncorrect;
      const pct = total ? Math.round((scoreCorrect / total) * 100) : 0;
      document.getElementById('score-text').textContent = pct + '%';

      const resetBtn = document.getElementById('reset-score');
      if (resetBtn) resetBtn.disabled = total === 0;
    }

  function resetScore() {
     scoreCorrect = 0;
     scoreIncorrect = 0;
      const ch = document.getElementById('correct-heading');
      const ih = document.getElementById('incorrect-heading');
      const ct = document.getElementById('correct-tally');
      const it = document.getElementById('incorrect-tally');
      const st = document.getElementById('score-text');

      const chColor = getComputedStyle(ch).color;
      const ihColor = getComputedStyle(ih).color;
      ch.style.color = chColor;
      ih.style.color = ihColor;
      ch.style.transform = 'scale(1.2)';
      ih.style.transform = 'scale(1.2)';

      ch.classList.remove('correct-heading', 'incorrect-heading');
      ih.classList.remove('correct-heading', 'incorrect-heading');
      ch.classList.add('heading-reset');
      ih.classList.add('heading-reset');

      [ct, it, st].forEach(el => el.classList.add('fade-out'));
      setTimeout(() => {
        updateScoreboard(null);
        [ct, it, st].forEach(el => {
          el.classList.remove('fade-out');
          el.classList.add('fade-in');
        });
        setTimeout(() => {
          [ct, it, st].forEach(el => el.classList.remove('fade-in'));
        }, 300);
      }, 300);

      setTimeout(() => {
        ch.classList.remove('heading-reset');
        ih.classList.remove('heading-reset');
        ch.style.color = '';
        ih.style.color = '';
        ch.style.transform = '';
        ih.style.transform = '';
      }, 600);

      loadExample(true);
   }

   function updateAutoButton() {
      const btn = document.getElementById('auto-delay-button');
      if (btn) btn.innerHTML = autoIcons[autoPhase - 1];
   }

  function toggleAutoDelay() {
     autoPhase = autoPhase % 3 + 1;
     updateAutoButton();
  }

  function updateTranslation() {
     const el = document.getElementById('translation-text');
     if (!el) return;
     const tr = currentExample.translations &&
       currentExample.translations[translationLang];
     el.textContent = tr || currentExample.translation || '';
  }

  function createLanguageButtons() {
     const container = document.getElementById('language-buttons');
     if (!container) return;
     container.innerHTML = '';
     availableLangs.forEach(lang => {
       const btn = document.createElement('button');
       btn.textContent = lang.toUpperCase();
       btn.addEventListener('click', () => {
         translationLang = lang;
         updateTranslation();
       });
       container.appendChild(btn);
     });
  }

  function loadExample(animated = false) {
      clearTimeout(autoTimer);
      autoTimer = null;
      const checkBtn = document.getElementById('check-button');
      const sentence = document.getElementById('sentence');
      const cliticOptions = document.getElementById('cliticOptions');
      const ch = document.getElementById('correct-heading');
      const ih = document.getElementById('incorrect-heading');
      const translationEl = document.getElementById('translation');

      const build = () => {
        checkBtn.disabled = false;
        insertedMap = {};
        sentence.innerHTML = '';
        cliticOptions.innerHTML = '';
        ch.classList.remove('correct-heading', 'incorrect-heading');
        ih.classList.remove('correct-heading', 'incorrect-heading');

        currentExample = cliticsExamples[Math.floor(Math.random() * cliticsExamples.length)];

        updateTranslation();

        const firstSlot = createDropSlot(1);
        sentence.appendChild(firstSlot);

        currentExample.parts.forEach((word, i) => {
          const wordBlock = document.createElement('div');
          wordBlock.className = 'word-block';
          wordBlock.textContent = word;
          sentence.appendChild(wordBlock);

          const dropSlot = createDropSlot(i + 2);
          sentence.appendChild(dropSlot);
        });

        // Create draggable clitics
        const allOptions = [...currentExample.clitics, ...currentExample.distractors].sort(() => Math.random() - 0.5);
        allOptions.forEach(text => createOption(text));

        // Allow dropping clitics back to bank
        cliticOptions.ondragover = e => e.preventDefault();
        cliticOptions.ondrop = e => {
          e.preventDefault();
          const clitic = e.dataTransfer.getData('text/plain');
          const source = e.dataTransfer.getData('source');
          const from = e.dataTransfer.getData('from');

          if (source === 'slot' && draggedEl) {
            const slot = draggedEl.parentElement;
            draggedEl.remove();
            slot.classList.remove('has-clitic');
            const arr = insertedMap[from] || [];
            insertedMap[from] = arr.filter(el => el !== draggedEl);
            if (!insertedMap[from].length) delete insertedMap[from];
            removeSlotIfNeeded(slot);
            const baseFrom = Math.floor(Math.abs(parseFloat(from)));
            cleanupAfterRemoval(baseFrom);
            draggedEl = null;
            createOption(clitic);
          }
        };
      };

        if (animated) {
          const resetList = [];
          if (ch.classList.contains('correct-heading') || ch.classList.contains('incorrect-heading')) {
            ch.classList.remove('correct-heading', 'incorrect-heading');
            resetList.push(ch);
          }
          if (ih.classList.contains('correct-heading') || ih.classList.contains('incorrect-heading')) {
            ih.classList.remove('correct-heading', 'incorrect-heading');
            resetList.push(ih);
          }
          resetList.forEach(h => h.classList.add('heading-reset'));
          setTimeout(() => {
            resetList.forEach(h => h.classList.remove('heading-reset'));
          }, 600);
        [sentence, cliticOptions, translationEl].forEach(el => el.classList.add('fade-out'));
        setTimeout(() => {
          [sentence, cliticOptions, translationEl].forEach(el => {
            el.classList.remove('fade-out');
          });
          build();
          [sentence, cliticOptions, translationEl].forEach(el => el.classList.add('fade-in'));
          setTimeout(() => {
            [sentence, cliticOptions, translationEl].forEach(el => el.classList.remove('fade-in'));
          }, 300);
        }, 300);
        return;
      }

      build();
    }

    function createDropSlot(index) {
      const dropSlot = document.createElement('div');
      dropSlot.className = 'drop-slot';
      dropSlot.dataset.index = index;

      dropSlot.addEventListener('dragover', e => {
        e.preventDefault();
        dropSlot.classList.add('over');
      });

      dropSlot.addEventListener('dragleave', () => {
        dropSlot.classList.remove('over');
      });

      dropSlot.addEventListener('drop', e => {
        e.preventDefault();
        dropSlot.classList.remove('over');
        const clitic = e.dataTransfer.getData('text/plain');
        const source = e.dataTransfer.getData('source');
        const from = e.dataTransfer.getData('from');
        let idx = dropSlot.dataset.index;

        if (source === 'slot' && from === idx) {
          draggedEl = null;
          return;
        }

        if (dropSlot.children.length > 0) {
          const existing = dropSlot.firstElementChild;
          const oldText = existing.textContent;
          existing.remove();
          const arr = insertedMap[idx] || [];
          insertedMap[idx] = arr.filter(el => el !== existing);
          if (!insertedMap[idx].length) delete insertedMap[idx];
          createOption(oldText);
        }

          // If dragging from another slot, remove that specific element
          let baseFrom = null;
          if (source === 'slot' && draggedEl) {
            const fromArr = insertedMap[from] || [];
            insertedMap[from] = fromArr.filter(el => el !== draggedEl);
            if (!insertedMap[from].length) delete insertedMap[from];
            const fromSlot = draggedEl.parentElement;
            draggedEl.remove();
            fromSlot.classList.remove('has-clitic');

          const movingBaseLeft =
            !from.includes('.') && idx.startsWith('-') &&
            Math.abs(parseFloat(from)) === Math.abs(parseFloat(idx));

          const fromIdx = parseFloat(fromSlot.dataset.index);
          const sameBase = Math.floor(fromIdx) === Math.floor(parseFloat(idx));
          const isImmediate = fromSlot.nextElementSibling === dropSlot;

          if (sameBase && isImmediate) {
            const oldIdx = idx;
            fromSlot.remove();
            dropSlot.dataset.index = fromSlot.dataset.index;
            if (insertedMap[oldIdx]) {
              insertedMap[dropSlot.dataset.index] = insertedMap[oldIdx];
              delete insertedMap[oldIdx];
            }
            renumberFollowingSlots(dropSlot.nextElementSibling);
          } else if (movingBaseLeft) {
            fromSlot.remove();
          } else {
            removeSlotIfNeeded(fromSlot);
          }
            draggedEl = null;
            baseFrom = Math.floor(Math.abs(parseFloat(from)));
            idx = dropSlot.dataset.index;
          }

          if (idx.startsWith('-')) {
            const baseIdx = Math.abs(parseInt(idx));
            if (source === 'slot' && parseFloat(from) === baseIdx) {
              const oldBase = document.querySelector(
                `.drop-slot[data-index="${baseIdx}"]`
              );
              if (oldBase && oldBase !== dropSlot) {
                oldBase.remove();
              }
              dropSlot.dataset.index = baseIdx;
              idx = dropSlot.dataset.index;
            } else {
              shiftGroupRight(baseIdx, dropSlot.parentElement);
              dropSlot.dataset.index = baseIdx;
              idx = dropSlot.dataset.index;
            }
          }

        // Remove same clitic from other slots (only one instance allowed)
        for (const idx in insertedMap) {
          const arr = insertedMap[idx];
          const found = arr.find(el => el.textContent === clitic);
          if (found) {
            found.remove();
            insertedMap[idx] = arr.filter(el => el !== found);
            if (!insertedMap[idx].length) delete insertedMap[idx];
          }
        }

        const enclEl = document.createElement('div');
        enclEl.className = 'inserted-clitic';
        enclEl.textContent = clitic;
        enclEl.draggable = true;

        enclEl.addEventListener('dragstart', ev => {
          draggedEl = enclEl;
          ev.dataTransfer.setData('text/plain', clitic);
          ev.dataTransfer.setData('source', 'slot');
          ev.dataTransfer.setData('from', dropSlot.dataset.index);
        });

        enclEl.addEventListener('dblclick', () => {
          const i = dropSlot.dataset.index;
          const arr = insertedMap[i] || [];
          insertedMap[i] = arr.filter(el => el !== enclEl);
          if (!insertedMap[i].length) delete insertedMap[i];
          enclEl.remove();
          removeSlotIfNeeded(dropSlot);
          const baseIdx = Math.floor(Math.abs(parseFloat(i)));
          cleanupAfterRemoval(baseIdx);
          if (dropSlot.parentElement) dropSlot.classList.remove('has-clitic');
          createOption(clitic);
        });

        dropSlot.appendChild(enclEl);
        dropSlot.classList.add('has-clitic');
        insertedMap[idx] = [enclEl];
        if (!idx.toString().includes('.')) {
          ensureLeftSlot(Math.abs(parseInt(idx)), dropSlot);
        }

        if (baseFrom !== null) {
          cleanupAfterRemoval(baseFrom);
        }

        // Remove from bank if source is bank
        if (source === 'bank') {
          const options = document.querySelectorAll('.clitic-option');
          options.forEach(opt => {
            if (opt.textContent === clitic) opt.remove();
          });
        }

        const nextIdx = getNextIndex(idx);
        if (!document.querySelector(`.drop-slot[data-index="${nextIdx}"]`)) {
          const newSlot = createDropSlot(nextIdx);
          dropSlot.parentElement.insertBefore(newSlot, dropSlot.nextElementSibling);
        }
      });

      return dropSlot;
    }

    function checkAnswer() {
      document.getElementById('check-button').disabled = true;
      const ch = document.getElementById('correct-heading');
      const ih = document.getElementById('incorrect-heading');
      const insertedPairs = [];
      Object.keys(insertedMap)
        .sort((a, b) => parseFloat(a) - parseFloat(b))
        .forEach(idx => {
          insertedMap[idx].forEach(el => {
            insertedPairs.push([parseFloat(idx), el.textContent, el]);
          });
        });

      const expectedPairs = currentExample.clitics.map((e, i) => [currentExample.correctIndexes[i], e]);
      const expectedSet = new Set(expectedPairs.map(p => `${p[0]}|${p[1]}`));
      const isCorrect = insertedPairs.length === expectedPairs.length &&
        insertedPairs.every(p => expectedSet.has(`${p[0]}|${p[1]}`));

      // Highlight result
      insertedPairs.forEach(p => {
        const el = p[2];
        el.classList.remove('correct', 'incorrect');
        if (expectedSet.has(`${p[0]}|${p[1]}`)) {
          el.classList.add('correct');
        } else {
          el.classList.add('incorrect');
        }
      });

      ch.classList.remove('correct-heading', 'incorrect-heading');
      ih.classList.remove('correct-heading', 'incorrect-heading');
      if (isCorrect) {
        ch.classList.add('correct-heading');
      } else {
        ih.classList.add('incorrect-heading');
      }
      updateScoreboard(isCorrect);
      if (autoPhase > 1) {
        const delay = autoPhase === 2 ? 2000 : 5000;
        clearTimeout(autoTimer);
        autoTimer = setTimeout(() => loadExample(true), delay);
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      updateScoreboard(null);
      updateAutoButton();
      createLanguageButtons();
      loadExample();
    });
