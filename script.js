document.addEventListener('DOMContentLoaded', function() {
    const mainButtons = document.querySelectorAll('.main-button');
    const subButtons = document.querySelectorAll('.sub-buttons');
    const cardButtons = document.querySelectorAll('.card-button');

    let activeContainer = null;

    mainButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const container = this.closest('.container');
            const subButtonsContainer = container.querySelector('.sub-buttons');
            const cards = container.querySelectorAll('.card-button');

            if (activeContainer && activeContainer !== container) {
                const activeSubButtons = activeContainer.querySelector('.sub-buttons');
                const activeCards = activeContainer.querySelectorAll('.card-button');
                activeSubButtons.classList.remove('show');
                activeCards.forEach(card => card.classList.remove('show'));
            }

            if (!subButtonsContainer.classList.contains('show')) {
                subButtonsContainer.classList.add('show');
                cards.forEach((card, i) => {
                    setTimeout(() => {
                        card.classList.add('show');
                    }, i * 100);
                });
                activeContainer = container;
            } else {
                subButtonsContainer.classList.remove('show');
                cards.forEach(card => card.classList.remove('show'));
                activeContainer = null;
            }
        });
    });

    // 카드 버튼 클릭 이벤트 추가
    cardButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // 이벤트 버블링 방지
            const url = this.getAttribute('data-url');
            if (url) {
                window.location.href = url; // 같은 페이지에서 열기
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.container') && activeContainer) {
            const activeSubButtons = activeContainer.querySelector('.sub-buttons');
            const activeCards = activeContainer.querySelectorAll('.card-button');
            activeSubButtons.classList.remove('show');
            activeCards.forEach(card => card.classList.remove('show'));
            activeContainer = null;
        }
    });
});
