import { petsData } from '../data/petsData'
import PetCard from './Cards'
import { generateRandomCards, generateNextRandomCards } from './generateCards'
function slider({ slide, nextArrow, prevArrow, wrapper, inner, laptop = 2, desctop = 3, mobile = 1 } = {}) {

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
	const sliderWrapper = document.querySelector(wrapper),
		sliderInner = document.querySelector(inner),
		widthWrapper = window.getComputedStyle(sliderWrapper).width,
		slidesTotal = document.querySelectorAll(slide),
		prevBtn = document.querySelector(prevArrow),
		nextBtn = document.querySelector(nextArrow),
		itemLeft = document.querySelector('.slider__item-left'),
		itemRight = document.querySelector('.slider__item-right'),
		itemVisible = document.querySelector('.slider__item-visible');

	let randomThreeArr = generateRandomCards(size, petsData)
	randomThreeArr.forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())

	window.addEventListener('resize', () => {
		size = chekcScreenSize()
		if (randomThreeArr.length !== size) {
			randomThreeArr = generateRandomCards(size, petsData)
			setTimeout(() => {
				itemVisible.innerHTML = ''
				randomThreeArr.forEach(obj => new PetCard('.slider__item-visible', obj).renderCard())
			})
		}
	})

	const moveLeft = (e) => {
		sliderInner.classList.add("slider--transition-left");
		prevBtn.classList.add('arrow-btns__left--disable')
		prevBtn.removeEventListener("click", moveLeft);
		nextBtn.removeEventListener("click", moveRight);
		setTimeout(() => {
			itemLeft.innerHTML = '';
			randomThreeArr = generateNextRandomCards(randomThreeArr, petsData)
			randomThreeArr.forEach(obj => new PetCard('.slider__item-left', obj).renderCard())
		})
		setTimeout(() => {
			itemVisible.innerHTML = itemLeft.innerHTML
			itemLeft.innerHTML = ''
			sliderInner.classList.remove("slider--transition-left");
			prevBtn.classList.remove('arrow-btns__left--disable')

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
			randomThreeArr = generateNextRandomCards(randomThreeArr, petsData)
			randomThreeArr.forEach(obj => new PetCard('.slider__item-right', obj).renderCard())
		})
		setTimeout(() => {
			itemVisible.innerHTML = itemRight.innerHTML
			itemRight.innerHTML = ''
			sliderInner.classList.remove("slider--transition-right");
			nextBtn.classList.remove('arrow-btns__right--disable')

			prevBtn.addEventListener("click", moveLeft);
			nextBtn.addEventListener("click", moveRight);
		}, 1000)
	};

	prevBtn.addEventListener("click", moveLeft);
	nextBtn.addEventListener("click", moveRight);


	// sliderInner.addEventListener("animationend", (animationEvent) => {
	// 	prevBtn.classList.remove('arrow-btns__left--disable')
	// 	nextBtn.classList.remove('arrow-btns__right--disable')
	// 	if (animationEvent.animationName === "move-left") {

	// 	} else {
	// 		sliderInner.classList.remove("slider--transition-right");
	// 		itemVisible.innerHTML = itemRight.innerHTML
	// 		itemRight.innerHTML = ''
	// 	}

	// 	prevBtn.addEventListener("click", moveLeft);
	// 	nextBtn.addEventListener("click", moveRight);
	// })
}

slider({
	slide: '.slider__item',
	nextArrow: '.arrow-btns__right',
	prevArrow: '.arrow-btns__left',
	wrapper: '.slider',
	inner: '.slider__inner'
});