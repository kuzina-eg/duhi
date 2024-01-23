!function($){"use strict";if($(".header").length){var e=$(".header").outerHeight()+$(window).height()/2;$(window).on("scroll",(function(){$(window).scrollTop()>=e?$(".header__content").addClass("fixed"):$(".header__content").removeClass("fixed")}))}$(".a-toggle-nav").on("click",(function(){$("html").hasClass("menu-opened")?(setTimeout((function(){$("html").removeClass("menu-opened")}),400),$(".dropdown").removeClass("opened"),$(".dropdown__menu").slideUp()):$("html").addClass("menu-opened")})),$(".a-search-toggle").on("click",(function(){$(".search").toggle()})),$(".app__close").on("click",(function(){$(".app").hide()})),$(".dropdown__toggle").on("click",(function(e){if($(window).width()<1200)return $(this).closest(".dropdown").toggleClass("opened").find(".dropdown__menu").slideToggle(),!1})),$("body").on("click",(function(e){$(window).width()<1200?($(".dropdown").removeClass("opened"),$(".dropdown__menu").slideUp()):$(".dropdown").removeClass("opened")})),$(".dropdown__menu").click((function(e){})),$(".collapse__toggle").on("click",(function(){return $(window).width()>992&&$(window).width()<1200&&($(this).closest(".collapse").hasClass("opened")||$(this).hasClass("filter__header")&&($(".collapse__body").slideUp(),$(".collapse").removeClass("opened"))),$(this).closest(".collapse").toggleClass("opened").find(".collapse__body").first().slideToggle(),$(".filter").toggleClass("subfilter"),$(".dropdown").removeClass("opened"),$(".dropdown__menu").slideUp(),!1})),$(".filter__clear a").on("click",(function(){return $(this).parents(".filter__group").removeClass("active"),!1})),$(".collapse__toggle a:not(.clear)").on("click",(function(){return window.location=$(this).attr("href"),!1})),$(".filter__show-all a").on("click",(function(){return $(this).closest(".filter__box").toggleClass("all"),!1})),$(".tabs__link").on("click",(function(){var e=$(this).attr("data-tab");return e.length&&($(this).closest(".tabs").find(".tabs__item.active").removeClass("active"),$(this).closest(".tabs__item").addClass("active"),$(this).closest(".tabs").find(".tabs__pane.show").removeClass("show"),$("#"+e).addClass("show"),$(this).closest(".tabs").hasClass("brands__lang")&&($(".toggletext").html($(this).attr("data-lang")),$(".dropdown__menu").slideUp())),!1})),$(".a-material").length&&($(".a-material .form__control").each((function(){($(this).val().length>0||void 0!==$(this).attr("placeholder"))&&$(this).closest(".a-material").addClass("active")})),$(".a-material .form__control").focus((function(){$(this).closest(".a-material").addClass("active")})),$(".a-material .form__control").blur((function(){""==$(this).val()&&null==$(this).attr("placeholder")&&$(this).closest(".a-material").removeClass("active")})),$(".a-material .form__control").change((function(){""==$(this).val()&&null==$(this).attr("placeholder")?$(this).closest(".a-material").removeClass("active"):$(this).closest(".a-material").addClass("active")}))),$(".toggle-pass").on("click",(function(){let e=$(this),t=e.closest(".form__group").find(".form__control");e.hasClass("show")?(e.removeClass("show"),t.attr("type","password")):(e.addClass("show"),t.attr("type","text"))})),$(".a-check-all").on("change",(function(){$(this).is(":checked")?$(".check-all-group input[type=checkbox]").each((function(){$(this).attr("checked","checked")})):$(".check-all-group input[type=checkbox]").each((function(){$(this).removeAttr("checked")}))})),$(".push .form__control").keydown((function(e){$(this).val("")})),$(".push .form__control").keyup((function(e){let t=$(".push"),i=t.find(".form__control"),a=$(this).val();if(a==a.replace(/[0-9]/,""))return $(this).val(""),!1;i.eq(i.index(this)+1).focus();var s="";i.each((function(){s+=parseInt($(this).val())||"0"})),t.find('input[type="hidden"]').val(s)}));let t={},i=$(".add-testimonial__form"),a=$("#uploadImagesList"),s=a.find(".add-testimonial__photo.template").clone();function o(e){let i=new FileReader;i.addEventListener("load",(function(i){document.createElement("img");let o=s.clone();o.find(".add-testimonial__img img").attr("src",i.target.result),o.data("id",e.name),a.append(o),t[e.name]=e})),i.readAsDataURL(e)}s.removeClass("template"),a.find(".add-testimonial__photo.template").remove(),$("#addImages").on("change",(function(){let e=this.files;for(let t=0;t<e.length;t++){let i=e[t];i.type.match(/image\/(jpeg|jpg|png|gif)/)?i.size>2097152?alert("Размер фотографии не должен превышать 2 Мб"):o(e[t]):alert("Фотография должна быть в формате jpg, png или gif")}this.value="",$(this).attr("multiple")||$(this).closest(".add-testimonial__btn").hide()})),a.on("click",".add-testimonial__remove",(function(){let e=$(this).closest(".add-testimonial__photo"),i=e.data("id");delete t[i],e.remove(),$(".add-testimonial__btn").show()})),i.on("submit",(function(e){let i=new FormData(this);for(let e in t)i.append("images[]",t[e]);return $.ajax({url:$(this).attr("action"),type:"POST",data:i,async:!0,success:function(e){alert(e)},cache:!1,contentType:!1,processData:!1}),!1})),$(".a-add-new-list").on("click",(function(){$(this).hide(),$(".add-new-list__form").show()})),$(".a-hide-new-list").on("click",(function(){$(".a-add-new-list").show(),$(".add-new-list__form").hide()})),$(".abc__link").on("click",(function(){return $(this).parent().toggleClass("active"),!1})),$(".switch__toggler").on("click",(function(){$(this).toggleClass("active")})),$(".add-to-favorite, .add-to-wait").on("click",(function(){$(this).toggleClass("active")})),$(".add-to-cart").on("click",(function(){$(".header__cart").addClass("visible"),$(this).toggleClass("active")})),$(".add-to-cart-btn").on("click",(function(){})),$(".header__cart-footer [data-fancybox-close]").on("click",(function(){$(".header__cart").removeClass("visible")})),$(".item-feedback .btn-rounded").on("click",(function(){$(this).hasClass("active")?$(this).removeClass("active"):($(this).closest(".item-feedback").find(".active").removeClass("active"),$(this).addClass("active"))})),Fancybox.bind("[data-fancybox]",{Thumbs:!1,placeFocusBack:!1,Toolbar:!1}),$(".modal [data-fancybox]").on("click",(function(){Fancybox.close()}));new Swiper(".a-carousel-brands",{slidesPerView:"5",spaceBetween:20,watchSlidesProgress:!0,speed:900,pagination:{el:".swiper-pagination",clickable:!0},navigation:{prevEl:".btn-prev",nextEl:".btn-next"},breakpoints:{1600:{slidesPerView:"6"}}}),new Swiper(".a-carousel-promo",{slidesPerView:"1",spaceBetween:20,watchSlidesProgress:!0,speed:900,pagination:{el:".swiper-pagination",clickable:!0}}),new Swiper(".a-carousel-product",{slidesPerView:"2",spaceBetween:20,watchSlidesProgress:!0,freeMode:!0,speed:900,pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{768:{slidesPerView:"2",spaceBetween:22,freeMode:!0},992:{slidesPerView:"3",spaceBetween:30,freeMode:!1},1200:{slidesPerView:"5",spaceBetween:30,freeMode:!1},1600:{slidesPerView:"6",spaceBetween:20,freeMode:!1}}}),new Swiper(".a-carousel-sale",{slidesPerView:"auto",spaceBetween:20,watchSlidesProgress:!0,freeMode:!0,speed:900,pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{992:{slidesPerView:2,grid:{rows:2},spaceBetween:20,freeMode:!1},1200:{slidesPerView:"4",grid:!1,spaceBetween:20,freeMode:!1}}}),new Swiper(".a-carousel-review",{slidesPerView:"auto",spaceBetween:20,watchSlidesProgress:!0,freeMode:!0,speed:900,navigation:{prevEl:".btn-prev",nextEl:".btn-next"},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{992:{slidesPerView:"2",freeMode:!1},1200:{slidesPerView:"3",freeMode:!1},1600:{slidesPerView:"3",freeMode:!1}}}),new Swiper(".a-carousel-article",{slidesPerView:"auto",spaceBetween:20,watchSlidesProgress:!0,freeMode:!0,speed:900,navigation:{prevEl:".btn-prev",nextEl:".btn-next"},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{992:{slidesPerView:"2",freeMode:!1,pagination:!1},1600:{slidesPerView:"3",freeMode:!1,pagination:!1}}}),new Swiper(".a-carousel-article-full",{slidesPerView:"auto",spaceBetween:20,watchSlidesProgress:!0,freeMode:!0,speed:900,navigation:{prevEl:".btn-prev",nextEl:".btn-next"},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{992:{slidesPerView:"2",freeMode:!1,pagination:!1},1200:{slidesPerView:"3",freeMode:!1,pagination:!1},1600:{slidesPerView:"4",freeMode:!1,pagination:!1}}});const n=window.matchMedia("(min-width:1200px)");document.querySelectorAll(".a-carousel-article-side").forEach((function(e){let t;const i=function(){if(!0!==n.matches)return!1===n.matches?a():void 0;void 0!==t&&t.destroy(!0,!0)},a=function(){t=new Swiper(e,{slidesPerView:"auto",spaceBetween:20,watchSlidesProgress:!0,freeMode:!0,speed:900,a11y:!0,navigation:{prevEl:".btn-prev",nextEl:".btn-next"},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{992:{slidesPerView:"2",freeMode:!1,pagination:!1}}})};n.addListener(i),i()}));const l=window.matchMedia("(max-width:992px)");document.querySelectorAll(".a-carousel-testimonial-user").forEach((function(e){let t;const i=function(){if(!0!==l.matches)return!1===l.matches?a():void 0;void 0!==t&&t.destroy(!0,!0)},a=function(){t=new Swiper(e,{speed:900,slidesPerView:"2",spaceBetween:20,watchSlidesProgress:!0,a11y:!0,navigation:{prevEl:".btn-prev",nextEl:".btn-next"},breakpoints:{1200:{slidesPerView:"3"}}})};l.addListener(i),i()}));new Swiper(".a-carousel-review-user",{slidesPerView:"auto",spaceBetween:5,watchSlidesProgress:!0,freeMode:!0,speed:900,navigation:{prevEl:".btn-prev",nextEl:".btn-next"},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{480:{spaceBetween:10},992:{freeMode:!1,slidesPerView:"5"},1200:{slidesPerView:"8",spaceBetween:10,freeMode:!1},1600:{slidesPerView:"8",spaceBetween:0,freeMode:!1}}});let r=new Swiper(".a-photo-thumbs",{spaceBetween:"20",slidesPerView:"5",observer:!0,observeParents:!0,watchSlidesProgress:!0,direction:"vertical",navigation:{prevEl:".btn-prev",nextEl:".btn-next"},breakpoints:{1200:{slidesPerView:"6",spaceBetween:"14"}}}),c=new Swiper(".a-photo-main",{spaceBetween:10,observer:!0,observeParents:!0,watchSlidesProgress:!0,pagination:{el:".product__pagination",clickable:!0},thumbs:{swiper:r}});$(".a-photo-thumbs .swiper-slide").on("click",(function(){$(this).hasClass("swiper-slide-active")?r.slidePrev():r.slideNext()})),c.on("slideChange",(function(){$(".a-photo-main video").each((function(){$(this).get(0).play&&$(this).get(0).pause()}))}));let d=new Swiper(".a-set-photo-thumbs",{spaceBetween:"20",slidesPerView:"3",observer:!0,observeParents:!0,watchSlidesProgress:!0,direction:"vertical",navigation:{prevEl:".btn-prev",nextEl:".btn-next"},breakpoints:{1200:{spaceBetween:"10"}}}),p=new Swiper(".a-set-photo-main",{spaceBetween:10,observer:!0,observeParents:!0,watchSlidesProgress:!0,pagination:{el:".product__pagination",clickable:!0},thumbs:{swiper:d}});$(".a-set-photo-thumbs .swiper-slide").on("click",(function(){$(this).hasClass("swiper-slide-active")?d.slidePrev():d.slideNext()})),p.on("slideChange",(function(){$(".a-set-photo-main video").each((function(){$(this).get(0).play&&$(this).get(0).pause()}))})),function(e){let t;if(e?e instanceof Node&&(t=e.querySelectorAll("[data-tooltip]")):t=document.querySelectorAll("[data-tooltip]"),t.length){const e=e=>{e.setAttribute("data-tooltip-init","");let t=e.getAttribute("title")||e.getAttribute("data-tooltip-content")||"",i=e.getAttribute("data-tooltip-trigger")||"focus";t&&tippy(e,{content:e.getAttribute("title")||e.getAttribute("data-tooltip-content")||"",allowHTML:!0,trigger:i,placement:"top",maxWidth:300,animation:"shift-toward",offset:[0,14],onShow(t){e.classList.add("active")},onHide(t){e.classList.remove("active")}})};for(let i=0;i<t.length;i++){const a=t[i];a.hasAttribute("data-tooltip-init")||e(a)}}}()}($);