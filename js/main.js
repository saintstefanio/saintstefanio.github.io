/* ===================================================================
 * Monica 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {

    'use strict';

    const cfg = {

        // MailChimp URL
        mailChimpURL : 'https://facebook.us1.list-manage.com/subscribe/post?u=1abf75f6981256963a47d197a&amp;id=37c6d8f4d6' 

    };


   /* preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');
        
        window.addEventListener('load', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');
            
            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader'))  {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

    }; // end ssPreloader


   /* mobile menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {

            link.addEventListener("click", function(event) {

                // at 900px and below
                if (window.matchMedia('(max-width: 900px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });

    }; // end ssMobileMenu


   /* swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        const homeSliderSwiper = new Swiper('.home-slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                // when window width is > 1330px
                1331: {
                    slidesPerView: 3,
                    spaceBetween: 48
                },
                // when window width is > 1773px
                1774: {
                    slidesPerView: 4,
                    spaceBetween: 48
                }
            }
        });

        const pageSliderSwiper = new Swiper('.page-slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                // when window width is > 1240px
                1241: {
                    slidesPerView: 3,
                    spaceBetween: 48
                }
            }
        });

        const singleSliderSwiper = new Swiper('.single-slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 1,
                    spaceBetween: 40
                },
                // when window width is > 1240px
                1241: {
                    slidesPerView: 1,
                    spaceBetween: 48
                }
            }
        });

    }; // end ssSwiper


    /* EmailJS Form Submission
    * ---------------------------------------------------- */
    const ssEmailJS = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior.

        // Collect form data
        const form = document.getElementById('contact-form');
        const formData = new FormData(form);

        // Check if the "send copy" checkbox is checked
        const sendCopyCheckbox = document.getElementById('checkbox');
        
        // Convert formData to a plain object
        const data = Object.fromEntries(formData.entries());

        // Fetch the current language
        const language = localStorage.getItem("language") || "en";
        data.language = language; // Add language to the data object

        try {
            // Send email using EmailJS
            const response = await emailjs.send('service_portf_gmail', 'template_i4t7cji', data);
            if (sendCopyCheckbox.checked) {
                const response = await emailjs.send('service_portf_gmail', 'template_e014qde', data);
                console.log('Copy sent successfully:', response);
            }
            form.reset(); // Reset the form fields
            console.log('Email sent successfully:', response);
            return 'OK';
        } catch (error) {
            console.error('Error:', error);
            return 'NOK';
        }
    };


   /* alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(e) {
                if (e.target.matches('.alert-box__close')) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add('hideit');

                    setTimeout(function() {
                        box.style.display = 'none';
                    }, 500)
                }
            });
        })

    }; // end ssAlertBoxes


    /* Back to Top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function() {
            if (window.scrollY >= pxShow) {
                if(!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    }; // end ssBackToTop


   /* smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function() {

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo

    /* slider auto
    * ------------------------------------------------------ */
    const ssSliderAuto = function() {

        const sliders = document.querySelectorAll('.home-slider, .page-slider, .single-slider');

        sliders.forEach(function(slider) {

            let sliderInterval;

            const startSlider = function() {
                sliderInterval = setInterval(function() {
                    if (slider.swiper.isEnd) {
                        slider.swiper.slideTo(0);
                    } else {
                        slider.swiper.slideNext();
                    }
                }, 7000);
            };

            const stopSlider = function() {
                clearInterval(sliderInterval);
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        startSlider();
                    } else {
                        stopSlider();
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(slider);

            slider.addEventListener('mouseenter', stopSlider);
            slider.addEventListener('mouseleave', startSlider);

        });

    }; // end ssSliderAuto

    /* language switch
    * ------------------------------------------------------ */
    const ssLanguageSwitch = function() {

        async function fetchLanguageData(lang) {
            const response = await fetch(`languages/${lang}.json`);
            return response.json();
        }
    
        function setLanguagePreference(lang) {
            localStorage.setItem("language", lang);
            location.reload();
        }
    
        function updateContent(langData) {
            document.querySelectorAll("[data-i18n]").forEach((element) => {
                const key = element.getAttribute("data-i18n");
    
                if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                    if (key === "contact_email_placeholder" || key === "contact_message_placeholder") {
                        element.placeholder = langData[key];
                    } else if (key === "contact_button") {
                        element.value = langData[key];
                    }
                } else {
                    if (langData[key]) {
                        element.innerHTML = langData[key];
                    }
                }
            });
        }
    
        async function changeLanguage(lang) {
            setLanguagePreference(lang);
            const langData = await fetchLanguageData(lang);
            updateContent(langData);
        }
    
        window.addEventListener("DOMContentLoaded", async () => {
            const userPreferredLanguage = localStorage.getItem("language") || "en";
            const langData = await fetchLanguageData(userPreferredLanguage);
            updateContent(langData);
    
            // Add event listener to the language selector dropdown
            const languageSelector = document.getElementById("language-selector");
            if (languageSelector) {
                languageSelector.value = userPreferredLanguage; // Set the dropdown to the preferred language
                languageSelector.addEventListener("change", (event) => {
                    changeLanguage(event.target.value);
                });
            }
        });

        // Attach changeLanguage to the window object
        window.changeLanguage = changeLanguage;
    
    }; // end ssLanguage


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssSwiper();
        ssAlertBoxes();
        ssMoveTo();
        ssSliderAuto();
        ssLanguageSwitch();

    })();

    // Attach the event listener to the form
    document.getElementById('contact-form').addEventListener('submit', async (event) => {
        const result = await ssEmailJS(event);
        const successBox = document.querySelector('.alert-box.alert-box--success');
        const errorBox = document.querySelector('.alert-box.alert-box--error');
        
        if (result === 'OK') {
            successBox.classList.add('visible');
            setTimeout(() => successBox.classList.remove('visible'), 5000);
        } else {
            errorBox.classList.add('visible');
            setTimeout(() => errorBox.classList.remove('visible'), 5000);
        }
    });

})(document.documentElement);