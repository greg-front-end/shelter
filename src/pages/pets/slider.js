import { petsData } from '../../assets/data/petsData'
import PetCard from '../../assets/js/Cards'
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
    this.sort((a, b) => 0.5 - Math.random());
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
  let page = 0
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
  // window.addEventListener('resize', () => {
  //   size = chekcScreenSize()
  //   if (size === 8) {
  //     setTimeout(() => {
  //       itemVisible.innerHTML = ''
  //       location.reload();
  //       pageNumber.textContent = 1
  //       page = 0
  //       toggleDisableLeftBtns()
  //     })
  //   } else if (size === 6) {
  //     setTimeout(() => {
  //       itemVisible.innerHTML = ''
  //       pageNumber.textContent = 1
  //       page = 0
  //       toggleDisableLeftBtns()
  //     })
  //   } else if (size === 3) {
  //     setTimeout(() => {
  //       itemVisible.innerHTML = ''
  //       pageNumber.textContent = 1
  //       page = 0
  //       toggleDisableLeftBtns()
  //     })
  //   }
  // })

  const toggleDisableLeftBtns = () => {
    if (page < 1) {
      firstPageBtn.classList.add('pagin__btn--inactive')
      prevBtn.classList.add('pagin__btn--inactive')
      firstPageBtn.disabled = true
      prevBtn.disabled = true
      lastPageBtn.classList.remove('pagin__btn--inactive')
      nextBtn.classList.remove('pagin__btn--inactive')
      lastPageBtn.disabled = false
      nextBtn.disabled = false
    }
    if (page > 0 && page < totalPage - 1) {
      lastPageBtn.classList.remove('pagin__btn--inactive')
      nextBtn.classList.remove('pagin__btn--inactive')
      lastPageBtn.disabled = false
      nextBtn.disabled = false
    }
  }
  const toggleDisableRightBtns = () => {
    if (page > 0) {
      firstPageBtn.classList.remove('pagin__btn--inactive')
      prevBtn.classList.remove('pagin__btn--inactive')
      firstPageBtn.disabled = false
      prevBtn.disabled = false
    }
    if (page === totalPage - 1) {
      lastPageBtn.classList.add('pagin__btn--inactive')
      nextBtn.classList.add('pagin__btn--inactive')
      lastPageBtn.disabled = true
      nextBtn.disabled = true
    }
  }
  const removeBtnsClasses = () => {
    prevBtn.classList.remove('arrow-btns__left--disable')
    nextBtn.classList.remove('arrow-btns__right--disable')
    lastPageBtn.classList.remove('arrow-btns__right--disable')
    firstPageBtn.classList.remove('arrow-btns__left--disable')
  }
  const addBtnClasses = () => {
    prevBtn.classList.add('arrow-btns__left--disable')
    nextBtn.classList.add('arrow-btns__right--disable')
    lastPageBtn.classList.add('arrow-btns__right--disable')
    firstPageBtn.classList.add('arrow-btns__left--disable')
  }
  const removeBtnListeneres = () => {
    prevBtn.removeEventListener("click", moveLeft);
    nextBtn.removeEventListener("click", moveRight);
    lastPageBtn.removeEventListener('click', moveToEnd)
    firstPageBtn.removeEventListener('click', moveToFirst)
  }
  const addBtnListeneres = () => {
    prevBtn.addEventListener("click", moveLeft);
    nextBtn.addEventListener("click", moveRight);
    lastPageBtn.addEventListener('click', moveToEnd)
    firstPageBtn.addEventListener('click', moveToFirst)
  }
  const moveLeft = () => {
    sliderInner.classList.add("slider--transition-left");
    addBtnClasses()
    removeBtnListeneres()
    setTimeout(() => {
      --page
      itemLeft.innerHTML = '';
      if (size === 8) {
        pets8x2[page].forEach(obj => new PetCard('.slider__item-left', obj).renderCard())
      } else if (size === 6) {
        pets6x2[page].forEach(obj => new PetCard('.slider__item-left', obj).renderCard())
      } else {
        pets3x1[page].forEach(obj => new PetCard('.slider__item-left', obj).renderCard())
      }
      pageNumber.textContent = page + 1
    })
    setTimeout(() => {
      itemVisible.innerHTML = itemLeft.innerHTML
      itemLeft.innerHTML = ''
      toggleDisableLeftBtns()
      removeBtnsClasses()
      addBtnListeneres()
      sliderInner.classList.remove("slider--transition-left");
    }, 1000)
  };
  const moveRight = () => {
    sliderInner.classList.add("slider--transition-right");
    addBtnClasses()
    removeBtnListeneres()
    setTimeout(() => {
      itemRight.innerHTML = '';
      ++page
      if (size === 8) {
        pets8x2[page].forEach(obj => new PetCard('.slider__item-right', obj).renderCard())
      } else if (size === 6) {
        pets6x2[page].forEach(obj => new PetCard('.slider__item-right', obj).renderCard())
      } else {
        pets3x1[page].forEach(obj => new PetCard('.slider__item-right', obj).renderCard())
      }
      pageNumber.textContent = page + 1
    })
    setTimeout(() => {
      itemVisible.innerHTML = itemRight.innerHTML
      itemRight.innerHTML = ''
      toggleDisableRightBtns()
      removeBtnsClasses()
      addBtnListeneres()
      sliderInner.classList.remove("slider--transition-right");
    }, 1000)
  };
  const moveToEnd = () => {
    sliderInner.classList.add("slider--transition-right");
    addBtnClasses()
    removeBtnListeneres()
    setTimeout(() => {
      itemRight.innerHTML = '';
      if (size === 8) {
        pets8x2[pets8x2.length - 1].forEach(obj => new PetCard('.slider__item-right', obj).renderCard())
        page = pets8x2.length - 1
        pageNumber.textContent = totalPage
      } else if (size === 6) {
        pets6x2[pets6x2.length - 1].forEach(obj => new PetCard('.slider__item-right', obj).renderCard())
        page = pets6x2.length - 1
        pageNumber.textContent = totalPage
      } else {
        pets3x1[pets3x1.length - 1].forEach(obj => new PetCard('.slider__item-right', obj).renderCard())
        page = pets3x1.length - 1
        pageNumber.textContent = totalPage
      }
    })
    setTimeout(() => {
      itemVisible.innerHTML = itemRight.innerHTML
      itemRight.innerHTML = ''
      toggleDisableRightBtns()
      removeBtnsClasses()
      addBtnListeneres()
      sliderInner.classList.remove("slider--transition-right");
    }, 1000)
  }
  const moveToFirst = () => {
    sliderInner.classList.add("slider--transition-left");
    addBtnClasses()
    removeBtnListeneres()
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
      page = 0
    })
    setTimeout(() => {
      itemVisible.innerHTML = itemLeft.innerHTML
      itemLeft.innerHTML = ''
      toggleDisableLeftBtns()
      removeBtnsClasses()
      addBtnListeneres()
      sliderInner.classList.remove("slider--transition-left");
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