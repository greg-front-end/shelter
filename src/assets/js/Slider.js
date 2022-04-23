const petsDB = require('../data/pets.json')
import PetCard from './Cards'
console.log(petsDB)
import { generateRandomThreeCards, generateNextRandomThreeCards } from './generateCards'
function slider({ slide, nextArrow, prevArrow, wrapper, inner } = {}) {

	const chekcScreenSize = () => {
		let len = 2
		if (window.screen.width >= 1280) {
			len = 3
		} else if (window.screen.width < 768) {
			len = 1
		}
		return len
	}
	let size = chekcScreenSize();
	const sliderWrapper = document.querySelector(wrapper),
		sliderInner = document.querySelector(inner),
		widthWrapper = window.getComputedStyle(sliderWrapper).width,
		slidesTotal = document.querySelectorAll(slide),
		prevBtn = document.querySelector(prevArrow),
		nextBtn = document.querySelector(nextArrow),
		itemLeft = document.querySelector('.slider__item-left'),
		itemRight = document.querySelector('.slider__item-right'),
		itemVisible = document.querySelector('.slider__item-visible');

	let randomThreeArr = generateRandomThreeCards(size, petsDB)
	randomThreeArr.forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())

	window.addEventListener('resize', () => {
		size = chekcScreenSize()
		if (itemVisible.childNodes.length > size) {
			itemVisible.innerHTML = ''
			setTimeout(() => {
				randomThreeArr = generateRandomThreeCards(size, petsDB)
				randomThreeArr.forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())
			})
		} else if (itemVisible.childNodes.length < size) {
			itemVisible.innerHTML = ''
			setTimeout(() => {
				randomThreeArr = generateRandomThreeCards(size, petsDB)
				randomThreeArr.forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())
			})
		}
	})

	// const removeThreeSlides = (e) => {

	// 	if (sliderInner.childNodes.length > size && e.target.closest('.arrow-btns__right')) {
	// 		for (let i = 0; i < (sliderInner.childNodes.length - size); i++) {
	// 			sliderInner.removeChild(sliderInner.firstChild)
	// 		}
	// 	}
	// 	if (sliderInner.childNodes.length > size && e.target.closest('.arrow-btns__left')) {
	// 		for (let i = 0; i < (sliderInner.childNodes.length - size); i++) {
	// 			sliderInner.removeChild(sliderInner.lastChild)
	// 		}
	// 	}
	// }
	const moveLeft = (e) => {
		sliderInner.classList.add("slider--transition-left");
		prevBtn.removeEventListener("click", moveLeft);
		nextBtn.removeEventListener("click", moveRight);
		itemLeft.innerHTML = '';
		randomThreeArr = generateRandomThreeCards(size, petsDB)
		randomThreeArr.forEach(obj => new PetCard('.slider__item-left', obj).renderCard())
		randomThreeArr.forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())
	};

	const moveRight = (e) => {
		sliderInner.classList.add("slider--transition-right");
		prevBtn.removeEventListener("click", moveLeft);
		nextBtn.removeEventListener("click", moveRight);
		itemRight.innerHTML = '';
		randomThreeArr = generateRandomThreeCards(size, petsDB)
		randomThreeArr.forEach(obj => new PetCard('.slider__item-right', obj).renderCard())
		randomThreeArr.forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())
	};

	prevBtn.addEventListener("click", moveLeft);
	nextBtn.addEventListener("click", moveRight);

	sliderInner.addEventListener("animationend", (animationEvent) => {
		if (animationEvent.animationName === "move-left") {
			sliderInner.classList.remove("slider--transition-left");
			// itemVisible.innerHTML = itemLeft.innerHTML
			randomThreeArr = generateRandomThreeCards(size, petsDB)
			randomThreeArr.forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())
		} else {
			sliderInner.classList.remove("slider--transition-right");
			// itemVisible.innerHTML = itemRight.innerHTML
			randomThreeArr = generateRandomThreeCards(size, petsDB)
			randomThreeArr.forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())
		}

		prevBtn.addEventListener("click", moveLeft);
		nextBtn.addEventListener("click", moveRight);
	})
}

slider({
	slide: '.slider__item',
	nextArrow: '.arrow-btns__right',
	prevArrow: '.arrow-btns__left',
	wrapper: '.slider',
	inner: '.slider__inner'
});