
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

for (let i = 0; i < 3; i++) {
    carouselChildrens.forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });
}

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);



//boton modo luz nocturno
const body = document.querySelector('body');
const btn = document.querySelector('.btn');
const icon = document.querySelector('.btn__icon');


function store(value){
  localStorage.setItem('darkmode', value);
}

function load(){
  const darkmode = localStorage.getItem('darkmode');

  if(!darkmode){
    store(false);
    icon.classList.add('fa-sun');
  } else if( darkmode == 'true'){
    body.classList.add('darkmode');
    icon.classList.add('fa-moon');
  } else if(darkmode == 'false'){
    icon.classList.add('fa-sun');
  }
}


load();

btn.addEventListener('click', () => {

  body.classList.toggle('darkmode');
  icon.classList.add('animated');

  //save true or false
  store(body.classList.contains('darkmode'));

  if(body.classList.contains('darkmode')){
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }else{
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  setTimeout( () => {
    icon.classList.remove('animated');
  }, 500)
})


//boton volver arriba
window.onscroll = function(){
  console.log(document.documentElement.scrollTop);
  if(document.documentElement.scrollTop > 100) {
    document.querySelector('.go-top-container').classList.add('show');
     
  }
  else{
    document.querySelector('.go-top-container').classList.remove('show');
  }
}
 
document.querySelector('.go-top-container').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


//pantalla de carga
window.addEventListener('load', function() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none'; // Oculta la pantalla de carga
});


//slogan
const text = document.querySelector(".sec-text");
        const textLoad = () => {
            setTimeout(() => {
                text.textContent = "queso";
            }, 0);
            setTimeout(() => {
                text.textContent = "pete";
            }, 4000);
            setTimeout(() => {
                text.textContent = "oña";
            }, 8000); //1s = 1000 milliseconds
        }
        textLoad();
        setInterval(textLoad, 12000);