export default class PetCard {
  constructor(parentElem, { img: imgSrc, name, type, breed, description: descr, age, inoculations, diseases, parasites } = {}) {
    this.parentElem = document.querySelector(parentElem);
    this.overlay = document.querySelector('.overlay');
    this.imgSrc = imgSrc;
    this.name = name;
    this.type = type;
    this.breed = breed;
    this.descr = descr;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;
    this.renderCard = this.renderCard.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
  }

  renderPopup = () => {
    const body = document.querySelector('body')
    const popup = document.querySelector('.popup')
    const elem = document.createElement('div')
    elem.classList.add('popup__inner')
    elem.innerHTML = `
    <div class="popup__close">
    <img class="popup__close-btn" src="./assets/icons/close.svg" alt="Close">
    </div>
    <div class="popup__wrapper">
    <div class="popup__left-item">
    <img class="popup__image" src=${this.imgSrc} alt=${this.breed}>
    </div>
    <div class="popup__right-item">
    <h3 class="popup__title">${this.name}</h3>
    <h4 class="popup__subtitle">${this.type} - ${this.breed}</h4>
    <p class="popup__descr">${this.descr}</p>
    <ul class="popup__list">
    <li class="popup__list-item"><span>Age</span> ${this.age}</li>
    <li class="popup__list-item"><span>Inoculations:</span> ${this.inoculations}</li>
    <li class="popup__list-item"><span>Diseases:</span> ${this.diseases}</li>
    <li class="popup__list-item"><span>Parasites:</span> ${this.parasites}</li>
    </ul>
    </div>
    </div>`

    popup.append(elem)

    const popupCloseBtn = popup.querySelector('.popup__close')
    this.overlay.classList.add('overlay--active')
    popup.classList.add('popup--active')
    body.classList.add('body--hidden')

    const removeOverlay = () => {
      this.overlay.classList.remove('overlay--active')
      popup.classList.remove('popup--active')
      body.classList.remove('body--hidden')
      setTimeout(() => {
        popup.innerHTML = ''
      }, 300)
    }

    popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup__close-btn')) {
        removeOverlay()
      }
    })

    if (this.overlay.classList.contains('overlay--active')) {
      window.addEventListener('click', (e) => {
        if (!e.target.closest('.friends__item') && !e.target.closest('.popup') && e.target.closest('.overlay')) {
          removeOverlay()
        }
      })
    }
  }

  renderCard = () => {
    const cardsParent = document.querySelector('.slider__item-visible')
    const card = document.createElement('div')
    card.dataset.id = `${this.name}`
    card.classList.add('friends__item')
    card.classList.add('slider__item')

    card.innerHTML = `
    <div class="friends__box-img">
    <img class="friends__item-img" src=${this.imgSrc} alt=${this.breed}></div>
    <h4 class="friends__item-title">${this.name}</h4>
    <button class="friends__item-link btn-out">Learn more</button>
    `
    cardsParent.addEventListener('click', (e) => {

      if (e.target.closest('.slider__item').dataset.id === card.dataset.id) {
        this.renderPopup()
      }
    })
    this.parentElem.append(card)
  }
}