const body = document.querySelector('body')
const header = document.querySelector('header')
const overlay = document.querySelector('.overlay')
const burger = document.querySelector('.burger-js')
const nav = document.querySelector('.header__nav--js')
const navLinks = document.querySelectorAll('.header__nav-link')

// ====================== BURGER ====================== //
burger.addEventListener('click', (e) => {
  burger.classList.toggle('header__nav-burger--open')
  nav.classList.toggle('header__nav--open')
  overlay.classList.toggle('overlay--active')
  header.classList.toggle('header__bgc')
  body.classList.toggle('body--hidden')
  removeOverlay()
})

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    document.querySelector(".header__nav-link--active").classList.remove("header__nav-link--active");
    burger.classList.remove('header__nav-burger--open')
    nav.classList.remove('header__nav--open')
    overlay.classList.remove('overlay--active')
    header.classList.remove('header__bgc')
    body.classList.remove('body--hidden')
    e.target.classList.add('header__nav-link--active')
  })
})

// ====================== REMOVE OVERLAY ====================== //
const removeOverlay = (e) => {
  if (overlay.classList.contains('overlay--active')) {
    window.addEventListener('click', (e) => {
      if (!e.target.closest('.header__nav') && !e.target.closest('.header__nav-burger')) {
        burger.classList.remove('header__nav-burger--open')
        nav.classList.remove('header__nav--open')
        overlay.classList.remove('overlay--active')
        header.classList.remove('header__bgc')
        body.classList.remove('body--hidden')
      }
    })
  }
}