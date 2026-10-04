/* =========================================
   AURELIS
   Main JavaScript
   ========================================= */


/* =========================================
   PRELOADER
   ========================================= */

const preloader =
    document.getElementById("preloader");


window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                preloader.classList.add(
                    "hidden"
                );

            },
            850
        );

    }
);


/* =========================================
   AGE VERIFICATION
   ========================================= */

const ageGate =
    document.getElementById("ageGate");

const ageYes =
    document.getElementById("ageYes");

const ageNo =
    document.getElementById("ageNo");

const ageDenied =
    document.getElementById("ageDenied");


const ageVerified =
    localStorage.getItem(
        "aurelisAgeVerified"
    );


function unlockSite() {

    localStorage.setItem(
        "aurelisAgeVerified",
        "true"
    );

    ageGate.classList.add(
        "hidden"
    );

    document.body.classList.remove(
        "age-locked"
    );

    setTimeout(
        () => {

            ageGate.style.display = "none";

        },
        700
    );

}


if (
    ageVerified === "true"
) {

    ageGate.classList.add(
        "hidden"
    );

    document.body.classList.remove(
        "age-locked"
    );

    setTimeout(
        () => {

            ageGate.style.display = "none";

        },
        700
    );

}


ageYes.addEventListener(
    "click",
    unlockSite
);


ageNo.addEventListener(
    "click",
    () => {

        ageGate.classList.add(
            "denied"
        );

    }
);


/* =========================================
   MOBILE NAV
   ========================================= */

const menuToggle =
    document.getElementById(
        "menuToggle"
    );

const navMenu =
    document.getElementById(
        "navMenu"
    );


menuToggle.addEventListener(
    "click",
    () => {

        navMenu.classList.toggle(
            "active"
        );

    }
);


navMenu
    .querySelectorAll("a")
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "active"
                    );

                }
            );

        }
    );


/* =========================================
   NAVBAR SCROLL
   ========================================= */

const navbar =
    document.getElementById(
        "navbar"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 40
        ) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }
);


/* =========================================
   SCROLL PROGRESS
   ========================================= */

const scrollProgress =
    document.getElementById(
        "scrollProgress"
    );


function updateProgress() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement
            .scrollHeight -
        window.innerHeight;

    const percentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;


    scrollProgress.style.width =
        `${percentage}%`;

}


window.addEventListener(
    "scroll",
    updateProgress
);

updateProgress();


/* =========================================
   SCROLL REVEALS
   ========================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================
   CART
   ========================================= */

let cart = [];


const cartButton =
    document.getElementById(
        "cartButton"
    );

const cartDrawer =
    document.getElementById(
        "cartDrawer"
    );

const cartOverlay =
    document.getElementById(
        "cartOverlay"
    );

const cartClose =
    document.getElementById(
        "cartClose"
    );

const cartItems =
    document.getElementById(
        "cartItems"
    );

const cartCount =
    document.getElementById(
        "cartCount"
    );

const cartTotal =
    document.getElementById(
        "cartTotal"
    );

const checkoutButton =
    document.getElementById(
        "checkoutButton"
    );


function openCart() {

    cartDrawer.classList.add(
        "active"
    );

    cartOverlay.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


function closeCart() {

    cartDrawer.classList.remove(
        "active"
    );

    cartOverlay.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


cartButton.addEventListener(
    "click",
    openCart
);


cartClose.addEventListener(
    "click",
    closeCart
);


cartOverlay.addEventListener(
    "click",
    closeCart
);


/* =========================================
   ADD PRODUCTS
   ========================================= */

const productCards =
    document.querySelectorAll(
        ".product-card"
    );


productCards.forEach(
    card => {

        const addButton =
            card.querySelector(
                ".add-button"
            );


        addButton.addEventListener(
            "click",
            () => {

                const product = {

                    name:
                        card.dataset.name,

                    price:
                        Number(
                            card.dataset.price
                        ),

                    image:
                        card.dataset.image,

                    quantity: 1

                };


                addProduct(
                    product
                );

            }
        );

    }
);


function addProduct(product) {

    const existing =
        cart.find(
            item =>
                item.name ===
                product.name
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push(product);

    }


    renderCart();


    showToast(
        `${product.name} добавлен в коллекцию`
    );

}


/* =========================================
   REMOVE PRODUCTS
   ========================================= */

function removeProduct(index) {

    cart.splice(
        index,
        1
    );

    renderCart();

}


/* =========================================
   RENDER CART
   ========================================= */

function renderCart() {

    const totalQuantity =
        cart.reduce(
            (
                total,
                item
            ) => {

                return (
                    total +
                    item.quantity
                );

            },
            0
        );


    const totalPrice =
        cart.reduce(
            (
                total,
                item
            ) => {

                return (
                    total +
                    (
                        item.price *
                        item.quantity
                    )
                );

            },
            0
        );


    cartCount.textContent =
        totalQuantity;

    cartTotal.textContent =
        `€${totalPrice}`;


    if (
        cart.length === 0
    ) {

        cartItems.innerHTML = `
            <div class="cart-empty">
                Ваша коллекция пока пуста.
            </div>
        `;

        return;

    }


    cartItems.innerHTML =
        cart.map(
            (
                item,
                index
            ) => {

                return `

                    <div class="cart-item">

                        <div class="cart-item-image">

                            <img
                                src="${item.image}"
                                alt="${item.name}"
                            >

                        </div>


                        <div class="cart-item-content">

                            <div class="cart-item-name">
                                ${item.name}
                            </div>

                            <div class="cart-item-price">
                                €${item.price}
                                × ${item.quantity}
                            </div>

                        </div>


                        <button
                            class="cart-item-remove"
                            onclick="removeProduct(${index})"
                            aria-label="Удалить"
                        >
                            ×
                        </button>

                    </div>

                `;

            }
        ).join("");

}


renderCart();


/* =========================================
   CHECKOUT
   ========================================= */

checkoutButton.addEventListener(
    "click",
    () => {

        if (
            cart.length === 0
        ) {

            showToast(
                "Добавьте продукт в коллекцию"
            );

            return;

        }


        showToast(
            "Это демонстрационный магазин портфолио"
        );

    }
);


/* =========================================
   TOAST
   ========================================= */

const toast =
    document.getElementById(
        "toast"
    );

let toastTimeout;


function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2600
        );

}


/* =========================================
   ESC
   ========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeCart();

        }

    }
);


/* =========================================
   HERO PARALLAX
   ========================================= */

const hero =
    document.querySelector(
        ".hero"
    );

const heroBackground =
    document.querySelector(
        ".hero-background"
    );

const heroGrid =
    document.querySelector(
        ".hero-grid"
    );


if (
    window.innerWidth > 900
) {

    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const mouseX =
                (
                    event.clientX -
                    rect.left
                ) / rect.width -
                0.5;


            const mouseY =
                (
                    event.clientY -
                    rect.top
                ) / rect.height -
                0.5;


            heroBackground.style.transform =
                `
                    scale(1.05)
                    translate(
                        ${mouseX * -12}px,
                        ${mouseY * -8}px
                    )
                `;


            heroGrid.style.transform =
                `
                    translate(
                        ${mouseX * 15}px,
                        ${mouseY * 10}px
                    )
                `;

        }
    );

}


/* =========================================
   PRODUCT TILT
   ========================================= */

if (
    window.innerWidth > 1100
) {

    productCards.forEach(
        card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    const rotateY =
                        (
                            x /
                            rect.width -
                            0.5
                        ) * 4;


                    const rotateX =
                        -(
                            y /
                            rect.height -
                            0.5
                        ) * 4;


                    card.style.transform =
                        `
                            perspective(1100px)
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
                            translateY(-8px)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================
   SMOOTH ANCHOR
   ========================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        targetId === "#"
                    ) {

                        event.preventDefault();

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const offset =
                        80;


                    const top =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        offset;


                    window.scrollTo({

                        top:
                            top,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );


/* =========================================
   PREVENT BODY SCROLL WHEN AGE LOCKED
   ========================================= */

if (
    ageVerified !== "true"
) {

    document.body.classList.add(
        "age-locked"
    );

}

/* =========================================
   INFINITE MARQUEE
   ========================================= */

const marquee =
    document.querySelector(".marquee");

const marqueeTrack =
    document.getElementById("marqueeTrack");

const marqueeTemplate =
    marqueeTrack?.querySelector(".marquee-group");


if (
    marquee &&
    marqueeTrack &&
    marqueeTemplate
) {

    let groupWidth = 0;

    let position = 0;

    let lastTime =
        performance.now();


    /*
     * Скорость в пикселях в секунду.
     * Для AURELIS специально оставляем
     * спокойное премиальное движение.
     */

    const speed = 55;


    /*
     * Создаём необходимое количество
     * одинаковых групп.
     */

    function buildMarquee() {

        /*
         * Сначала удаляем все старые клоны.
         */

        marqueeTrack
            .querySelectorAll(
                ".marquee-group:not(:first-child)"
            )
            .forEach(
                clone => clone.remove()
            );


        /*
         * Получаем реальную ширину
         * одной полной группы.
         */

        groupWidth =
            marqueeTemplate.getBoundingClientRect().width;


        if (!groupWidth) {
            return;
        }


        /*
         * Узнаём ширину видимой области.
         */

        const visibleWidth =
            marquee.getBoundingClientRect().width;


        /*
         * Добавляем достаточно копий,
         * чтобы строка всегда полностью
         * покрывала экран.
         *
         * +2 — запас на время движения.
         */

        const requiredGroups =
            Math.ceil(
                visibleWidth / groupWidth
            ) + 3;


        for (
            let i = 1;
            i < requiredGroups;
            i++
        ) {

            const clone =
                marqueeTemplate.cloneNode(true);

            clone.setAttribute(
                "aria-hidden",
                "true"
            );

            marqueeTrack.appendChild(
                clone
            );

        }


        /*
         * После изменения размеров
         * нормализуем текущую позицию.
         */

        if (groupWidth > 0) {

            position =
                -(
                    Math.abs(position) %
                    groupWidth
                );

        }


        marqueeTrack.style.transform =
            `translate3d(
                ${position}px,
                0,
                0
            )`;

    }


    /*
     * Собираем строку после загрузки.
     */

    buildMarquee();


    /*
     * Пересобираем при изменении
     * размера окна.
     */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        buildMarquee();

                    },
                    100
                );

        }
    );


    /*
     * Основной animation loop.
     */

    function animateMarquee(
        currentTime
    ) {

        const deltaTime =
            currentTime -
            lastTime;


        lastTime =
            currentTime;


        /*
         * Двигаем строку влево.
         */

        position -=
            speed *
            (deltaTime / 1000);


        /*
         * Когда одна полная группа
         * прошла экран, возвращаемся
         * ровно на её ширину.
         *
         * Так как группы идентичны,
         * переход абсолютно незаметный.
         */

        if (
            groupWidth > 0 &&
            Math.abs(position) >= groupWidth
        ) {

            position += groupWidth;

        }


        marqueeTrack.style.transform =
            `translate3d(
                ${position}px,
                0,
                0
            )`;


        requestAnimationFrame(
            animateMarquee
        );

    }


    requestAnimationFrame(
        animateMarquee
    );

}

/* =========================================
   PREMIUM NUMBER COUNTERS
   ========================================= */

const statValues =
    document.querySelectorAll(
        ".stat-value[data-target]"
    );


/*
 * Премиальная easing-функция.
 *
 * В начале движение быстрое,
 * затем постепенно замедляется
 * и мягко останавливается на финальном числе.
 */

function premiumEaseOut(t) {

    return 1 - Math.pow(
        1 - t,
        4
    );

}


/*
 * Запуск одного счётчика.
 */

function animateCounter(element) {

    const target =
        Number(
            element.dataset.target
        );


    if (
        !Number.isFinite(target)
    ) {
        return;
    }


    /*
     * Длительность.
     *
     * Для небольших чисел можно
     * считать чуть быстрее.
     * Для 1898 даём больше времени.
     */

    const duration =
        target >= 1000
            ? 2400
            : 1900;


    const startTime =
        performance.now();


    function updateCounter(
        currentTime
    ) {

        const elapsed =
            currentTime -
            startTime;


        let progress =
            elapsed /
            duration;


        /*
         * Ограничиваем progress
         * диапазоном 0 → 1.
         */

        progress =
            Math.min(
                progress,
                1
            );


        /*
         * Применяем premium easing.
         */

        const easedProgress =
            premiumEaseOut(
                progress
            );


        /*
         * Считаем текущее значение.
         */

        const currentValue =
            Math.floor(
                easedProgress *
                target
            );


        /*
         * Обновляем цифру.
         */

        element.textContent =
    currentValue;


        /*
         * Продолжаем анимацию.
         */

        if (
            progress < 1
        ) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            /*
             * Гарантируем абсолютно
             * точное конечное значение.
             */

            element.textContent =
    target;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/*
 * Запускаем счётчики только тогда,
 * когда статистика появляется
 * в области просмотра.
 */

const statsSection =
    document.querySelector(
        ".stats-section"
    );


if (
    statsSection &&
    statValues.length
) {

    let countersStarted = false;


    const statsObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting &&
                            !countersStarted
                        ) {

                            countersStarted =
                                true;


                            /*
                             * Небольшая задержка между
                             * счётчиками создаёт более
                             * дорогой визуальный ритм.
                             */

                            statValues.forEach(
                                (
                                    element,
                                    index
                                ) => {

                                    setTimeout(
                                        () => {

                                            animateCounter(
                                                element
                                            );

                                        },
                                        index * 140
                                    );

                                }
                            );


                            statsObserver.disconnect();

                        }

                    }
                );

            },
            {
                threshold: 0.35
            }
        );


    statsObserver.observe(
        statsSection
    );

}