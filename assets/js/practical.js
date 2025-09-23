/**
 * practical.js - Interactive behaviours for practical pages.
 * Banking Information Systems
 */
(() => {
  const SELECTORS = {
    checklists: '.checklist',
    checklistItems: 'li',
    practicalTables: '.practical-content table',
    tableHeaders: 'th',
    codeBlocks: 'pre',
    downloadButtons: '.download-btn',
    cardBody: '.card-body'
  };

  const CLASS_NAMES = {
    done: 'done',
    progressContainer: 'checklist-progress',
    progressBar: 'progress-bar',
    progressFill: 'progress-fill',
    progressText: 'progress-text',
    progressComplete: 'complete',
    completionMessage: 'completion-message',
    completionVisible: 'show',
    copyButton: 'copy-code-btn',
    copySuccess: 'success',
    sortedHeader: 'sorted',
    sortIcon: 'sort-icon',
    codeWrapper: 'code-block-wrapper',
    timeSpent: 'time-spent'
  };

  const TEXT = {
    copy: 'Copy code',
    copySuccess: 'Copied!',
    copyError: 'Unable to copy',
    completion: '100% complete! Great job!',
    sortTooltip: 'Click to sort column',
    downloadLogPrefix: 'Downloaded file:',
    timeSpentLabel: 'Time spent on practical'
  };

  const SORT_ICONS = {
    neutral: '\u2195',
    asc: '\u25B2',
    desc: '\u25BC'
  };

  const STORAGE_KEYS = {
    checklist: id => `checklist_${id}`,
    practicalStart: id => `practical_${id}_start`,
    practicalLastVisit: id => `practical_${id}_last_visit`,
    practicalTime: id => `practical_${id}_time`,
    downloads: 'downloads'
  };

  const ONE_MINUTE = 60000;
  const checklistProgressMap = new WeakMap();

  function safeWriteJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Unable to persist JSON value', { key, error });
    }
  }

  function safeReadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        return fallback;
      }
      return JSON.parse(raw);
    } catch (error) {
      console.warn('Unable to parse JSON value', { key, error });
      return fallback;
    }
  }

  function safeWriteRaw(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Unable to persist value', { key, error });
    }
  }

  function safeReadRaw(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (error) {
      console.warn('Unable to read value', { key, error });
      return fallback;
    }
  }

  function init() {
    addDynamicStyles();
    initChecklists();
    initTableSorting();
    initCodeCopy();
    trackProgress();
    trackDownloads();
  }

  function initChecklists() {
    const checklists = document.querySelectorAll(SELECTORS.checklists);

    checklists.forEach(checklist => {
      const toggleItem = item => {
        item.classList.toggle(CLASS_NAMES.done);
        persistChecklistState(checklist);
        updateChecklistProgress(checklist);
        animateCheckmark(item);
      };

      checklist.addEventListener('click', event => {
        const item = event.target.closest(SELECTORS.checklistItems);
        if (!item || !checklist.contains(item)) {
          return;
        }
        event.preventDefault();
        toggleItem(item);
      });

      checklist.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') {
          return;
        }
        const item = event.target.closest(SELECTORS.checklistItems);
        if (!item || !checklist.contains(item)) {
          return;
        }
        event.preventDefault();
        toggleItem(item);
      });

      checklist.querySelectorAll(SELECTORS.checklistItems).forEach(item => {
        if (!item.hasAttribute('tabindex')) {
          item.setAttribute('tabindex', '0');
        }
      });

      const restored = restoreChecklistState(checklist);
      updateChecklistProgress(checklist, { suppressCompletionMessage: restored });
    });
  }

  function persistChecklistState(checklist) {
    const checklistId = checklist.id;
    if (!checklistId) {
      return;
    }

    const key = STORAGE_KEYS.checklist(checklistId);
    const state = Array.from(checklist.querySelectorAll(SELECTORS.checklistItems)).map(item =>
      item.classList.contains(CLASS_NAMES.done)
    );

    safeWriteJson(key, state);
  }

  function restoreChecklistState(checklist) {
    const checklistId = checklist.id;
    if (!checklistId) {
      return false;
    }

    const key = STORAGE_KEYS.checklist(checklistId);
    const savedState = safeReadJson(key, null);
    if (!Array.isArray(savedState)) {
      return false;
    }

    const items = checklist.querySelectorAll(SELECTORS.checklistItems);
    items.forEach((item, index) => {
      item.classList.toggle(CLASS_NAMES.done, Boolean(savedState[index]));
    });

    return true;
  }

  function updateChecklistProgress(checklist, { suppressCompletionMessage = false } = {}) {
    const items = checklist.querySelectorAll(SELECTORS.checklistItems);
    const total = items.length;
    if (total === 0) {
      return;
    }

    const completed = checklist.querySelectorAll(
      `${SELECTORS.checklistItems}.${CLASS_NAMES.done}`
    ).length;
    const percentage = Math.round((completed / total) * 100);
    const progressUi = ensureProgressUi(checklist);

    progressUi.fill.style.width = `${percentage}%`;
    progressUi.text.textContent = `${completed} of ${total} tasks (${percentage}%)`;
    progressUi.container.classList.toggle(CLASS_NAMES.progressComplete, percentage === 100);

    if (percentage === 100) {
      if (!suppressCompletionMessage && checklist.dataset.completionShown !== 'true') {
        showCompletionMessage(checklist);
        checklist.dataset.completionShown = 'true';
      }
    } else {
      delete checklist.dataset.completionShown;
    }
  }

  function ensureProgressUi(checklist) {
    const cached = checklistProgressMap.get(checklist);
    if (cached) {
      return cached;
    }

    const parent = checklist.parentElement;
    if (!parent) {
      throw new Error('Checklist has no parent element');
    }

    let container = checklist.nextElementSibling;
    while (container && !container.classList.contains(CLASS_NAMES.progressContainer)) {
      container = container.nextElementSibling;
    }

    if (!container) {
      container = document.createElement('div');
      container.className = CLASS_NAMES.progressContainer;

      const bar = document.createElement('div');
      bar.className = CLASS_NAMES.progressBar;

      const fill = document.createElement('div');
      fill.className = CLASS_NAMES.progressFill;
      bar.appendChild(fill);

      const text = document.createElement('div');
      text.className = CLASS_NAMES.progressText;

      container.append(bar, text);
      checklist.insertAdjacentElement('afterend', container);
    }

    const fill = container.querySelector(`.${CLASS_NAMES.progressFill}`);
    const text = container.querySelector(`.${CLASS_NAMES.progressText}`);
    if (!fill || !text) {
      throw new Error('Progress UI is missing expected elements');
    }

    const ui = { container, fill, text };
    checklistProgressMap.set(checklist, ui);
    return ui;
  }

  function animateCheckmark(item) {
    if (!item.animate) {
      return;
    }

    item.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' }
      ],
      { duration: 200, easing: 'ease-out' }
    );
  }

  function showCompletionMessage(checklist) {
    const parent = checklist.parentElement;
    if (!parent) {
      return;
    }

    const message = document.createElement('div');
    message.className = CLASS_NAMES.completionMessage;
    message.textContent = TEXT.completion;

    parent.appendChild(message);

    requestAnimationFrame(() => {
      message.classList.add(CLASS_NAMES.completionVisible);
    });

    setTimeout(() => {
      message.classList.remove(CLASS_NAMES.completionVisible);
      setTimeout(() => {
        message.remove();
      }, 300);
    }, 3000);
  }

  function initTableSorting() {
    const tables = document.querySelectorAll(SELECTORS.practicalTables);

    tables.forEach(table => {
      const headers = table.querySelectorAll(SELECTORS.tableHeaders);

      headers.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-sort', 'none');
        header.title = TEXT.sortTooltip;

        if (!header.querySelector(`.${CLASS_NAMES.sortIcon}`)) {
          const icon = document.createElement('span');
          icon.className = CLASS_NAMES.sortIcon;
          icon.textContent = SORT_ICONS.neutral;
          header.appendChild(icon);
        }

        header.addEventListener('click', () => sortTable(table, index));
        header.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            sortTable(table, index);
          }
        });
      });
    });
  }

  function sortTable(table, columnIndex) {
    const body = table.tBodies[0];
    if (!body) {
      return;
    }

    const rows = Array.from(body.rows);
    const direction = getNextSortDirection(table, columnIndex);

    rows.sort((rowA, rowB) =>
      compareCells(rowA.cells[columnIndex], rowB.cells[columnIndex], direction)
    );

    rows.forEach(row => body.appendChild(row));

    table.dataset.sortColumn = String(columnIndex);
    table.dataset.sortDirection = direction;

    updateSortIndicators(table, columnIndex, direction);
  }

  function getNextSortDirection(table, columnIndex) {
    const currentColumn = Number.parseInt(table.dataset.sortColumn ?? '-1', 10);
    const currentDirection = table.dataset.sortDirection ?? 'asc';

    if (currentColumn === columnIndex) {
      return currentDirection === 'asc' ? 'desc' : 'asc';
    }

    return 'asc';
  }

  function compareCells(cellA, cellB, direction) {
    const multiplier = direction === 'asc' ? 1 : -1;

    const valueA = extractSortValue(cellA);
    const valueB = extractSortValue(cellB);

    const numberA = Number.parseFloat(valueA.replace(',', '.'));
    const numberB = Number.parseFloat(valueB.replace(',', '.'));
    const bothNumeric = !Number.isNaN(numberA) && !Number.isNaN(numberB);

    if (bothNumeric) {
      return (numberA - numberB) * multiplier;
    }

    return (
      valueA.localeCompare(valueB, undefined, {
        numeric: true,
        sensitivity: 'accent'
      }) * multiplier
    );
  }

  function extractSortValue(cell) {
    if (!cell) {
      return '';
    }

    const dataValue = cell.dataset.sortValue;
    if (typeof dataValue === 'string') {
      return dataValue.trim();
    }

    return cell.textContent.trim();
  }

  function updateSortIndicators(table, activeColumn, direction) {
    const headers = table.querySelectorAll(SELECTORS.tableHeaders);

    headers.forEach((header, index) => {
      const icon = header.querySelector(`.${CLASS_NAMES.sortIcon}`);

      if (index === activeColumn) {
        header.classList.add(CLASS_NAMES.sortedHeader);
        header.setAttribute('aria-sort', direction === 'asc' ? 'ascending' : 'descending');
        if (icon) {
          icon.textContent = direction === 'asc' ? SORT_ICONS.asc : SORT_ICONS.desc;
        }
      } else {
        header.classList.remove(CLASS_NAMES.sortedHeader);
        header.setAttribute('aria-sort', 'none');
        if (icon) {
          icon.textContent = SORT_ICONS.neutral;
        }
      }
    });
  }

  function initCodeCopy() {
    const blocks = document.querySelectorAll(SELECTORS.codeBlocks);

    blocks.forEach(block => {
      if (block.closest(`.${CLASS_NAMES.codeWrapper}`)) {
        return;
      }

      const parent = block.parentNode;
      if (!parent) {
        return;
      }

      const wrapper = document.createElement('div');
      wrapper.className = CLASS_NAMES.codeWrapper;

      parent.insertBefore(wrapper, block);
      wrapper.appendChild(block);

      const button = document.createElement('button');
      button.type = 'button';
      button.className = CLASS_NAMES.copyButton;
      button.textContent = TEXT.copy;
      button.title = TEXT.copy;

      wrapper.appendChild(button);

      button.addEventListener('click', async () => {
        await copyCodeToClipboard(block, button);
      });
    });
  }

  async function copyCodeToClipboard(codeBlock, button) {
    const code = codeBlock.textContent ?? '';

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        fallbackCopy(codeBlock);
      }

      setCopyButtonState(button, 'success');
    } catch (error) {
      console.error('Failed to copy code block', error);
      setCopyButtonState(button, 'error');
    }
  }

  function fallbackCopy(element) {
    const selection = window.getSelection();
    if (!selection) {
      throw new Error('Selection API is not available');
    }

    const range = document.createRange();
    range.selectNodeContents(element);

    selection.removeAllRanges();
    selection.addRange(range);

    const successful = typeof document.execCommand === 'function' && document.execCommand('copy');

    selection.removeAllRanges();

    if (!successful) {
      throw new Error('Fallback copy command failed');
    }
  }

  function setCopyButtonState(button, state) {
    if (state === 'success') {
      button.classList.add(CLASS_NAMES.copySuccess);
      button.textContent = TEXT.copySuccess;
      setTimeout(() => {
        button.classList.remove(CLASS_NAMES.copySuccess);
        button.textContent = TEXT.copy;
      }, 2000);
      return;
    }

    if (state === 'error') {
      button.classList.remove(CLASS_NAMES.copySuccess);
      button.textContent = TEXT.copyError;
      setTimeout(() => {
        button.textContent = TEXT.copy;
      }, 2000);
    }
  }

  function trackProgress() {
    const practicalId = getPracticalId();
    if (!practicalId) {
      return;
    }

    const startKey = STORAGE_KEYS.practicalStart(practicalId);
    if (safeReadRaw(startKey, null) === null) {
      safeWriteRaw(startKey, String(Date.now()));
    }

    safeWriteRaw(STORAGE_KEYS.practicalLastVisit(practicalId), String(Date.now()));
    trackTimeSpent(practicalId);
  }

  function getPracticalId() {
    const pathMatch = window.location.pathname.match(/practical_(\d+_\d+)/);
    if (pathMatch) {
      return pathMatch[1];
    }

    const titleMatch = document.title.match(/(\d+[\._]\d+)/);
    if (titleMatch) {
      return titleMatch[1].replace('.', '_');
    }

    return null;
  }

  function trackTimeSpent(practicalId) {
    const timeKey = STORAGE_KEYS.practicalTime(practicalId);
    let timeSpent = Number.parseInt(safeReadRaw(timeKey, '0'), 10);
    if (Number.isNaN(timeSpent)) {
      timeSpent = 0;
    }

    updateTimeDisplay(timeSpent);

    setInterval(() => {
      timeSpent += 60;
      safeWriteRaw(timeKey, String(timeSpent));
      updateTimeDisplay(timeSpent);
    }, ONE_MINUTE);
  }

  function updateTimeDisplay(seconds) {
    let display = document.getElementById(CLASS_NAMES.timeSpent);
    if (!display) {
      const container = document.querySelector(SELECTORS.cardBody);
      if (!container) {
        return;
      }

      display = document.createElement('div');
      display.id = CLASS_NAMES.timeSpent;
      display.className = CLASS_NAMES.timeSpent;
      container.appendChild(display);
    }

    display.textContent = `${TEXT.timeSpentLabel}: ${formatDuration(seconds)}`;
  }

  function formatDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const parts = [];
    if (hours > 0) {
      parts.push(`${hours}h`);
    }
    parts.push(`${minutes}m`);

    return parts.join(' ');
  }

  function trackDownloads() {
    const buttons = document.querySelectorAll(SELECTORS.downloadButtons);
    if (buttons.length === 0) {
      return;
    }

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        recordDownload(button);
      });
    });
  }

  function recordDownload(button) {
    const practicalId = getPracticalId();
    const downloads = safeReadJson(STORAGE_KEYS.downloads, []);
    downloads.push({
      practical: practicalId,
      file: button.dataset.file ?? button.textContent.trim(),
      timestamp: Date.now()
    });

    safeWriteJson(STORAGE_KEYS.downloads, downloads);
    console.log(`${TEXT.downloadLogPrefix} ${button.textContent.trim()}`);
  }

  function addDynamicStyles() {
    if (document.getElementById('practical-enhancements')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'practical-enhancements';
    style.textContent = `
      .${CLASS_NAMES.progressContainer} {
        margin-top: 1rem;
        padding: 1rem;
        background: #f0f9ff;
        border-radius: 8px;
        border: 1px solid #bfdbfe;
      }

      .${CLASS_NAMES.progressBar} {
        position: relative;
        height: 0.75rem;
        background: #e0f2fe;
        border-radius: 9999px;
        overflow: hidden;
        margin-bottom: 0.5rem;
      }

      .${CLASS_NAMES.progressFill} {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0;
        background: linear-gradient(90deg, #2563eb, #1d4ed8);
        border-radius: inherit;
        transition: width 0.3s ease;
      }

      .${CLASS_NAMES.progressText} {
        font-size: 0.875rem;
        font-weight: 500;
        color: #1e3a8a;
      }

      .${CLASS_NAMES.progressContainer}.${CLASS_NAMES.progressComplete} .${CLASS_NAMES.progressFill} {
        background: linear-gradient(90deg, #22c55e, #16a34a);
      }

      .${CLASS_NAMES.progressContainer}.${CLASS_NAMES.progressComplete} .${CLASS_NAMES.progressText} {
        color: #16a34a;
      }

      .${CLASS_NAMES.completionMessage} {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background: #ffffff;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        font-size: 1.25rem;
        font-weight: 600;
        color: #16a34a;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
      }

      .${CLASS_NAMES.completionMessage}.${CLASS_NAMES.completionVisible} {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }

      .${CLASS_NAMES.codeWrapper} {
        position: relative;
        margin: 1.5rem 0;
      }

      .${CLASS_NAMES.copyButton} {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid #e5e7eb;
        padding: 0.25rem 0.75rem;
        border-radius: 6px;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .${CLASS_NAMES.copyButton}:hover {
        background: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .${CLASS_NAMES.copyButton}.${CLASS_NAMES.copySuccess} {
        background: #dcfce7;
        border-color: #86efac;
        color: #16a34a;
      }

      .${CLASS_NAMES.sortIcon} {
        opacity: 0.7;
        font-size: 0.875rem;
        margin-left: 0.25rem;
      }

      th:hover .${CLASS_NAMES.sortIcon} {
        opacity: 1;
      }

      th.${CLASS_NAMES.sortedHeader} {
        background: #1e3a8a !important;
        color: #ffffff;
      }

      .${CLASS_NAMES.timeSpent} {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background: #fef3c7;
        border-radius: 6px;
        display: inline-block;
        font-size: 0.875rem;
        color: #92400e;
        font-weight: 500;
      }

      ${SELECTORS.checklists} ${SELECTORS.checklistItems} {
        padding-left: 2.5rem;
        transition: padding 0.2s ease;
      }

      ${SELECTORS.checklists} ${SELECTORS.checklistItems}:not(.${CLASS_NAMES.done}):hover {
        padding-left: 2.75rem;
      }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', init);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      initChecklists,
      initTableSorting,
      initCodeCopy,
      trackProgress,
      trackDownloads
    };
  }
})();
