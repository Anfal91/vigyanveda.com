(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
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


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });
    
})(jQuery);

$(document).ready(function(){
    $(".testimonial .indicators li").click(function(){
      var i = $(this).index();
      var targetElement = $(".testimonial .tabs li");
      targetElement.eq(i).addClass('active');
      targetElement.not(targetElement[i]).removeClass('active');
              });
              $(".testimonial .tabs li").click(function(){
                  var targetElement = $(".testimonial .tabs li");
                  targetElement.addClass('active');
                  targetElement.not($(this)).removeClass('active');
              });
          });
  $(document).ready(function(){
      $(".slider .swiper-pagination span").each(function(i){
          $(this).text(i+1).prepend("0");
      });
  });


  jQuery(document).ready(function ($) {

    $(function(){
      setInterval(function () {
          moveRight();
      }, 2000);
    });
    
      var slideCount = $('#slider ul li').length;
      var slideWidth = $('#slider ul li').width();
      var slideHeight = $('#slider ul li').height();
      var sliderUlWidth = slideCount * slideWidth;
      
    //   $('#slider').css({ width: slideWidth, height: slideHeight });
      
      $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
      
      $('#slider ul li:last-child').prependTo('#slider ul');
  
      function moveLeft() {
          $('#slider ul').animate({
              left: + slideWidth
          }, 200, function () {
              $('#slider ul li:last-child').prependTo('#slider ul');
              $('#slider ul').css('left', '');
          });
      };
  
      function moveRight() {
          $('#slider ul').animate({
              left: - slideWidth
          }, 200, function () {
              $('#slider ul li:first-child').appendTo('#slider ul');
              $('#slider ul').css('left', '');
          });
      };
  
      $('button.control_prev').click(function () {
          moveLeft();
      });
  
      $('button.control_next').click(function () {
          moveRight();
      });
  
  });    



let product1 = document.getElementById('product1');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop =() => {
    return (product1.innerHTML= kitItemData.map((x)=>{
        let {id, name, realPrice, price, Image, link} = x;
        let search= basket.find(()=>x.id === id) || []
        return `
        <div id=product-id-${id} class="col-lg-4 col-md-4 col-sm-6 pb-1">
        <div class="product-item bg-light mb-4">
        <div class="product-img position-relative overflow-hidden">
            <img class="img-fluid w-100" src="${Image}" alt="">
            <div class="product-action">
                <button id=${id} onclick="increment(${id})" class="btn btn-outline-dark btn-square"><i class="fa fa-shopping-cart"></i></button>
                <a class="btn btn-outline-dark btn-square" href="${link}"><i class="fa fa-eye"></i></a>
            </div>
        </div>
        <div class="text-center py-4">
            <a class="h6 text-decoration-none text-truncate" href="">${name}</a>
            <div class="d-flex align-items-center justify-content-center mt-2">
                <h5>$${price}.00</h5><h6 class="text-muted ml-2"><del>$${realPrice}.00</del></h6>
            </div>
            <div class="d-flex align-items-center justify-content-center mb-1">
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small>(99)</small>
            </div>
        </div>
    </div>
</div>
        `;
    })
    .join(""));
};
generateShop();

let increment = (id)=> {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id)

    if(search === undefined){
        basket.push({
            id:selectedItem.id,
            item: 1
        });
    }
    else{
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    // console.log(basket);
    update(selectedItem.id);
};

let update = (id) =>{
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    calculation();
};

let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
    
    let cartIcon2 = document.getElementById("cartAmount2");
    cartIcon2.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
};
calculation();
// let cartCount = document.getElementById('cartCount');

// generateCountCart = () =>{
//     return cartCount.innerHTML =
//     `
//     <a href="" style="color:white;" class="btn px-0 ml-3">
//     <i class="fas fa-shopping-cart text-primary"></i>
//     <span id=${kitItemData.id} class="badge text-secondary border border-secondary rounded-circle" style="padding-bottom: 2px;">0</span>
//     </a>
//     `
// };

// generateCountCart();
// let cartCount = document.getElementById('cartCount') 

// let generateCart = ()=> {
//     cartCount.id = ($(x.id));
// }

// generateCart();