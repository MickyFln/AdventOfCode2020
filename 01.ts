;(() => {
  const inputArray = document
    .querySelector('pre')
    .innerText.trim()
    .split('\n')
    .map((n: string) => parseInt(n.trim(), 10))
    .sort((a, b) => a - b)

  function findSum(expectedSum: number, array: number[]): number[] {
    let rtl = array.length - 1
    let ltr = 0
    while (inputArray[rtl] + inputArray[ltr] !== expectedSum && rtl > ltr) {
      if (inputArray[rtl] + inputArray[ltr] > expectedSum) {
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

  const twoElements = findSum(2020, inputArray)
  if (twoElements.length) {
    console.log('Part 1:')
    console.log(
      'Sum: ',
      inputArray[twoElements[0]] + inputArray[twoElements[1]]
    )
    console.log(
      'Product: ',
      inputArray[twoElements[0]] * inputArray[twoElements[1]]
    )
  }

  const arrCopy = [...inputArray]
  let counter = 0

  while (arrCopy.length > 0) {
    const base = arrCopy.shift()
    const possibleSolution = findSum(2020 - base, arrCopy)
    if (possibleSolution.length) {
      console.log('Part 2:')
      console.log(
        'Sum: ',
        inputArray[counter] +
          inputArray[possibleSolution[0] + counter] +
          inputArray[possibleSolution[1] + counter]
      )
      console.log(
        'Product: ',
        inputArray[counter] *
          inputArray[possibleSolution[0] + counter] *
          inputArray[possibleSolution[1] + counter]
      )
    }
    counter++
  }
})()
