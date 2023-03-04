function sliders({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        sliderWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(sliderWrapper).width;
    let sildeIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${sildeIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = sildeIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden';

    slides.forEach(item => item.style.width = width);

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function dotsFn(dot) {
        dot.forEach(item => item.style.opacity = '.5');
        dot[sildeIndex - 1].style.opacity = 1;
    }

    function slideNum() {
        if (slides.length < 10) {
            current.textContent = `0${sildeIndex}`;
        } else {
            current.textContent = sildeIndex;
        }
    }
    function slideMove() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function regReplace(str) {
        return +str.replace(/\D/g, '');
    }


    next.addEventListener('click', () => {
        if (offset === regReplace(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += regReplace(width);
        }
        slideMove();

        if (sildeIndex == slides.length) {
            sildeIndex = 1;
        } else {
            sildeIndex++;
        }

        slideNum();

        dotsFn(dots);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = regReplace(width) * (slides.length - 1);
        } else {
            offset -= regReplace(width);
        }
        slideMove();

        if (sildeIndex == 1) {
            sildeIndex = slides.length;
        } else {
            sildeIndex--;
        }

        slideNum();

        dotsFn(dots);
    });

    dots.forEach(item => {
        item.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            sildeIndex = slideTo;

            offset = regReplace(width) * (slideTo - 1);

            slideMove();

            slideNum();

            dotsFn(dots);
        });
    });

}

export default sliders;