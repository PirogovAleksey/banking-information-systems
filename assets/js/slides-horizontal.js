/* ================================================================
   SLIDES-HORIZONTAL.JS - Управління горизонтальними слайдами
   Для статичних HTML презентацій лекцій
   ================================================================ */

let currentSlide = 0;
let totalSlides = 0;

/**
 * Ініціалізація слайдів
 */
function initSlides() {
    const slides = document.getElementsByClassName('slide');
    totalSlides = slides.length;

    // Показати перший слайд
    showSlide(currentSlide);

    console.log(`📊 Ініціалізовано ${totalSlides} слайдів`);
}

/**
 * Показати конкретний слайд
 * @param {number} n - Номер слайду (0-based)
 */
function showSlide(n) {
    const slides = document.getElementsByClassName('slide');

    // Boundary checks
    if (n >= totalSlides) currentSlide = totalSlides - 1;
    if (n < 0) currentSlide = 0;

    // Сховати всі слайди
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    // Показати поточний слайд
    if (slides[currentSlide]) {
        slides[currentSlide].style.display = 'flex';
    }

    // Оновити лічильник
    const counterElement = document.getElementById('slideCounter');
    if (counterElement) {
        counterElement.textContent = `${currentSlide + 1} / ${totalSlides}`;
    }

    // Оновити progress bar
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = progress + '%';
    }
}

/**
 * Наступний слайд
 */
function nextSlide() {
    currentSlide++;
    if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
    showSlide(currentSlide);
}

/**
 * Попередній слайд
 */
function previousSlide() {
    currentSlide--;
    if (currentSlide < 0) currentSlide = 0;
    showSlide(currentSlide);
}

/**
 * Перемикання повноекранного режиму
 */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Помилка при вході в fullscreen: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

/**
 * Вихід з презентації
 */
function exitPresentation() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    // Повернутися до index.html лекції
    window.location.href = 'index.html';
}

/**
 * Перехід до конкретного слайду
 * @param {number} slideNumber - Номер слайду (1-based для користувача)
 */
function goToSlide(slideNumber) {
    currentSlide = slideNumber - 1;
    showSlide(currentSlide);
}

// ============================================
// Event Listeners
// ============================================

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        nextSlide();
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previousSlide();
    } else if (event.key === 'Escape') {
        exitPresentation();
    } else if (event.key === 'f' || event.key === 'F') {
        event.preventDefault();
        toggleFullscreen();
    } else if (event.key === 'Home') {
        event.preventDefault();
        goToSlide(1);
    } else if (event.key === 'End') {
        event.preventDefault();
        goToSlide(totalSlides);
    }
});

// Touch/Swipe support для мобільних пристроїв
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50; // мінімальна відстань для свайпу

    if (touchEndX < touchStartX - swipeThreshold) {
        // Свайп вліво - наступний слайд
        nextSlide();
    }

    if (touchEndX > touchStartX + swipeThreshold) {
        // Свайп вправо - попередній слайд
        previousSlide();
    }
}

// Ініціалізація після завантаження DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlides);
} else {
    initSlides();
}
