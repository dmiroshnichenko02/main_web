const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    back = document.querySelector('.menu__close'),
    links = document.querySelectorAll('.menu__list'),
    menuBlock = document.querySelector('.menu__block');


function menuActive(block) {
    block.addEventListener('click', () => {
        menu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

function menuClose (block) {
    block.addEventListener('click', ()=> {
        menu.classList.remove('active');
        document.body.style.overflow = '';
    });
}

menuActive(hamburger);
menuClose(back);

links.forEach(item => {
    menuClose(item);
});

menu.addEventListener('click', (e) => {
    if (e.target !== menuBlock) {
        menu.classList.remove('active');
        document.body.style.overflow = '';
    }
});



const counters = document.querySelectorAll('.skills__rating-counter'),
    lines = document.querySelectorAll('.skills__rating-line span');

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});


// Form POST


const forms = document.querySelectorAll('form');

const message = {
    load: 'Loading',
    success: 'Good',
    failed: 'Fail'
};

forms.forEach(item => postMail(item));

function postMail(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const object = {};
        formData.forEach((item, key) => object[key] = item);

        fetch('mailer/smart.php', {
            method: "POST",
            body: object
        })
            .then(data => {
                console.log(data);
            }).catch(() => {
                console.log('Error');
            }).finally(() => {
                form.reset();
            });
    });
}
