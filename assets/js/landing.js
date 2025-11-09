/**
 * LANDING.JS - Banking Information Systems
 * JavaScript для головної сторінки курсу "Інформаційні банківські технології"
 *
 * Функціональність:
 * - Завантаження та рендеринг модулів з modules.json
 * - Управління табами (Лекції/Практичні)
 * - Навігація до лекцій та практичних робіт
 * - Performance monitoring
 *
 * Версія: 2.2 (FIXED)
 * Дата: 16.09.2025
 */

/* =============================================================================
   MAIN LANDING PAGE CLASS
   ============================================================================= */

class LandingPage {
    constructor() {
        this.modules = [];
        this.courseData = null;
        this.activeTab = 'lectures';
        this.init();
    }

    /**
     * Ініціалізація головної сторінки
     */
    async init() {
        try {
            console.log('🏠 Ініціалізація головної сторінки...');
            await this.loadCourseData();
            this.updateStats();
            this.setupTabs();
            this.renderActiveTab();
            console.log('✅ Головна сторінка ініціалізована успішно');
        } catch (error) {
            console.error('❌ Помилка завантаження даних курсу:', error);
            this.showError();
        }
    }

    /**
     * Завантаження даних курсу з modules.json
     */
    async loadCourseData() {
        const response = await fetch('assets/data/modules.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        this.courseData = await response.json();
        this.modules = this.courseData.modules || [];
        console.log('✅ Завантажено дані курсу:', this.courseData.courseInfo);
    }

    /**
     * Оновлення статистики курсу в Hero секції
     */
    updateStats() {
        if (!this.courseData) return;

        const info = this.courseData.courseInfo;
        const totalModulesEl = document.getElementById('total-modules');
        const totalLecturesEl = document.getElementById('total-lectures');
        const totalHoursEl = document.getElementById('total-hours');

        if (totalModulesEl) totalModulesEl.textContent = info.totalModules || 6;
        if (totalLecturesEl) totalLecturesEl.textContent = info.totalLectures || 18;
        if (totalHoursEl) totalHoursEl.textContent = info.estimatedHours || 54;
    }

    /**
     * Налаштування обробників подій для табів
     */
    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });
    }

    /**
     * Перемикання між табами
     * @param {string} tabName - Назва табу ('lectures' або 'practicals')
     */
    switchTab(tabName) {
        // Оновити активний таб
        this.activeTab = tabName;

        // Оновити кнопки табів
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Оновити контент табів
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}-tab`);
        });

        // Рендерити контент для активного табу
        this.renderActiveTab();

        console.log(`🔄 Перемикання на таб: ${tabName}`);
    }

    /**
     * Рендеринг контенту активного табу
     */
    renderActiveTab() {
        if (this.activeTab === 'lectures') {
            this.renderLectures();
        } else if (this.activeTab === 'practicals') {
            this.renderPracticals();
        }
    }

    /**
     * Рендеринг вкладки "Лекції" - модулі з лекціями
     */
    renderLectures() {
        const container = document.getElementById('lectures-container');
        if (!container || this.modules.length === 0) {
            this.showError('lectures-container');
            return;
        }

        container.innerHTML = '';

        this.modules.forEach((module, index) => {
            if (module.lectures && module.lectures.length > 0) {
                const moduleCard = this.createLectureModuleCard(module, index + 1);
                container.appendChild(moduleCard);
            }
        });

        // Додаємо обробники подій після рендерингу
        this.attachLectureEventListeners();

        console.log(`📖 Відрендерено ${this.modules.length} модулів з лекціями`);
    }

    /**
     * Рендеринг вкладки "Практичні" - всі практичні роботи
     */
    renderPracticals() {
        const container = document.getElementById('practicals-container');
        if (!container) {
            this.showError('practicals-container');
            return;
        }

        container.innerHTML = '';

        // Збираємо всі практичні з усіх модулів
        const allPracticals = [];
        this.modules.forEach(module => {
            // Додаємо labs
            if (module.labs) {
                module.labs.forEach(lab => {
                    allPracticals.push({
                        ...lab,
                        moduleId: module.id,
                        moduleName: module.title,
                        moduleEmoji: module.emoji,
                        type: 'lab'
                    });
                });
            }

            // Додаємо practicalTasks
            if (module.practicalTasks) {
                module.practicalTasks.forEach(task => {
                    allPracticals.push({
                        ...task,
                        moduleId: module.id,
                        moduleName: module.title,
                        moduleEmoji: module.emoji,
                        type: 'task'
                    });
                });
            }
        });

        if (allPracticals.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <div class="text-6xl mb-4">💻</div>
                    <h3 class="text-xl font-semibold mb-2">Практичні роботи</h3>
                    <p class="text-gray-600">Практичні завдання будуть додані незабаром</p>
                </div>
            `;
            return;
        }

        allPracticals.forEach(practical => {
            const practicalCard = this.createPracticalCard(practical);
            container.appendChild(practicalCard);
        });

        console.log(`💻 Відрендерено ${allPracticals.length} практичних робіт`);
    }

    /**
     * Створення карточки модуля для вкладки "Лекції"
     * @param {Object} module - Об'єкт модуля
     * @param {number} position - Позиція модуля (номер)
     * @returns {HTMLElement} - DOM елемент карточки
     */
    createLectureModuleCard(module, position) {
        const card = document.createElement('div');
        card.className = 'module-preview';

        const statusBadge = this.getStatusBadge(module.status);

        card.innerHTML = `
            <div class="module-number">${position}</div>
            <div class="module-preview-content">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="module-preview-title">${module.emoji || '📚'} ${module.title}</h3>
                    ${statusBadge}
                </div>
                <p class="module-preview-description mb-4">${module.description}</p>
                
                <div class="module-section">
                    <h4 class="module-section-title">📖 Лекції:</h4>
                    <div class="module-items">
                        ${this.renderModuleLectures(module.lectures, module.id)}
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    /**
     * Рендеринг списку лекцій модуля
     * @param {Array} lectures - Масив лекцій
     * @param {number} moduleId - ID модуля
     * @returns {string} - HTML рядок з лекціями
     */
    renderModuleLectures(lectures, moduleId) {
        return lectures.map(lecture => `
            <div class="module-item module-lecture" data-module-id="${moduleId}" data-lecture-id="${lecture.id}">
                <span class="module-item-title">${lecture.title}</span>
                ${lecture.duration ? `<span class="module-item-meta">${lecture.duration} хв</span>` : ''}
            </div>
        `).join('');
    }

    /**
     * Створення карточки практичної роботи
     * @param {Object} practical - Об'єкт практичної роботи
     * @returns {HTMLElement} - DOM елемент карточки
     */
    createPracticalCard(practical) {
        const card = document.createElement('div');
        card.className = 'practical-card';

        const typeLabel = practical.type === 'lab' ? 'Лабораторна' : 'Практична';
        const typeIcon = practical.type === 'lab' ? '🔬' : '💻';

        card.innerHTML = `
            <div class="practical-header">
                <div class="practical-icon">${typeIcon}</div>
                <div class="practical-meta">
                    <span class="practical-type">${typeLabel}</span>
                    <span class="practical-module">${practical.moduleEmoji} ${practical.moduleName}</span>
                </div>
            </div>
            <h3 class="practical-title">${practical.title}</h3>
            <p class="practical-description">${practical.description || 'Опис буде додано'}</p>
            ${practical.estimatedTime ? `
                <div class="practical-time">
                    ⏱️ Приблизний час: ${practical.estimatedTime} хв
                </div>
            ` : ''}
        `;

        // Якщо є URL - робимо картку кліабельною
        if (practical.url) {
            card.style.cursor = 'pointer';
            card.classList.add('card-clickable');
            card.addEventListener('click', () => {
                window.location.href = practical.url;
            });
        }

        return card;
    }

    /**
     * Додавання обробників подій для кліків на лекції
     */
    attachLectureEventListeners() {
        const lectureItems = document.querySelectorAll('.module-lecture');
        lectureItems.forEach(item => {
            item.addEventListener('click', () => {
                const moduleId = item.dataset.moduleId;
                const lectureId = item.dataset.lectureId;
                this.openLecture(moduleId, lectureId);
            });
        });
    }

    /**
     * Генерація badge статусу модуля
     * @param {string} status - Статус модуля
     * @returns {string} - HTML рядок з badge
     */
    getStatusBadge(status) {
        const statusConfig = {
            'active': { text: 'Активний', class: 'badge-success' },
            'available': { text: 'Доступний', class: 'badge-success' },
            'completed': { text: 'Завершено', class: 'badge-primary' },
            'planned': { text: 'Заплановано', class: 'badge-outline' },
            'in_progress': { text: 'В процесі', class: 'badge-warning' }
        };

        const config = statusConfig[status] || statusConfig['planned'];
        return `<span class="badge ${config.class}">${config.text}</span>`;
    }

    /**
     * Відкриття сторінки модуля
     * @param {number} moduleId - ID модуля
     */
    openModule(moduleId) {
        console.log(`🔗 Відкриття модуля ${moduleId}`);
        // TODO: Реальна навігація коли будуть створені сторінки модулів
        alert(`📚 Модуль ${moduleId} буде доступний після створення структури модулів`);
    }

    /**
     * ВИПРАВЛЕНА ФУНКЦІЯ - Відкриття лекції
     * @param {number} moduleId - ID модуля
     * @param {string} lectureId - ID лекції (може бути "1.1", "1.2", "1.3" і т.д.)
     */
    openLecture(moduleId, lectureId) {
        console.log(`📖 Відкриття лекції ${moduleId}.${lectureId}`);

        // Список доступних лекцій (за номерами)
        const availableLectures = ['3', '4', '5', '6', '7', '8', '9'];

        // Перевіряємо чи лекція доступна
        if (availableLectures.includes(lectureId)) {
            // Переходимо на реальну сторінку лекції
            window.location.href = `modules/module${moduleId}/lectures/lecture${lectureId}/index.html`;
            return;
        }

        // Для всіх інших лекцій показуємо повідомлення про те, що вони ще в розробці
        alert(`📖 Лекція ${lectureId} модуля ${moduleId} буде доступна після створення структури`);
    }


    /**
     * Відображення помилки завантаження
     * @param {string} containerId - ID контейнера для помилки
     */
    showError(containerId = 'lectures-container') {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="col-span-full">
                    <div class="alert alert-error">
                        <div class="alert-title">❌ Помилка завантаження</div>
                        Не вдалося завантажити дані курсу.
                        <br><small>Перевірте наявність файлу assets/data/modules.json</small>
                    </div>
                </div>
            `;
        }
    }
}

/* =============================================================================
   INITIALIZATION AND EVENT HANDLERS
   ============================================================================= */

// Ініціалізація після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM завантажено, ініціалізація LandingPage...');
    new LandingPage();
});

// Smooth scroll для внутрішніх посилань
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const navigation = window.performance.timing;
        const loadTime = navigation.loadEventEnd - navigation.navigationStart;

        // Перевіряємо на валідність часу
        if (loadTime > 0 && loadTime < 30000) {
            console.log(`⚡ Час завантаження сторінки: ${loadTime}ms`);
        } else {
            console.log(`⚡ Сторінка завантажена успішно`);
        }
    }
});

/* =============================================================================
   EXPORT FOR MODULE USAGE (if needed)
   ============================================================================= */

// Експорт для використання в інших модулях (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LandingPage };
}