function generateRandomCards(size, data) {
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
function generateNextRandomCards(prevCards = [], data) {
  let nextCards = []

  if (prevCards.length) {
    while (nextCards.length < prevCards.length) {
      let num = Math.floor(Math.random() * data.length)
      if (prevCards.every(obj => obj.name !== data[num].name && nextCards.every(obj2 => obj2.name !== data[num].name))) {
        nextCards.push(data[num])
      } else {
        num = Math.floor(Math.random() * data.length)
      }
    }
  }
  return nextCards
}
export { generateRandomCards, generateNextRandomCards }