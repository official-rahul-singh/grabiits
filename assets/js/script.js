document.addEventListener('DOMContentLoaded', function () {
    function startCounter(counterId, limit, symbol) {
        let upto = 0;
        let counterElement = document.getElementById(counterId);
        if (counterElement) { // Ensure the element exists before proceeding
            let counts = setInterval(() => {
                counterElement.innerHTML = upto + symbol; // Add symbol after the number
                if (upto === limit) {
                    clearInterval(counts);
                }
                upto++; // Increment counter
            }, 10); // Adjust the interval for speed
        } else {
            console.error(`Element with id ${counterId} not found!`);
        }
    }

    // Start counters with different limits and symbols
    startCounter("counter1", 17, "+");
    startCounter("counter2", 350, "+");
    startCounter("counter3", 47, "+");
    startCounter("counter4", 85, "+");
    startCounter("counter", 45, "+");
});


// accordion code start
const detailsElements = document.querySelectorAll("details");
const summaryElements = document.querySelectorAll("summary");

summaryElements.forEach((summary, index) => {
    summary.addEventListener("click", () => {
      detailsElements.forEach((details, i) => {
        if (i !== index) {
          details.open = false;
        }
      });
    });
});


// tab section start
document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tablinks');
    const tabContents = document.querySelectorAll('.tabcontent');

    // Function to open a tab
    function openTab(event, targetContentId) {
        tabContents.forEach(content => {
            content.style.display = "none";
        });

        tabLinks.forEach(link => {
            link.classList.remove("active");
        });

        document.getElementById(targetContentId).style.display = "flex";
        event.currentTarget.classList.add("active");
    }

    // Initialize the first tab as active
    if (tabLinks.length > 0) {
        const firstTabLink = tabLinks[0];
        const firstTabContentId = firstTabLink.getAttribute('data-target');
        openTab({ currentTarget: firstTabLink }, firstTabContentId); // Open the first tab
    }

    // Add event listeners to tab links
    tabLinks.forEach(button => {
        button.addEventListener('click', function(event) {
            const targetContentId = event.currentTarget.getAttribute('data-target');
            openTab(event, targetContentId);
        });
    });
});
// tab section end


// slider start
const sliders = document.querySelectorAll('.slider'); // Select all sliders on the page

sliders.forEach(slider => {
    const wrapper = slider.querySelector(".slide-wrapper");
    const carousel = slider.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".slide-card").offsetWidth;
    const cardGap = 16;  // Card gap
    const carouselChildrens = [...carousel.children];
    
    let isAutoPlay = true;
    let timeoutId;
    
    // Get the number of cards that can fit in the carousel at once
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // Insert copies of the last few cards to the beginning of carousel for infinite scrolling
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards to the end of carousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the carousel to the appropriate position to hide first few duplicate cards on Firefox
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the carousel left and right
    // Previous Button
    const prevBtn = document.querySelector("#prev");
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            carousel.scrollLeft -= firstCardWidth + cardGap;
        });
    }

    // Next Button
    const nextBtn = document.querySelector("#next");
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            carousel.scrollLeft += firstCardWidth + cardGap;
        });
    }

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    const infiniteScroll = () => {
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }

        clearTimeout(timeoutId);
        if (!wrapper.matches(":hover")) autoPlay();
    };

    const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return;
        timeoutId = setTimeout(() => carousel.scrollLeft += (firstCardWidth + cardGap), 1000);
    };
    autoPlay();

    const updateActiveIndicator = () => {
        const scrollLeft = carousel.scrollLeft;
        const index = Math.round(scrollLeft / (firstCardWidth + cardGap)) - cardPerView;
        const indicators = slider.querySelectorAll(".indicator");
        indicators.forEach((indicator, i) => {
            if (i === index) {
                setActiveIndicator(indicator);
            }
        });
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    carousel.addEventListener("scroll", updateActiveIndicator);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);

    // Create indicators for each slider
    const indicatorsContainer = slider.querySelector(".indicators");
    for (let i = 0; i < carouselChildrens.length - 2 * cardPerView; i++) {
        const indicator = document.createElement("div");
        indicator.classList.add("indicator");
        if (i === 0) {
            indicator.classList.add("active");
            activeIndicator = indicator;
        }
        indicator.addEventListener("click", () => {
            carousel.scrollLeft = (i + cardPerView) * (firstCardWidth + cardGap);
            setActiveIndicator(indicator);
        });
        indicatorsContainer.appendChild(indicator);
    }

    // Function to set active indicator
    const setActiveIndicator = (indicator) => {
        if (activeIndicator) {
            activeIndicator.classList.remove("active");
        }
        indicator.classList.add("active");
        activeIndicator = indicator;
    };
});                                                              

// slider end


// marquee slider start
const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {

    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
// marquee slider end


// verticles image tab start
        const verticles_card = document.querySelectorAll('.verticles-card');
        const image = document.querySelector('.verticles-img img');
        
        verticles_card.forEach(verticles_card => {
            verticles_card.addEventListener('mouseenter', (event) => {
                const imageUrl = event.target.getAttribute('data-image');
                image.src = imageUrl;
            });
        
            verticles_card.addEventListener('mouseleave', () => {
                image.src = 'https://getassist.net/wp-content/uploads/2024/12/Google-launches.webp'; // Default image when mouse leaves
            });
        });
        
// verticles image tab end

// dropdown start
let headerUl = document.querySelector("header nav");
function toggleButtons() {
    let e = document.querySelector("header");
    headerUl.classList.toggle("show-ul");
    let t = document.querySelector(".cancel-btn");
    if (headerUl.classList.contains("show-ul")) {
        let o = document.createElement("div");
        e.appendChild(o),
            o.classList.add("doc-overlay"),
            disableScroll(),
            (t.style.display = "block"),
            o.addEventListener("click", function (e) {
                headerUl.classList.remove("show-ul"), o.remove(), enableScroll();
            });
    } else document.querySelector(".doc-overlay").remove(), enableScroll();
}
function disableScroll() {
    document.body.style.overflow = "hidden";
}
function enableScroll() {
    document.body.style.overflow = "auto";
}
const navDropdowns = document.querySelectorAll(".dropdown");
function createMultipleCounters(e) {
    e.forEach((e) => {
        createCounter(e.id, e.maxCount);
    });
}
function createCounter(e, t) {
    let o = 0,
        n = setInterval(() => {
            let l = document.getElementById(e);
            if (!l) return console.error("Counter element with ID '" + e + "' not found."), void clearInterval(n);
            (l.innerHTML = ++o), o === t && clearInterval(n);
        }, 10);
}
navDropdowns.forEach((e) => {
    e.addEventListener("click", function (e) {
        this.classList.toggle("showMenu");
    });
    e.querySelectorAll(".dropdown ul").forEach((e) => {
        e.addEventListener("click", function (e) {
            e.stopPropagation();
        });
    });
}),
    document.addEventListener("click", (e) => {
        navDropdowns.forEach((t) => {
            t.contains(e.target) || t.classList.remove("showMenu");
        });
    })
// dropdown end

// top to bottom
let calcScrollValue = () => {
    let e = document.getElementById("progress"),
        t = (document.getElementById("progress-value"), document.documentElement.scrollTop),
        o = document.documentElement.scrollHeight - document.documentElement.clientHeight,
        n = Math.round((100 * t) / o);
    (e.style.display = t > 100 ? "grid" : "none"),
        e.addEventListener("click", () => {
            document.documentElement.scrollTop = 0;
        }),
        (e.style.background = `conic-gradient(#13264c ${n}%, #ebf3ff ${n}%)`);
};
(window.onscroll = calcScrollValue), (window.onload = calcScrollValue);
// top to bottom
