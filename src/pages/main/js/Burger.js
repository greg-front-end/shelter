const main = document.querySelector('.main')
const burger = document.querySelector('.burger-js')
const nav = document.querySelector('.header__nav--js')
const navLinks = document.querySelectorAll('.header__nav-link')

burger.addEventListener('click', (e) => {
  burger.classList.toggle('header__nav-burger--open')
  nav.classList.toggle('header__nav--open')
  main.classList.toggle('main--overlay')
})
main.addEventListener('click', (e) => {
  if (main.classList.contains('main--overlay') && e.target.classList.contains('main--overlay')) {
    burger.classList.remove('header__nav-burger--open')
    nav.classList.remove('header__nav--open')
    main.classList.remove('main--overlay')
  } 
})
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    document.querySelector(".header__nav-link--active").classList.remove("header__nav-link--active");
    burger.classList.remove('header__nav-burger--open')
    nav.classList.remove('header__nav--open')
    main.classList.remove('main--overlay')
    e.target.classList.add('header__nav-link--active')
  })
})