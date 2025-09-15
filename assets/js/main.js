// Main JavaScript - Інформаційні банківські технології

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    renderModules();
    initFilters();
    addAnimations();
});

// Рендеринг модулів
function renderModules(filter = 'all') {
    const container = document.getElementById('modules-container');
    container.innerHTML = '';

    MODULES_DATA.forEach((module, index) => {
        const moduleCard = createModuleCard(module, filter);
        if (moduleCard) {
            container.appendChild(moduleCard);
            // Додавання анімації з затримкою
            setTimeout(() => {
                moduleCard.classList.add('show');
            }, index * 100);
        }
    });
}

// Створення картки модуля
function createModuleCard(module, filter) {
    const card = document.createElement('div');
    card.className = 'module-card';
    card.dataset.moduleId = module.id;

    let hasVisibleContent = false;
    let lecturesHTML = '';
    let labsHTML = '';
    let practicesHTML = '';

    // Фільтрація та генерація контенту
    if (filter === 'all' || filter === 'lectures') {
        if (module.lectures && module.lectures.length > 0) {
            hasVisibleContent = true;
            lecturesHTML = `
                <div class="content-section">
                    <h3 class="content-header">
                        <span>🎓</span> Лекції (${module.lectures.length})
                    </h3>
                    <ul class="content-list">
                        ${module.lectures.map(lecture => createContentItem(lecture, 'lecture', module.number)).join('')}
                    </ul>
                </div>
            `;
        }
    }

    if (filter === 'all' || filter === 'labs') {
        if (module.labs && module.labs.length > 0) {
            hasVisibleContent = true;
            labsHTML = `
                <div class="content-section">
                    <h3 class="content-header">
                        <span>🔬</span> Лабораторні роботи (${module.labs.length})
                    </h3>
                    <ul class="content-list">
                        ${module.labs.map(lab => createContentItem(lab, 'lab', module.number)).join('')}
                    </ul>
                </div>
            `;
        }
    }

    if (filter === 'all' || filter === 'practices') {
        if (module.practices && module.practices.length > 0) {
            hasVisibleContent = true;
            practicesHTML = `
                <div class="content-section">
                    <h3 class="content-header">
                        <span>💡</span> Практичні заняття (${module.practices.length})
                    </h3>
                    <ul class="content-list">
                        ${module.practices.map(practice => createContentItem(practice, 'practice', module.number)).join('')}
                    </ul>
                </div>
            `;
        }
    }

    // Якщо немає видимого контенту для фільтра, не показуємо картку
    if (!hasVisibleContent && filter !== 'all') {
        return null;
    }

    card.innerHTML = `
        <div class="module-header">
            <div class="module-icon">${module.icon}</div>
            <div class="module-info">
                <h2 class="module-title">Модуль ${module.number}. ${module.title}</h2>
                <div class="module-hours">
                    📚 ${module.hours.lectures} год. лекцій | 💻 ${module.hours.practice} год. практики
                </div>
            </div>
        </div>
        <p class="module-description">${module.description}</p>
        ${lecturesHTML}
        ${labsHTML}
        ${practicesHTML}
    `;

    return card;
}

// Створення елемента контенту
function createContentItem(item, type, moduleNumber) {
    const iconMap = {
        'lecture': '📖',
        'lab': '🧪',
        'practice': '⚙️'
    };

    const pathMap = {
        'lecture': 'lectures/',
        'lab': 'labs/',
        'practice': 'practices/'
    };

    const badge = item.badge ? `<span class="badge ${item.badge}">${item.badge}</span>` : '';

    return `
        <li class="content-item" onclick="openContent('${pathMap[type]}${item.file}', '${item.title}')">
            <div class="content-item-title">
                <span class="content-item-icon">${iconMap[type]}</span>
                <span>${item.title}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="content-item-duration">${item.duration}</span>
                ${badge}
            </div>
        </li>
    `;
}

// Відкриття контенту
function openContent(filePath, title) {
    // Тут можна реалізувати відкриття в модальному вікні або перехід на сторінку
    console.log(`Відкриття: ${filePath} - ${title}`);

    // Перевіряємо чи файл існує (для демонстрації - відкриваємо алерт)
    alert(`Файл "${title}" буде доступний після створення:\n${filePath}\n\nДодайте HTML файли лекцій, лабораторних та практичних у відповідні папки.`);

    // В реальному проекті:
    // window.open(filePath, '_blank');
}

// Ініціалізація фільтрів
function initFilters() {
    const filterButtons = document.querySelectorAll('.nav-btn[data-filter]');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Видалення активного класу з усіх кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Додавання активного класу поточній кнопці
            button.classList.add('active');

            // Отримання типу фільтра
            const filterType = button.getAttribute('data-filter');

            // Перерендеринг модулів з фільтром
            renderModules(filterType);
        });
    });
}

// Додавання анімацій
function addAnimations() {
    // Анімація для карток при скролі
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.5s ease forwards';
            }
        });
    }, observerOptions);

    // Спостереження за елементами
    document.querySelectorAll('.module-card').forEach(card => {
        observer.observe(card);
    });
}

// Утиліти
const Utils = {
    // Зберігання стану фільтра в localStorage
    saveFilterState(filter) {
        localStorage.setItem('banking_it_filter', filter);
    },

    // Відновлення стану фільтра
    restoreFilterState() {
        return localStorage.getItem('banking_it_filter') || 'all';
    },

    // Показ статистики курсу
    showStatistics() {
        let totalLectures = 0;
        let totalLabs = 0;
        let totalPractices = 0;
        let totalLectureHours = 0;
        let totalPracticeHours = 0;

        MODULES_DATA.forEach(module => {
            totalLectures += module.lectures ? module.lectures.length : 0;
            totalLabs += module.labs ? module.labs.length : 0;
            totalPractices += module.practices ? module.practices.length : 0;
            totalLectureHours += module.hours.lectures;
            totalPracticeHours += module.hours.practice;
        });

        console.log('=== Статистика курсу ===');
        console.log(`Модулів: ${MODULES_DATA.length}`);
        console.log(`Лекцій: ${totalLectures}`);
        console.log(`Лабораторних: ${totalLabs}`);
        console.log(`Практичних: ${totalPractices}`);
        console.log(`Годин лекцій: ${totalLectureHours}`);
        console.log(`Годин практики: ${totalPracticeHours}`);
        console.log(`Всього годин: ${totalLectureHours + totalPracticeHours}`);
    }
};

// Експорт для консолі (для тестування)
window.BankingIT = {
    modules: MODULES_DATA,
    utils: Utils,
    renderModules,
    openContent
};