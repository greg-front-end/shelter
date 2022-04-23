import { petsData } from '../data/petsData'
import PetCard from './Cards'
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

	let randomThreeArr = generateRandomThreeCards(size, petsData)
	randomThreeArr.forEach(idx => new PetCard('.slider__item-visible', petsData[idx]).renderCard())

	window.addEventListener('resize', () => {
		size = chekcScreenSize()
		if (itemVisible.childNodes.length > size) {
			itemVisible.innerHTML = ''
			setTimeout(() => {
				randomThreeArr = generateRandomThreeCards(size, petsData)
				randomThreeArr.forEach(idx => new PetCard('.slider__item-visible', petsData[idx]).renderCard())
			})
		} else if (itemVisible.childNodes.length < size) {
			itemVisible.innerHTML = ''
			setTimeout(() => {
				randomThreeArr = generateRandomThreeCards(size, petsData)
				randomThreeArr.forEach(idx => new PetCard('.slider__item-visible', petsData[idx]).renderCard())
			})
		}
	})

	const moveLeft = (e) => {
		sliderInner.classList.add("slider--transition-left");
		prevBtn.removeEventListener("click", moveLeft);
		nextBtn.removeEventListener("click", moveRight);
		prevBtn.classList.add('arrow-btns__left--disable')
		itemLeft.innerHTML = '';
		randomThreeArr = generateNextRandomThreeCards(randomThreeArr, size, petsData)
		randomThreeArr.forEach(idx => new PetCard('.slider__item-left', petsData[idx]).renderCard())
	};

	const moveRight = (e) => {
		sliderInner.classList.add("slider--transition-right");
		nextBtn.removeEventListener("click", moveLeft);
		nextBtn.removeEventListener("click", moveRight);
		itemRight.innerHTML = '';
		nextBtn.classList.add('arrow-btns__right--disable')
		randomThreeArr = generateNextRandomThreeCards(randomThreeArr, size, petsData)
		console.log(randomThreeArr)
		setTimeout(() => {
			randomThreeArr.forEach(idx => new PetCard('.slider__item-right', petsData[idx]).renderCard())
		})
	};

	prevBtn.addEventListener("click", moveLeft);
	nextBtn.addEventListener("click", moveRight);

	sliderInner.addEventListener("animationend", (animationEvent) => {
		prevBtn.classList.remove('arrow-btns__left--disable')
		nextBtn.classList.remove('arrow-btns__right--disable')
		if (animationEvent.animationName === "move-left") {
			sliderInner.classList.remove("slider--transition-left");
			itemVisible.innerHTML = itemLeft.innerHTML
			itemLeft.innerHTML = ''
		} else {
			sliderInner.classList.remove("slider--transition-right");
			itemVisible.innerHTML = itemRight.innerHTML
			itemRight.innerHTML = ''
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