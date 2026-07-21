(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    initWOW();
    spinner();


    // Initiate WOW.js
    function initWOW() {
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }
    }


    // Navbar scroll effect
    var navbar = document.getElementById('navbar');
    var lastScroll = 0;

    $(window).on('scroll', function () {
        var currentScroll = $(this).scrollTop();

        if (currentScroll > 50) {
            $(navbar).addClass('scrolled');
        } else {
            $(navbar).removeClass('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Active nav link on scroll
    var sections = $('section[id]');
    $(window).on('scroll', function () {
        var scrollPos = $(this).scrollTop() + 100;

        sections.each(function () {
            var top = $(this).offset().top;
            var height = $(this).outerHeight();
            var id = $(this).attr('id');

            if (scrollPos >= top && scrollPos < top + height) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + id + '"]').addClass('active');
            }
        });
    });


    // Smooth scrolling for navbar links
    $(".navbar-nav a, .nav-link").on('click', function (event) {
        var hash = $(this).attr('href');
        if (hash && hash.startsWith('#') && hash.length > 1) {
            event.preventDefault();
            var target = $(hash);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800, 'easeInOutExpo');
            }

            // Close mobile nav
            var mobileNav = document.getElementById('mobileNav');
            if (mobileNav && mobileNav.classList.contains('show')) {
                var bsCollapse = bootstrap.Collapse.getInstance(mobileNav);
                if (bsCollapse) bsCollapse.hide();
            }
        }
    });


    // Back to top button
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn('slow');
        } else {
            $('#backToTop').fadeOut('slow');
        }
    });

    $('#backToTop').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800, 'easeInOutExpo');
    });


    // Scroll reveal animations
    function revealOnScroll() {
        var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

        reveals.forEach(function (el) {
            var windowHeight = window.innerHeight;
            var elementTop = el.getBoundingClientRect().top;
            var revealPoint = 120;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('revealed');
            }
        });
    }

    $(window).on('scroll', revealOnScroll);
    $(window).on('load', revealOnScroll);


    // Counter animation
    function animateCounters() {
        var counters = document.querySelectorAll('.stat-number[data-count]');

        counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-count'));
            var current = parseInt(counter.textContent);
            var increment = Math.ceil(target / 60);
            var duration = 2000;
            var stepTime = duration / (target / increment);

            if (current < target && !counter.classList.contains('counted')) {
                counter.classList.add('counted');

                var timer = setInterval(function () {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = current.toLocaleString();
                }, stepTime);
            }
        });
    }

    // Trigger counters when hero is visible
    var heroStatsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounters();
                heroStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    var heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroStatsObserver.observe(heroStats);
    }


    // Pricing toggle
    $(document).ready(function () {
        $('.pricing-toggle').on('click', function () {
            var plan = $(this).data('plan');

            $('.pricing-toggle').removeClass('active');
            $(this).addClass('active');

            $('.pricing-section').fadeOut(300, function () {
                $(this).css('display', 'none');
            });

            setTimeout(function () {
                $('#pricing-' + plan).fadeIn(300).css('display', 'block');
            }, 300);
        });
    });


    // FAQ accordion (custom)
    window.toggleFaq = function (button) {
        var body = $(button).next('.accordion-body-custom');
        var icon = $(button).find('.toggle-icon');
        var isOpen = body.hasClass('show');

        // Close all
        $('.accordion-body-custom').removeClass('show');
        $('.accordion-button-custom').removeClass('active');

        // Toggle current
        if (!isOpen) {
            body.addClass('show');
            $(button).addClass('active');
        }
    };


    // FAQ filter and search
    $(document).ready(function () {
        var $faqItems = $('.faq-item');
        var $filterButtons = $('.faq-filter');
        var $searchInput = $('#faqSearch');
        var currentCategory = 'all';

        $filterButtons.on('click', function () {
            currentCategory = $(this).data('category');

            $filterButtons.removeClass('active');
            $(this).addClass('active');

            filterFAQs();
        });

        $searchInput.on('keyup', function () {
            filterFAQs();
        });

        function filterFAQs() {
            var searchTerm = $searchInput.val().toLowerCase();
            var visibleCount = 0;

            $faqItems.each(function () {
                var $item = $(this);
                var itemCategory = $item.data('category');
                var itemText = $item.text().toLowerCase();

                var categoryMatch = (currentCategory === 'all' || itemCategory === currentCategory);
                var searchMatch = (searchTerm === '' || itemText.includes(searchTerm));

                if (categoryMatch && searchMatch) {
                    $item.fadeIn(200);
                    visibleCount++;
                } else {
                    $item.fadeOut(200);
                }
            });

            if (visibleCount === 0) {
                if ($('#faqNoResults').length === 0) {
                    $('#faqAccordion').after('<div id="faqNoResults" class="mt-4">No FAQs found matching your search. <a href="#contact">Contact us</a> for help.</div>');
                }
                $('#faqNoResults').fadeIn();
            } else {
                $('#faqNoResults').fadeOut(function () {
                    $(this).remove();
                });
            }
        }
    });


    // Testimonials carousel
    $(document).ready(function () {
        if ($('.testimonial-carousel').length && typeof $.fn.owlCarousel !== 'undefined') {
            $(".testimonial-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 800,
                margin: 24,
                dots: false,
                loop: true,
                nav: true,
                navText: [
                    '<i class="fa fa-chevron-left"></i>',
                    '<i class="fa fa-chevron-right"></i>'
                ],
                responsive: {
                    0: { items: 1 },
                    992: { items: 3 },
                    768: { items: 2 }
                }
            });
        }
    });


    // Contact form handler
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        $('#submitBtn').prop('disabled', true);
        $('#btnText').hide();
        $('#btnSpinner').show();

        var formData = new FormData(this);

        fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(function (response) { return response.json(); })
        .then(function (data) {
            $('#submitBtn').prop('disabled', false);
            $('#btnText').show();
            $('#btnSpinner').hide();

            if (data.ok) {
                $('#formMessage')
                    .removeClass('alert-danger')
                    .addClass('alert alert-success')
                    .html('<i class="fa fa-check-circle me-2"></i>Thank you! We will get back to you soon.')
                    .show();
                $('#contactForm')[0].reset();
            } else {
                $('#formMessage')
                    .removeClass('alert-success')
                    .addClass('alert alert-danger')
                    .html('<i class="fa fa-exclamation-circle me-2"></i>Sorry, there was an error. Please try again.')
                    .show();
            }
        })
        .catch(function () {
            $('#submitBtn').prop('disabled', false);
            $('#btnText').show();
            $('#btnSpinner').hide();

            $('#formMessage')
                .removeClass('alert-success')
                .addClass('alert alert-danger')
                .html('<i class="fa fa-exclamation-circle me-2"></i>Sorry, there was an error. Please try again.')
                .show();
        });
    });


    // Parallax effect for hero background
    $(window).on('scroll', function () {
        var scrolled = $(this).scrollTop();
        var heroGrid = document.querySelector('.hero-grid');
        if (heroGrid && scrolled < window.innerHeight) {
            heroGrid.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
        }
    });

})(jQuery);
