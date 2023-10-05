const slides = [...document.querySelectorAll('.swiper-slide')];

let index=0;
slides[index].classList.add('swiper-visible');
setInterval(()=>{
  index++;
  if(index > slides.length-1) index=0;
  slides.forEach(slide=>slide.classList.remove('swiper-visible'));
  slides[index].classList.add('swiper-visible');
  // timer();
},5000);