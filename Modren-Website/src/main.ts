import './CSS/style.css'
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function runApp(){

  const currentYear: number = new Date().getFullYear();
  const copyRightText: string = `&copy; Area ${currentYear}`;
  const copy = document.getElementById('copy') as HTMLElement;
  if (copy) {
    copy.innerHTML = copyRightText;
  }
  

  new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    direction: 'horizontal', 
    loop: true,
    spaceBetween: 24, 

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  }); 


  new Swiper('.benefits-swiper', {
    modules: [Navigation, Pagination],
    direction: 'horizontal', 
    loop: true,
    spaceBetween: 24, 

    pagination: {
      el: '.benefits-swiper .swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.benefits-swiper .swiper-button-next',
      prevEl: '.benefits-swiper .swiper-button-prev',
    },

    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 } 
    }
  });


  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      menuBtn.classList.toggle('active');
    });
  }


  const imgContainer = document.getElementById('img-container') as HTMLElement;

  if (imgContainer) {
    let speed = 1;

    function autoScroll() {
      if (!imgContainer) return; 
      imgContainer.scrollLeft += speed;

      if (imgContainer.scrollLeft >= imgContainer.scrollWidth - imgContainer.clientWidth) {
        imgContainer.scrollLeft = 0;
      }
      requestAnimationFrame(autoScroll);
    }

    autoScroll();

    imgContainer.addEventListener("wheel", (e) => {
      try {
        e.preventDefault();
        imgContainer.scrollLeft += e.deltaY;    
      } catch (error) {
        console.log("Wheel Error:", error);
      }
    }, { passive: false });
  }


  const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } 
    })
  }, {
    rootMargin: '0px 0px 150px 0px'
  });

  const sectionFading = document.querySelectorAll('.section-fading');
  const listItemsFading = document.querySelectorAll('.custom-list li');

  listItemsFading.forEach(element => observer.observe(element as HTMLElement));
  sectionFading.forEach(element => observer.observe(element as HTMLElement));

  const Message = document.getElementById('message') as HTMLElement;
  const showMessage = document.querySelectorAll('#showMessage') as NodeListOf<HTMLButtonElement>;
  const closeMessage = document.querySelector('#closeMessage') as HTMLButtonElement;

  showMessage.forEach(button => {
    button.addEventListener('click', () => {
      Message.classList.add('show');
    });
  });

  closeMessage.addEventListener('click', () => {
    Message.classList.remove('show');
  });
  

  interface FormMessage {
    name: string;
    email: string;
   message: string;
  }

  const FullName = document.getElementById('fullName') as HTMLInputElement;
  const inputEmail = document.getElementById('email') as HTMLInputElement;
  const inputMessage = document.getElementById('messageBox') as HTMLInputElement;
  const form = document.getElementById('form') as HTMLFormElement;

  let addedIndex: number = -1;

  const addedList: FormMessage[] = JSON.parse(localStorage.getItem('userMessages') || '[]');
  if(form){
  form.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const formElement: FormMessage = {
    name: FullName.value,
    email: inputEmail.value,
    message: inputMessage.value
  };

  if (addedIndex === -1) {
    addedList.push(formElement);
  } else {
    addedList[addedIndex] = formElement;
    addedIndex = -1; 
  }

  localStorage.setItem('userMessages', JSON.stringify(addedList));

  form.reset();
  });

}
}

window.addEventListener('DOMContentLoaded', () => {
  runApp();
});