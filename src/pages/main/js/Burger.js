const header = document.querySelector('header')
const main = document.querySelector('.main')
const burger = document.querySelector('.burger-js')
const nav = document.querySelector('.header__nav--js')
const navLinks = document.querySelectorAll('.header__nav-link')

// ====================== BURGER ====================== //
burger.addEventListener('click', (e) => {
  burger.classList.toggle('header__nav-burger--open')
  nav.classList.toggle('header__nav--open')
  main.classList.toggle('main--overlay')
  header.classList.toggle('header__bgc')
  removeOverlay()
})

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    document.querySelector(".header__nav-link--active").classList.remove("header__nav-link--active");
    burger.classList.remove('header__nav-burger--open')
    nav.classList.remove('header__nav--open')
    main.classList.remove('main--overlay')
    header.classList.remove('header__bgc')
    e.target.classList.add('header__nav-link--active')
  })
})

// ====================== REMOVE OVERLAY ====================== //
const removeOverlay = () => {
  if (main.classList.contains('main--overlay')) {
    window.addEventListener('click', (e) => {
      if (!e.target.closest('.header__nav') && !e.target.closest('.header__nav-burger')) {
        burger.classList.remove('header__nav-burger--open')
        nav.classList.remove('header__nav--open')
        main.classList.remove('main--overlay')
        header.classList.remove('header__bgc')
      }
      if (e.target.matches('.modal__btn-close') && !e.target.closest('.modal')) {
        // Close modal
        main.classList.remove('main--overlay')
      }
    })
  }
}