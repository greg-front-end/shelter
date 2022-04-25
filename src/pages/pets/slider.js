import { petsData } from '../../assets/data/petsData'
import PetCard from '../../assets/js/Cards'
import { generateRandomCards, generateNextRandomCards } from '../../assets/js/generateCards'
function slider({ slide, pageActive, firstPageArrow, lastPageArrow, nextArrow, prevArrow, wrapper, inner, laptop = 6, desctop = 8, mobile = 3 } = {}) {
  const pets8x2 = [
    [...petsData],
    [...petsData.slice(1), ...petsData.slice(0, 1)],
    [...petsData.slice(2), ...petsData.slice(0, 2)],
    [...petsData.slice(3), ...petsData.slice(0, 3)],
    [...petsData.slice(4), ...petsData.slice(0, 4)],
    [...petsData.slice(5), ...petsData.slice(0, 5)],
  ]
  const pets6x2 = []
  const pets3x1 = []
  const colOfPets = pets8x2[0].length
  for (let c = 0; c < colOfPets; c++) {
    let newArr = []
    for (let r = 0; r < pets8x2.length; r++) {
      newArr.push(pets8x2[r][c])
    }
    pets6x2.push(newArr)
    newArr = []
  }
  for (let c = 0; c < colOfPets; c++) {
    let newArr = []
    for (let r = 0; r < pets8x2.length; r++) {
      newArr.push(pets8x2[r][c])
    }
    pets3x1.push(...[newArr.slice(0, 3)], ...[newArr.slice(3)])
    newArr = []
  }

  Array.prototype.shuffleCardArray = function () {
    for (let i = this.length - 1; i > 0; i--) {
      let num = Math.floor(Math.random() * (i + 1));
      let tmp = this[num];
      this[num] = this[i];
      this[i] = tmp;
    }
    return this;
  }

  const chekcScreenSize = () => {
    let len = laptop
    if (window.screen.width >= 1280) {
      len = desctop
    } else if (window.screen.width < 768) {
      len = mobile
    }
    return len
  }
  let size = chekcScreenSize();
  let page = 1
  let totalPage = 48 / size

  const prevBtn = document.querySelector(prevArrow),
    nextBtn = document.querySelector(nextArrow),
    sliderInner = document.querySelector(inner),
    pageNumber = document.querySelector(pageActive),
    lastPageBtn = document.querySelector(lastPageArrow),
    firstPageBtn = document.querySelector(firstPageArrow),
    itemLeft = document.querySelector('.slider__item-left'),
    itemRight = document.querySelector('.slider__item-right'),
    itemVisible = document.querySelector('.slider__item-visible');


  window.addEventListener('load', () => {
    size = chekcScreenSize()
    if (size === 8) {
      pets8x2.map((pet) => pet.shuffleCardArray())
      pets8x2[0].forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())
    } else if (size === 6) {
      pets6x2.map((pet) => pet.shuffleCardArray())
      pets6x2[0].forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())
    } else {
      pets3x1.map((pet) => pet.shuffleCardArray())
      pets3x1[0].forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())
    }
  })
  window.addEventListener('resize', () => {
    size = chekcScreenSize()
    totalPage = 48 / size

    if (size === 8) {
      setTimeout(() => {
        itemVisible.innerHTML = ''
        pets8x2[0].forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())
      })
    } else if (size === 6) {
      setTimeout(() => {
        itemVisible.innerHTML = ''
        pets6x2[0].forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())
      })
    } else {
      setTimeout(() => {
        itemVisible.innerHTML = ''
        pets3x1[0].forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())
      })
    }
  })

  const toggleDisableLeftBtns = () => {
    if (page < 2) {
      firstPageBtn.classList.add('pagin__btn--inactive')
      prevBtn.classList.add('pagin__btn--inactive')
      firstPageBtn.disabled = true
      prevBtn.disabled = true
      lastPageBtn.classList.remove('pagin__btn--inactive')
      nextBtn.classList.remove('pagin__btn--inactive')
      lastPageBtn.disabled = false
      nextBtn.disabled = false
      page = 1
    }
    if (page > 2 && page < totalPage) {
      lastPageBtn.classList.remove('pagin__btn--inactive')
      nextBtn.classList.remove('pagin__btn--inactive')
      lastPageBtn.disabled = false
      nextBtn.disabled = false
    }
  }
  const toggleDisableRightBtns = () => {
    if (page > 1) {
      firstPageBtn.classList.remove('pagin__btn--inactive')
      prevBtn.classList.remove('pagin__btn--inactive')
      firstPageBtn.disabled = false
      prevBtn.disabled = false
    }
    if (page === totalPage) {
      lastPageBtn.classList.add('pagin__btn--inactive')
      nextBtn.classList.add('pagin__btn--inactive')
      lastPageBtn.disabled = true
      nextBtn.disabled = true
    }
  }
  const moveLeft = (e) => {
    sliderInner.classList.add("slider--transition-left");
    prevBtn.classList.add('arrow-btns__left--disable')
    prevBtn.removeEventListener("click", moveLeft);
    nextBtn.removeEventListener("click", moveRight);
    setTimeout(() => {
      itemLeft.innerHTML = '';
      if (size === 8) {
        pets8x2[page].forEach(obj => new PetCard('.slider__item-left', obj).renderCard())
      } else if (size === 6) {
        pets6x2[page].forEach(obj => new PetCard('.slider__item-left', obj).renderCard())
      } else {
        pets3x1[page].forEach(obj => new PetCard('.slider__item-left', obj).renderCard())
      }
      pageNumber.textContent = page
    })
    --page
    setTimeout(() => {
      itemVisible.innerHTML = itemLeft.innerHTML
      itemLeft.innerHTML = ''
      sliderInner.classList.remove("slider--transition-left");
      prevBtn.classList.remove('arrow-btns__left--disable')
      toggleDisableLeftBtns()
      prevBtn.addEventListener("click", moveLeft);
      nextBtn.addEventListener("click", moveRight);
    }, 1000)
  };
  const moveRight = (e) => {
    sliderInner.classList.add("slider--transition-right");
    nextBtn.classList.add('arrow-btns__right--disable')
    nextBtn.removeEventListener("click", moveLeft);
    nextBtn.removeEventListener("click", moveRight);
    setTimeout(() => {
      itemRight.innerHTML = '';
      if (size === 8) {
        pets8x2[page - 1].forEach(obj => new PetCard('.slider__item-right', obj).renderCard())
      } else if (size === 6) {
        pets6x2[page - 1].forEach(obj => new PetCard('.slider__item-right', obj).renderCard())
      } else {
        pets3x1[page - 1].forEach(obj => new PetCard('.slider__item-right', obj).renderCard())
      }
      pageNumber.textContent = page
    })
    ++page
    setTimeout(() => {
      toggleDisableRightBtns()
      itemVisible.innerHTML = itemRight.innerHTML
      itemRight.innerHTML = ''
      sliderInner.classList.remove("slider--transition-right");
      nextBtn.classList.remove('arrow-btns__right--disable')

      prevBtn.addEventListener("click", moveLeft);
      nextBtn.addEventListener("click", moveRight);
    }, 1000)
  };
  const moveToEnd = () => {
    sliderInner.classList.add("slider--transition-right");
    nextBtn.classList.add('arrow-btns__right--disable')
    nextBtn.removeEventListener("click", moveLeft);
    nextBtn.removeEventListener("click", moveRight);
    setTimeout(() => {
      itemRight.innerHTML = '';
      if (size === 8) {
        pets8x2[totalPage - 1].forEach(obj => new PetCard('.slider__item-right', obj).renderCard())
      } else if (size === 6) {
        pets6x2[totalPage - 1].forEach(obj => new PetCard('.slider__item-right', obj).renderCard())
      } else {
        pets3x1[totalPage - 1].forEach(obj => new PetCard('.slider__item-right', obj).renderCard())
      }
      pageNumber.textContent = totalPage
      page = totalPage
    })
    setTimeout(() => {
      toggleDisableRightBtns()
      itemVisible.innerHTML = itemRight.innerHTML
      itemRight.innerHTML = ''
      sliderInner.classList.remove("slider--transition-right");
      nextBtn.classList.remove('arrow-btns__right--disable')
      toggleDisableRightBtns()
      prevBtn.addEventListener("click", moveLeft);
      nextBtn.addEventListener("click", moveRight);
    }, 1000)
  }
  const moveToFirst = () => {
    sliderInner.classList.add("slider--transition-left");
    prevBtn.classList.add('arrow-btns__left--disable')
    prevBtn.removeEventListener("click", moveLeft);
    nextBtn.removeEventListener("click", moveRight);
    setTimeout(() => {
      itemLeft.innerHTML = '';
      if (size === 8) {
        pets8x2[0].forEach(obj => new PetCard('.slider__item-left', obj).renderCard())
      } else if (size === 6) {
        pets6x2[0].forEach(obj => new PetCard('.slider__item-left', obj).renderCard())
      } else {
        pets3x1[0].forEach(obj => new PetCard('.slider__item-left', obj).renderCard())
      }
      pageNumber.textContent = 1
    })
    page = 1
    setTimeout(() => {
      itemVisible.innerHTML = itemLeft.innerHTML
      itemLeft.innerHTML = ''
      sliderInner.classList.remove("slider--transition-left");
      prevBtn.classList.remove('arrow-btns__left--disable')
      toggleDisableLeftBtns()
      prevBtn.addEventListener("click", moveLeft);
      nextBtn.addEventListener("click", moveRight);
    }, 1000)
  }
  prevBtn.addEventListener("click", moveLeft);
  nextBtn.addEventListener("click", moveRight);
  lastPageBtn.addEventListener('click', moveToEnd)
  firstPageBtn.addEventListener('click', moveToFirst)
}

slider({
  slide: '.slider__item',
  firstPageArrow: '.pagin__btn-first-page',
  nextArrow: '.pagin__btn-next',
  pageActive: '.pagin__btn--active',
  lastPageArrow: '.pagin__btn-last-page',
  prevArrow: '.pagin__btn-prev',
  wrapper: '.slider',
  inner: '.slider__inner',
  laptop: 6,
  desctop: 8,
  mobile: 3
});