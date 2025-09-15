// Main JavaScript для головної сторінки курсу
// Інформаційні банківські технології - Кібербезпека

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏦 Завантаження курсу "Інформаційні банківські технології"');

    initializeModules();
    initializeNavigation();
    initializeAnimations();

    console.log('✅ Головна сторінка готова');
});

// Ініціалізація модулів
function initializeModules() {
    const container = document.getElementById('modules-container');

    if (!container) {
        console.error('❌ Контейнер модулів не знайдено');
        return;
    }

    if (!MODULES_DATA) {
        console.error('❌ Дані модулів не завантажені');
        container.innerHTML = '<div class="loading">Завантаження модулів...</div>';
        return;
    }

    // Очищаємо контейнер
    container.innerHTML = '';

    // Створюємо картки модулів
    MODULES_DATA.forEach(module => {
        const moduleCard = createModuleCard(module);
        container.appendChild(moduleCard);
    });

    console.log(`📚 Завантажено ${MODULES_DATA.length} модулів`);
}

// Створення картки модуля
function createModuleCard(module) {
    const card = document.createElement('div');
    card.className = 'module-card fade-in';
    card.dataset.moduleId = module.id;

    // Визначаємо чи це модуль з кібербезпеки
    const isSecurityModule = module.id === 4 || module.id === 6;

    card.innerHTML = `
        <div class="module-header">
            <div class="module-number">${module.number}</div>
            <div class="module-icon">${module.icon}</div>
            <h3 class="module-title">${module.title}</h3>
        </div>
        
        <p class="module-description">${module.description}</p>
        
        <div class="module-stats">
            <span class="stat-small">📚 ${module.lectures?.length || 0} лекцій</span>
            <span class="stat-small">🧪 ${module.labs?.length || 0} лаб</span>
            <span class="stat-small">⚙️ ${module.practices?.length || 0} практик</span>
            <span class="stat-small">⏱️ ${module.hours.lectures + module.hours.practice} год</span>
        </div>

        <div class="lectures-list">
            ${createLecturesList(module.lectures)}
        </div>

        ${module.labs?.length > 0 ? `
            <div class="labs-list" style="display: none;">
                <h4>🧪 Лабораторні роботи:</h4>
                ${createLabsList(module.labs)}
            </div>
        ` : ''}

        ${module.practices?.length > 0 ? `
            <div class="practices-list" style="display: none;">
                <h4>⚙️ Практичні заняття:</h4>
                ${createPracticesList(module.practices)}
            </div>
        ` : ''}

        ${isSecurityModule ? createSecurityFocus(module) : ''}
    `;

    return card;
}

// Створення списку лабораторних (готово для бейджів)
function createLabsList(labs) {
    if (!labs || labs.length === 0) {
        return '<p class="no-labs">Лабораторні в розробці...</p>';
    }

    return labs.map(lab => `
        <a href="${lab.file}" class="lab-item" data-lab-file="${lab.file}">
            <div class="lab-title">
                ${lab.title}
                ${lab.badge ? createBadge(lab.badge) : ''}
            </div>
            <div class="lab-duration">${lab.duration}</div>
        </a>
    `).join('');
}

// Створення списку практичних (готово для бейджів)
function createPracticesList(practices) {
    if (!practices || practices.length === 0) {
        return '<p class="no-practices">Практичні в розробці...</p>';
    }

    return practices.map(practice => `
        <a href="${practice.file}" class="practice-item" data-practice-file="${practice.file}">
            <div class="practice-title">
                ${practice.title}
                ${practice.badge ? createBadge(practice.badge) : ''}
            </div>
            <div class="practice-duration">${practice.duration}</div>
        </a>
    `).join('');
}

// Створення списку лекцій
function createLecturesList(lectures) {
    if (!lectures || lectures.length === 0) {
        return '<p class="no-lectures">Лекції в розробці...</p>';
    }

    return lectures.map(lecture => `
        <a href="${lecture.file}" class="lecture-item" data-lecture-file="${lecture.file}">
            <div class="lecture-title">
                ${lecture.title}
                ${lecture.badge ? createBadge(lecture.badge) : ''}
            </div>
            <div class="lecture-duration">${lecture.duration}</div>
            ${lecture.subtopics ? `
                <div class="lecture-subtopics">
                    ${lecture.subtopics.slice(0, 2).join(' • ')}${lecture.subtopics.length > 2 ? ' • ...' : ''}
                </div>
            ` : ''}
        </a>
    `).join('');
}

// Створення бейджа (готово для майбутнього використання)
function createBadge(badgeType) {
    // Поки повертаємо порожній рядок, але функція готова
    return '';

    // Для майбутнього використання:
    /*
    const badgeMap = {
        'new': '<span class="badge new">Нове</span>',
        'updated': '<span class="badge updated">Оновлено</span>',
        'important': '<span class="badge important">Важливо</span>',
        'beta': '<span class="badge beta">Бета</span>',
        'security': '<span class="badge security">Безпека</span>'
    };

    return badgeMap[badgeType] || '';
    */
}

// Створення секції фокусу на безпеці
function createSecurityFocus(module) {
    const focusMessages = {
        4: "🔐 Основний модуль з кібербезпеки! Включає практичні заняття з malware analysis, SIEM системами та penetration testing банківських додатків.",
        6: "🛡️ Критично важливий модуль! Вивчення реальних кіберінцидентів (Bangladesh Bank, Equifax), AI-powered атак та quantum-safe криптографії."
    };

    return `
        <div class="security-focus">
            <h4>🎯 Фокус на кібербезпеці</h4>
            <p>${focusMessages[module.id] || 'Модуль включає важливі аспекти кібербезпеки для банків.'}</p>
        </div>
    `;
}

// Ініціалізація навігації
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Знімаємо активний клас з усіх кнопок
            navButtons.forEach(btn => btn.classList.remove('active'));

            // Додаємо активний клас до поточної кнопки
            this.classList.add('active');

            // Фільтруємо контент
            const filter = this.dataset.filter;
            filterContent(filter);
        });
    });
}

// Фільтрація контенту
function filterContent(filter) {
    const moduleCards = document.querySelectorAll('.module-card');

    moduleCards.forEach(card => {
        const moduleId = parseInt(card.dataset.moduleId);
        let shouldShow = true;

        // Спочатку приховуємо всі списки
        const lecturesList = card.querySelector('.lectures-list');
        const labsList = card.querySelector('.labs-list');
        const practicesList = card.querySelector('.practices-list');

        // Приховуємо всі списки
        if (lecturesList) lecturesList.style.display = 'none';
        if (labsList) labsList.style.display = 'none';
        if (practicesList) practicesList.style.display = 'none';

        switch(filter) {
            case 'lectures':
                // Показуємо всі модулі для лекцій
                shouldShow = true;
                if (lecturesList) lecturesList.style.display = 'block';
                highlightLectures(card);
                break;
            case 'labs':
                // Показуємо модулі з лабораторними
                const hasLabs = MODULES_DATA.find(m => m.id === moduleId)?.labs?.length > 0;
                shouldShow = hasLabs;
                if (shouldShow) {
                    if (labsList) labsList.style.display = 'block';
                    highlightLabs(card);
                }
                break;
            case 'practices':
                // Показуємо модулі з практичними
                const hasPractices = MODULES_DATA.find(m => m.id === moduleId)?.practices?.length > 0;
                shouldShow = hasPractices;
                if (shouldShow) {
                    if (practicesList) practicesList.style.display = 'block';
                    highlightPractices(card);
                }
                break;
            case 'all':
            default:
                shouldShow = true;
                // Показуємо тільки лекції за замовчуванням
                if (lecturesList) lecturesList.style.display = 'block';
                clearHighlights(card);
                break;
        }

        if (shouldShow) {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('visible'), 100);
        } else {
            card.classList.remove('visible');
            setTimeout(() => card.style.display = 'none', 300);
        }
    });

    console.log(`🔍 Застосовано фільтр: ${filter}`);
}

// Підсвітка лекцій
function highlightLectures(card) {
    const lectures = card.querySelectorAll('.lecture-item');
    lectures.forEach(lecture => {
        lecture.style.background = 'rgba(30, 60, 114, 0.1)';
        lecture.style.borderLeft = '3px solid #3b7dd8';
    });
}

// Підсвітка лабораторних
function highlightLabs(card) {
    card.style.border = '2px solid #28a745';
    card.querySelector('.module-header').style.background = 'rgba(40, 167, 69, 0.1)';
}

// Підсвітка практичних
function highlightPractices(card) {
    card.style.border = '2px solid #dc3545';
    card.querySelector('.module-header').style.background = 'rgba(220, 53, 69, 0.1)';
}

// Очищення підсвітки
function clearHighlights(card) {
    card.style.border = '';
    const header = card.querySelector('.module-header');
    if (header) header.style.background = '';

    const lectures = card.querySelectorAll('.lecture-item');
    lectures.forEach(lecture => {
        lecture.style.background = '';
        lecture.style.borderLeft = '';
    });
}

// Ініціалізація анімацій
function initializeAnimations() {
    // Intersection Observer для fade-in анімацій
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Спостерігаємо за всіма елементами з класом fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Обробка кліків по лекціях
document.addEventListener('click', function(e) {
    const lectureLink = e.target.closest('.lecture-item');

    if (lectureLink && lectureLink.href) {
        // Перевіряємо чи файл існує
        const fileName = lectureLink.dataset.lectureFile;

        console.log(`🎯 Перехід до лекції: ${fileName}`);

        // Можна додати перевірку існування файлу
        if (fileName.includes('lecture1_2_core_banking')) {
            console.log('✅ Лекція 1.2 доступна');
        } else {
            console.log('⚠️ Лекція в розробці');
            e.preventDefault();
            showDevelopmentNotice(lectureLink.querySelector('.lecture-title').textContent);
        }
    }
});

// Показ повідомлення про розробку
function showDevelopmentNotice(lectureTitle) {
    const notice = document.createElement('div');
    notice.className = 'dev-notice';
    notice.innerHTML = `
        <div class="dev-notice-content">
            <h3>🚧 Лекція в розробці</h3>
            <p><strong>${lectureTitle}</strong></p>
            <p>Ця лекція наразі розробляється. Слідкуйте за оновленнями!</p>
            <button onclick="this.closest('.dev-notice').remove()">Зрозуміло</button>
        </div>
    `;

    notice.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    notice.querySelector('.dev-notice-content').style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.3);
    `;

    notice.querySelector('button').style.cssText = `
        background: #1e3c72;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 15px;
        font-size: 1rem;
    `;

    document.body.appendChild(notice);

    // Автоматичне видалення через 5 секунд
    setTimeout(() => notice.remove(), 5000);
}

// Функція показу статистики курсу (викликається з HTML)
function showCourseStats() {
    const stats = window.COURSE_STATS || {};

    const modal = document.createElement('div');
    modal.className = 'stats-modal';
    modal.innerHTML = `
        <div class="stats-modal-content">
            <h2>📊 Статистика курсу</h2>
            <div class="stats-grid">
                <div class="stat-item-modal">
                    <div class="stat-value">${stats.modules || 6}</div>
                    <div class="stat-label">Модулів</div>
                </div>
                <div class="stat-item-modal">
                    <div class="stat-value">${stats.lectures || 17}</div>
                    <div class="stat-label">Лекцій</div>
                </div>
                <div class="stat-item-modal">
                    <div class="stat-value">${stats.labs || 14}</div>
                    <div class="stat-label">Лабораторних</div>
                </div>
                <div class="stat-item-modal">
                    <div class="stat-value">${stats.practices || 16}</div>
                    <div class="stat-label">Практичних</div>
                </div>
            </div>
            
            <div class="hours-info">
                <h3>⏰ Розподіл часу:</h3>
                <p><strong>Лекції:</strong> ${stats.lectureHours || 36} годин</p>
                <p><strong>Практика:</strong> ${stats.practiceHours || 192} години</p>
                <p><strong>Всього:</strong> ${stats.totalHours || 228} годин</p>
                <p><strong>Співвідношення:</strong> лекції:практика = 1:5.3</p>
            </div>
            
            <div class="security-focus-stats">
                <h3>🔐 Фокус на кібербезпеці:</h3>
                <ul>
                    <li>Модуль 4: "Безпека банківських систем" (основний)</li>
                    <li>Модуль 6: "Кіберзагрози в банкінгу" (критичний)</li>
                    <li>50%+ курсу присвячено кібербезпеці</li>
                </ul>
            </div>
            
            <button onclick="this.closest('.stats-modal').remove()">Закрити</button>
        </div>
    `;

    // Стилі для модального вікна
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    `;

    const content = modal.querySelector('.stats-modal-content');
    content.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 25px 50px rgba(0,0,0,0.3);
    `;

    // Додаємо стилі для сітки статистики
    const statsGrid = modal.querySelector('.stats-grid');
    if (statsGrid) {
        statsGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 20px 0;
        `;
    }

    modal.querySelectorAll('.stat-item-modal').forEach(item => {
        item.style.cssText = `
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
        `;
    });

    modal.querySelectorAll('.stat-value').forEach(value => {
        value.style.cssText = `
            font-size: 2rem;
            font-weight: bold;
            color: #1e3c72;
            margin-bottom: 5px;
        `;
    });

    modal.querySelector('button').style.cssText = `
        background: #1e3c72;
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 20px;
        font-size: 1rem;
        display: block;
        margin-left: auto;
        margin-right: auto;
    `;

    document.body.appendChild(modal);
}

// Експорт функцій для глобального доступу
window.showCourseStats = showCourseStats;

// Лог завершення завантаження
console.log('🎓 Курс "Інформаційні банківські технології" готовий до використання');
