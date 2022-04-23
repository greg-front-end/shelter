// // import getPetsDB from './service/getPetsDB'
// const cards = document.querySelectorAll('.friends__item')
// const popup = document.querySelector('.popup')
// const overlay = document.querySelector('.overlay')
// const popupCloseBtn = document.querySelector('.popup__close')
// const body = document.querySelector('body')



// const removeOverlay = () => {
//     overlay.classList.remove('overlay--active')
//     popup.classList.remove('popup--active')
//     body.classList.remove('body--hidden')
//     // setTimeout(() => this.removePopupFromDom(), 500)
// }

// popupCloseBtn.addEventListener('click', removeOverlay)

// if (overlay.classList.contains('overlay--active')) {
//     window.addEventListener('click', (e) => {
//         if (!e.target.closest('.friends__item') && !e.target.closest('.popup') && e.target.closest('.overlay')) {
//             removeOverlay()
//         }
//     })
// }

// cards.forEach(card => {
//     card.addEventListener('click', () => {
//         overlay.classList.add('overlay--active')
//         popup.classList.add('popup--active')
//         body.classList.add('body--hidden')
//         // removeOverlay()
//         console.log('click')
//     })
// })
// // popupCloseBtn.addEventListener('click', () => {
// //   mainOverlay.classList.remove('main--overlay')
// //   popup.classList.remove('popup--active')
// //   body.style.overflowY = 'auto'
// // })
// // const removeOverlay = () => {
// //   if (mainOverlay.classList.contains('main--overlay')) {
// //     window.addEventListener('click', (e) => {
// //       if (e.target.matches('.popup__close') && !e.target.closest('.popup')) {
// //         mainOverlay.classList.remove('main--overlay')
// //         popup.classList.remove('popup--active')
// //         body.style.overflowY = 'auto'
// //         console.log('click')
// //       }
// //     })
// //   }
// // }
