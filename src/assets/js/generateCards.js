function generateRandomThreeCards(size, data) {
  let threeRandomCards = []
  for (let i = 0; i < size; i++) {
    let n = data[Math.floor(Math.random() * data.length)]
    threeRandomCards.push(n)
  }
  let uniqueValues = new Set(threeRandomCards.map(obj => obj.name));

  while (uniqueValues.size < threeRandomCards.length) {
    threeRandomCards = []
    for (let i = 0; i < size; i++) {
      let n = data[Math.floor(Math.random() * data.length)]
      threeRandomCards.push(n)
    }
    uniqueValues = new Set(threeRandomCards.map(obj => obj.name));
  }
  return threeRandomCards
}

function generateNextRandomThreeCards(prevCards = []) {
  let nextThreeCards = generateRandomThreeCards()
  if (prevCards.length) {
    prevCards.forEach(card => {
      while (nextThreeCards.includes(card)) {
        nextThreeCards = generateNextRandomThreeCards()
      }
    })
  }
}
export { generateRandomThreeCards, generateNextRandomThreeCards }