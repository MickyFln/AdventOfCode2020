;(() => {
  const arrSize = 5000
  function loadArray(): number[] {
    return document
      .querySelector('pre')
      .innerText.trim()
      .split(',')
      .map(line => {
        return parseInt(line, 10)
      })
  }

  const index = new Map<number, number>()
  const initValues = loadArray()

  initValues.forEach((value, round) => index.set(value, round + 1))
  let guessingValue = initValues[initValues.length - 1]
  index.delete(guessingValue)
  
  const startingTime = Date.now()
  for (let round = 7; round < 30000001; round++) {
    const newValue = index.has(guessingValue)
      ? round - index.get(guessingValue) - 1
      : 0
    index.set(guessingValue, round - 1)
    guessingValue = newValue

    if (round === 2020) {
      console.log('the 2020th round has the following number:', guessingValue)
    }
    if (round === 30000000) {
      console.log(
        'the 30000000th round has the following number:',
        guessingValue
      )
    }
  }
  const duration = Date.now() - startingTime
  console.log('All in all I stored', index.size, 'values in about', duration/1000, 'seconds')
})()
