export default class PetCard {
  constructor(parentElem, { img: imgSrc, name, type, breed, description: descr, age, inoculations, diseases, parasites } = {}) {
    this.parentElem = document.querySelector(parentElem);
    this.body = document.querySelector('body');
    this.popup = document.querySelector('.popup');
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
    this.removePopupFromDom = this.removePopupFromDom.bind(this)
  }

  renderPopup() {
    const elem = document.createElement('div')
    elem.classList.add('popup__inner')
    elem.innerHTML = `
    <div class="popup__close">
    <img class="popup__close-btn" src="../../assets/icons/close.svg" alt="Close">
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

    this.popup.append(elem)

    const popupCloseBtn = this.popup.querySelector('.popup__close')
    this.overlay.classList.add('overlay--active')
    this.popup.classList.add('popup--active')
    this.body.classList.add('body--hidden')

    const removeOverlay = () => {
      this.overlay.classList.remove('overlay--active')
      this.popup.classList.remove('popup--active')
      this.body.classList.remove('body--hidden')
      setTimeout(() => this.removePopupFromDom(), 500)
    }

    popupCloseBtn.addEventListener('click', removeOverlay)

    if (this.overlay.classList.contains('overlay--active')) {
      window.addEventListener('click', (e) => {
        if (!e.target.closest('.friends__item') && !e.target.closest('.popup') && e.target.closest('.overlay')) {
          removeOverlay()
        }
      })
    }
  }

  removePopupFromDom() {
    if (this.popup.childNodes.length > 0) {
      this.popup.innerHTML = ''
      // this.popup.firstElementChild.remove(this.popup.firstElementChild)
    }
  }

  renderCard() {
    const card = document.createElement('div')
    card.dataset.id = `${this.name}`
    this.parentElem === '.friends-pets__items' ? card.classList.add('friends-pets__item') : card.classList.add('friends__item')
    card.classList.add('slider__item')

    card.innerHTML = `
    <div class="friends__box-img">
    <img class="friends__item-img" src=${this.imgSrc} alt=${this.breed}></div>
    <h4 class="friends__item-title">${this.name}</h4>
    <button class="friends__item-link btn-out">Learn more</button>
    `
    card.addEventListener('click', () => {
      this.renderPopup()
    })
    this.parentElem.append(card)
  }
}