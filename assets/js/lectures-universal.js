// Universal JavaScript для всіх лекцій та презентацій
// Інформаційні банківські технології - Кібербезпека
// Використовується для: lectures, slides, presentations

class BankingLecturePresentation {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.totalSlides = 0;
        this.isPlaying = false;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.keyboardEnabled = true;

        this.init();
    }

    // Ініціалізація презентації
    init() {
        this.initSlides();
        this.initNavigation();
        this.initKeyboardControls();
        this.initTouchControls();
        this.initSlideIndicators();
        this.initAutoPlay();
        this.initProgressTracking();

        // Показуємо перший слайд
        this.showSlide(0);

        console.log(`🏦 Презентація готова! Слайдів: ${this.totalSlides}`);
    }

    // Ініціалізація слайдів
    initSlides() {
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;

        if (this.totalSlides === 0) {
            console.error('❌ Слайди не знайдені!');
            return;
        }

        // Встановлюємо initial стани
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            slide.style.transform = index === 0 ? 'translateX(0)' : 'translateX(100%)';
            slide.style.opacity = index === 0 ? '1' : '0';

            // Додаємо анімації для контенту
            this.setupSlideAnimations(slide);
        });

        console.log(`📊 Знайдено ${this.totalSlides} слайдів`);
    }

    // Налаштування анімацій для слайду
    setupSlideAnimations(slide) {
        const elements = slide.querySelectorAll('h1, h2, h3, p, .content-card, .concept-card, ul, ol, .security-warning, .security-success');

        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        });
    }

    // Показ слайду з анімацією
    showSlide(index) {
        if (index < 0 || index >= this.totalSlides) return;

        const prevIndex = this.currentSlide;
        this.currentSlide = index;

        // Оновлюємо слайди
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');

            if (i === index) {
                slide.classList.add('active');
                slide.style.opacity = '1';
                slide.style.transform = 'translateX(0)';
                slide.style.zIndex = '10';

                // Анімуємо контент слайду
                setTimeout(() => this.animateSlideContent(slide), 200);

            } else if (i === prevIndex) {
                slide.classList.add('prev');
                slide.style.transform = i < index ? 'translateX(-100%)' : 'translateX(100%)';
                slide.style.opacity = '0';
                slide.style.zIndex = '1';

            } else {
                slide.style.opacity = '0';
                slide.style.transform = i < index ? 'translateX(-100%)' : 'translateX(100%)';
                slide.style.zIndex = '1';
            }
        });

        // Оновлюємо UI
        this.updateSlideCounter();
        this.updateSlideIndicators();
        this.updateNavigationButtons();
        this.trackProgress();

        console.log(`📍 Слайд ${index + 1}/${this.totalSlides}`);
    }

    // Анімація контенту слайду
    animateSlideContent(slide) {
        const elements = slide.querySelectorAll('h1, h2, h3, p, .content-card, .concept-card, ul, ol, .security-warning, .security-success');

        elements.forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    // Навігація - наступний слайд
    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.showSlide(this.currentSlide + 1);
        } else {
            // Циклічна навігація (опціонально)
            this.showSlide(0);
        }
    }

    // Навігація - попередній слайд
    previousSlide() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        } else {
            // Циклічна навігація (опціонально)
            this.showSlide(this.totalSlides - 1);
        }
    }

    // Перехід до конкретного слайду
    goToSlide(index) {
        this.showSlide(index);
    }

    // Перший слайд
    firstSlide() {
        this.showSlide(0);
    }

    // Останній слайд
    lastSlide() {
        this.showSlide(this.totalSlides - 1);
    }

    // Ініціалізація навігації
    initNavigation() {
        // Створюємо кнопки навігації якщо їх немає
        if (!document.querySelector('.navigation')) {
            this.createNavigationButtons();
        }

        // Додаємо обробники подій
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="next"]')) {
                this.nextSlide();
            } else if (e.target.matches('[data-action="prev"]')) {
                this.previousSlide();
            } else if (e.target.matches('[data-action="first"]')) {
                this.firstSlide();
            } else if (e.target.matches('[data-action="last"]')) {
                this.lastSlide();
            } else if (e.target.matches('[data-action="menu"]')) {
                this.goToMenu();
            } else if (e.target.matches('[data-action="fullscreen"]')) {
                this.toggleFullscreen();
            } else if (e.target.matches('[data-action="autoplay"]')) {
                this.toggleAutoPlay();
            }
        });
    }

    // Створення кнопок навігації
    createNavigationButtons() {
        const nav = document.createElement('div');
        nav.className = 'navigation';
        nav.innerHTML = `
            <button class="nav-btn menu-btn" data-action="menu" title="Повернутися до меню">
                <span>🏠</span> Меню
            </button>
            <button class="nav-btn" data-action="first" title="Перший слайд">
                <span>⏪</span>
            </button>
            <button class="nav-btn" data-action="prev" title="Попередній слайд">
                <span>⏮️</span>
            </button>
            <button class="nav-btn" data-action="next" title="Наступний слайд">
                <span>⏭️</span>
            </button>
            <button class="nav-btn" data-action="last" title="Останній слайд">
                <span>⏩</span>
            </button>
            <button class="nav-btn" data-action="fullscreen" title="Повноекранний режим">
                <span>🔍</span>
            </button>
            <button class="nav-btn" data-action="autoplay" title="Автопрогравання">
                <span>▶️</span>
            </button>
        `;
        document.body.appendChild(nav);
    }

    // Оновлення стану кнопок навігації
    updateNavigationButtons() {
        const prevBtn = document.querySelector('[data-action="prev"]');
        const nextBtn = document.querySelector('[data-action="next"]');
        const firstBtn = document.querySelector('[data-action="first"]');
        const lastBtn = document.querySelector('[data-action="last"]');

        if (prevBtn) prevBtn.disabled = this.currentSlide === 0;
        if (nextBtn) nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
        if (firstBtn) firstBtn.disabled = this.currentSlide === 0;
        if (lastBtn) lastBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }

    // Керування клавіатурою
    initKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.keyboardEnabled) return;

            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                case 'PageDown':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                case 'PageUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.firstSlide();
                    break;
                case 'End':
                    e.preventDefault();
                    this.lastSlide();
                    break;
                case 'F11':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
                case 'Escape':
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                    break;
                case 'p':
                case 'P':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.printSlides();
                    }
                    break;
            }
        });

        console.log('⌨️ Керування клавіатурою активовано');
    }

    // Керування дотиками (мобільні пристрої)
    initTouchControls() {
        const container = document.querySelector('.slide-container') || document.body;

        container.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        container.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    // Обробка свайпів
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Свайп ліворуч - наступний слайд
                this.nextSlide();
            } else {
                // Свайп праворуч - попередній слайд
                this.previousSlide();
            }
        }
    }

    // Індикатори слайдів
    initSlideIndicators() {
        if (document.querySelector('.slide-indicators')) return;

        const indicators = document.createElement('div');
        indicators.className = 'slide-indicators';

        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'slide-indicator';
            indicator.dataset.slide = i;
            indicator.addEventListener('click', () => this.goToSlide(i));
            indicators.appendChild(indicator);
        }

        document.body.appendChild(indicators);
        this.updateSlideIndicators();
    }

    // Оновлення індикаторів
    updateSlideIndicators() {
        const indicators = document.querySelectorAll('.slide-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    // Оновлення лічильника слайдів
    updateSlideCounter() {
        const counters = document.querySelectorAll('.slide-counter');
        counters.forEach(counter => {
            counter.textContent = `${this.currentSlide + 1}/${this.totalSlides}`;
        });
    }

    // Автопрогравання
    initAutoPlay() {
        this.autoPlayDuration = 5000; // 5 секунд
    }

    toggleAutoPlay() {
        const autoplayBtn = document.querySelector('[data-action="autoplay"]');

        if (this.isPlaying) {
            clearInterval(this.autoPlayInterval);
            this.isPlaying = false;
            if (autoplayBtn) {
                autoplayBtn.innerHTML = '<span>▶️</span>';
                autoplayBtn.title = 'Запустити автопрогравання';
            }
            console.log('⏸️ Автопрогравання зупинено');
        } else {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoPlayDuration);
            this.isPlaying = true;
            if (autoplayBtn) {
                autoplayBtn.innerHTML = '<span>⏸️</span>';
                autoplayBtn.title = 'Зупинити автопрогравання';
            }
            console.log('▶️ Автопрогравання запущено');
        }
    }

    // Повноекранний режим
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error('Помилка входу в повноекранний режим:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // Повернення до меню
    goToMenu() {
        // Намагаємось знайти батьківську директорію
        const pathLevels = window.location.pathname.split('/').length - 1;
        let backPath = '../'.repeat(Math.max(pathLevels - 1, 1));

        // Якщо в структурі lectures/moduleX/lectureY
        if (window.location.pathname.includes('/lectures/')) {
            backPath = '../../../index.html';
        }

        window.location.href = backPath;
    }

    // Друк слайдів
    printSlides() {
        // Показуємо всі слайди для друку
        this.slides.forEach(slide => {
            slide.style.position = 'relative';
            slide.style.opacity = '1';
            slide.style.transform = 'none';
            slide.style.pageBreakAfter = 'always';
        });

        setTimeout(() => {
            window.print();

            // Відновлюємо після друку
            setTimeout(() => {
                this.initSlides();
                this.showSlide(this.currentSlide);
            }, 1000);
        }, 500);
    }

    // Відстеження прогресу
    initProgressTracking() {
        this.startTime = Date.now();
        this.slideProgress = new Array(this.totalSlides).fill(false);
    }

    trackProgress() {
        this.slideProgress[this.currentSlide] = true;

        const completedSlides = this.slideProgress.filter(Boolean).length;
        const progressPercent = Math.round((completedSlides / this.totalSlides) * 100);

        console.log(`📈 Прогрес: ${completedSlides}/${this.totalSlides} слайдів (${progressPercent}%)`);

        // Зберігаємо в localStorage
        const lectureId = this.getLectureId();
        localStorage.setItem(`lecture_progress_${lectureId}`, JSON.stringify({
            currentSlide: this.currentSlide,
            completed: this.slideProgress,
            lastVisited: Date.now(),
            progressPercent: progressPercent
        }));
    }

    // Отримання ID лекції з URL
    getLectureId() {
        const path = window.location.pathname;
        const match = path.match(/lecture(\d+)_(\d+)/) || path.match(/module(\d+)/) || ['unknown'];
        return match[0] || 'unknown';
    }

    // Відновлення прогресу
    restoreProgress() {
        const lectureId = this.getLectureId();
        const saved = localStorage.getItem(`lecture_progress_${lectureId}`);

        if (saved) {
            try {
                const progress = JSON.parse(saved);
                this.slideProgress = progress.completed || [];

                // Питаємо користувача чи хоче продовжити з місця зупинки
                if (progress.currentSlide > 0) {
                    const continueFromLast = confirm(
                        `Продовжити з слайду ${progress.currentSlide + 1}?`
                    );

                    if (continueFromLast) {
                        this.showSlide(progress.currentSlide);
                    }
                }

                console.log(`📖 Відновлено прогрес: ${progress.progressPercent}%`);
            } catch (e) {
                console.error('Помилка відновлення прогресу:', e);
            }
        }
    }

    // Експорт презентації
    exportSlides() {
        const exportData = {
            title: document.title,
            slides: Array.from(this.slides).map((slide, index) => ({
                index: index,
                content: slide.innerHTML,
                classes: Array.from(slide.classList)
            })),
            timestamp: new Date().toISOString(),
            lectureId: this.getLectureId()
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lecture_${this.getLectureId()}_export.json`;
        a.click();
        URL.revokeObjectURL(url);

        console.log('📤 Презентація експортована');
    }

    // Завершення сесії
    endSession() {
        const sessionData = {
            lectureId: this.getLectureId(),
            totalTime: Date.now() - this.startTime,
            slidesViewed: this.slideProgress.filter(Boolean).length,
            totalSlides: this.totalSlides,
            completionRate: Math.round((this.slideProgress.filter(Boolean).length / this.totalSlides) * 100),
            endTime: new Date().toISOString()
        };

        // Відправляємо статистику (якщо є API)
        console.log('📊 Статистика сесії:', sessionData);

        // Зберігаємо локально
        const sessions = JSON.parse(localStorage.getItem('lecture_sessions') || '[]');
        sessions.push(sessionData);
        localStorage.setItem('lecture_sessions', JSON.stringify(sessions.slice(-10))); // Останні 10 сесій
    }
}

// Utilities для роботи з презентацією
class PresentationUtils {
    // Отримання статистики курсу
    static getCourseStats() {
        const sessions = JSON.parse(localStorage.getItem('lecture_sessions') || '[]');

        return {
            totalSessions: sessions.length,
            totalTime: sessions.reduce((sum, s) => sum + s.totalTime, 0),
            averageCompletion: sessions.length > 0
                ? Math.round(sessions.reduce((sum, s) => sum + s.completionRate, 0) / sessions.length)
                : 0,
            lastSession: sessions.length > 0 ? sessions[sessions.length - 1] : null
        };
    }

    // Очищення даних прогресу
    static clearProgress() {
        const keys = Object.keys(localStorage).filter(key =>
            key.startsWith('lecture_progress_') || key === 'lecture_sessions'
        );

        keys.forEach(key => localStorage.removeItem(key));
        console.log('🗑️ Прогрес очищено');
    }

    // Налаштування теми презентації
    static setTheme(theme) {
        const body = document.body;
        body.className = body.className.replace(/theme-\w+/g, '');
        body.classList.add(`theme-${theme}`);

        localStorage.setItem('presentation_theme', theme);
        console.log(`🎨 Тема змінена на: ${theme}`);
    }
}

// Глобальні змінні та функції
let BankingPresentation;

// Ініціалізація після завантаження сторінки
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏦 Завантаження лекції "Інформаційні банківські технології"');

    // Перевіряємо чи є слайди на сторінці
    if (document.querySelector('.slide')) {
        BankingPresentation = new BankingLecturePresentation();

        // Відновлюємо прогрес після ініціалізації
        setTimeout(() => {
            BankingPresentation.restoreProgress();
        }, 500);
    } else {
        console.log('ℹ️ Слайди не знайдені, можливо це не презентація');
    }
});

// Обробка закриття вікна
window.addEventListener('beforeunload', function() {
    if (BankingPresentation) {
        BankingPresentation.endSession();
    }
});

// Експорт для глобального доступу
window.BankingPresentation = BankingPresentation;
window.PresentationUtils = PresentationUtils;

// Консольні команди для розробки
if (typeof window !== 'undefined') {
    window.devCommands = {
        nextSlide: () => BankingPresentation?.nextSlide(),
        prevSlide: () => BankingPresentation?.previousSlide(),
        goToSlide: (index) => BankingPresentation?.goToSlide(index),
        getStats: () => PresentationUtils.getCourseStats(),
        clearProgress: () => PresentationUtils.clearProgress(),
        exportSlides: () => BankingPresentation?.exportSlides()
    };

    console.log('🛠️ Dev команди доступні через window.devCommands');
}

console.log('✅ Universal JavaScript для лекцій завантажено');
