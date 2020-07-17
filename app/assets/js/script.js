AOS.init();

var owl = $("#owl-one");
owl.owlCarousel({
  autoplay: true,
  loop: true,
  mouseDrag: true,
  margin: 0,
  smartSpeed: 1000,
  dots: false,
  nav: false,
  slideBy: 4,
  items: 4,
  responsiveClass: true,
  responsive: {
    0: {
      items: 2,
    },
    600: {
      items: 3,
      autoplay: true,
    },
    768: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
});

var owl = $(".owl-carousel");
owl.owlCarousel({
  center: true,
  items: 2,
  dots: false,
  loop: true,
  nav: true,
  margin: 60,
  responsiveClass: true,
  responsive: {
    0: { items: 1, center: false },
    480: {
      items: 1,
      center: false,
    },
    1024: {
      items: 2,
    },
  },
});
$(".icon-right").click(function () {
  owl.trigger("next.owl.carousel", [1000]);
});

$(".icon-left").click(function () {
  owl.trigger("prev.owl.carousel", [1000]);
});
