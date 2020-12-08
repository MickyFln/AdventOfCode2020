// https://adventofcode.com/2020/day/1/input
;(() => {
  const arr202001 = document
    .querySelector('pre')
    .innerText.split('\n')
    .map((n: string) => parseInt(n, 10))
    .filter(n => !!n)
    .sort((a, b) => a - b)

  function findSum(expectedSum: number, array: number[]): number[] {
    let rtl = array.length - 1
    let ltr = 0
    while (arr202001[rtl] + arr202001[ltr] !== expectedSum && rtl > ltr) {
      if (arr202001[rtl] + arr202001[ltr] > expectedSum) {
        rtl--
      } else {
        ltr++
      }
    }
    if (ltr === rtl) {
      return []
    } else {
      return [ltr, rtl]
    }
  }

  const twoElements = findSum(2020, arr202001)
  if (twoElements.length) {
    console.log('Part 1:')
    console.log('Sum: ', arr202001[twoElements[0]] + arr202001[twoElements[1]])
    console.log(
      'Product: ',
      arr202001[twoElements[0]] * arr202001[twoElements[1]]
    )
  }

  const arrCopy = [...arr202001]
  let counter = 0

  while (arrCopy.length > 0) {
    const base = arrCopy.shift()
    const possibleSolution = findSum(2020 - base, arrCopy)
    if (possibleSolution.length) {
      console.log('Part 2:')
      console.log(
        'Sum: ',
        arr202001[counter] +
          arr202001[possibleSolution[0] + counter] +
          arr202001[possibleSolution[1] + counter]
      )
      console.log(
        'Product: ',
        arr202001[counter] *
          arr202001[possibleSolution[0] + counter] *
          arr202001[possibleSolution[1] + counter]
      )
    }
    counter++
  }
})()
