// function generateRandomThreeCards(size, data) {
//   let threeRandomCards = []
//   for (let i = 0; i < size; i++) {
//     let n = data[Math.floor(Math.random() * data.length)]
//     threeRandomCards.push(n)
//   }
//   let uniqueValues = new Set(threeRandomCards.map(obj => obj.name));

//   while (uniqueValues.size < threeRandomCards.length) {
//     threeRandomCards = []
//     for (let i = 0; i < size; i++) {
//       let n = data[Math.floor(Math.random() * data.length)]
//       threeRandomCards.push(n)
//     }
//     uniqueValues = new Set(threeRandomCards.map(obj => obj.name));
//   }
//   return threeRandomCards
// }

function generateRandomThreeCards(size, data) {
  let threeRandomCards = []
  for (let i = 0; i < size; i++) {
    let n = Math.floor(Math.random() * data.length)
    threeRandomCards.push(n)
  }
  let uniqueValues = new Set(threeRandomCards);
  while (uniqueValues.size < threeRandomCards.length) {
    threeRandomCards = []
    for (let i = 0; i < size; i++) {
      let n = Math.floor(Math.random() * data.length)
      threeRandomCards.push(n)
    }
    uniqueValues = new Set(threeRandomCards);
  }
  return threeRandomCards
}
let arr = [0, 1, 1]
function generateNextRandomThreeCards(prevThreeIdx = [], size, data) {
  let nextThreeCards = []
  if (prevThreeIdx.length) {
    while (nextThreeCards.length < prevThreeIdx.length) {
      let number = Math.floor(Math.random() * 8)
      prevThreeIdx.forEach(idx => {
        if (!nextThreeCards.includes(idx) && !prevThreeIdx.includes(number) && !nextThreeCards.includes(number)) {
          nextThreeCards.push(number)
          return
        }
      })
    }
  }

  return nextThreeCards
}
export { generateRandomThreeCards, generateNextRandomThreeCards }