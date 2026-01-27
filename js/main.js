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
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 60
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });

    // Contact Form Handler (Formspree)
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        // Show loading state
        $('#submitBtn').prop('disabled', true);
        $('#btnText').hide();
        $('#btnSpinner').show();

        // Get form data
        var formData = new FormData(this);

        // Send to Formspree
        fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Hide loading state
            $('#submitBtn').prop('disabled', false);
            $('#btnText').show();
            $('#btnSpinner').hide();

            if (data.ok) {
                // Success
                $('#formMessage').removeClass('alert-danger').addClass('alert alert-success').html('Thank you for your message. We will get back to you soon!').show();
                $('#contactForm')[0].reset();
            } else {
                // Error
                $('#formMessage').removeClass('alert-success').addClass('alert alert-danger').html('Sorry, there was an error sending your message. Please try again later.').show();
            }
        })
        .catch(error => {
            // Hide loading state
            $('#submitBtn').prop('disabled', false);
            $('#btnText').show();
            $('#btnSpinner').hide();

            // Show error message
            $('#formMessage').removeClass('alert-success').addClass('alert alert-danger').html('Sorry, there was an error sending your message. Please try again later.').show();
        });
    });

    // Lazy Loading for Images (Performance Optimization)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize lazy loading when DOM is ready
    $(document).ready(function() {
        lazyLoadImages();
    });

    // Pricing Toggle Functionality
    $(document).ready(function() {
        $('.pricing-toggle').on('click', function() {
            var plan = $(this).data('plan');
            
            // Update active button
            $('.pricing-toggle').removeClass('btn-primary').addClass('btn-outline-primary');
            $(this).removeClass('btn-outline-primary').addClass('btn-primary');
            
            // Hide all pricing sections
            $('.pricing-section').fadeOut(300, function() {
                $(this).css('display', 'none');
            });
            
            // Show selected pricing section
            setTimeout(function() {
                $('#pricing-' + plan).fadeIn(300).css('display', 'block');
            }, 300);
        });
    });

})(jQuery);

