;(() => {
  function loadArray(): number[] {
    return document
      .querySelector('pre')
      .innerText.trim()
      .split('\n')
      .map(line => {
        return parseInt(line, 10)
      })
  }

  function findSumBounds(expectedSum: number, preamble: number[]): number[] {
    preamble.sort((a, b) => a - b)
    let rtl = preamble.length - 1
    let ltr = 0
    while (preamble[rtl] + preamble[ltr] !== expectedSum && rtl > ltr) {
      if (preamble[rtl] + preamble[ltr] > expectedSum) {
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

  function findSumAll(expectedSum: number, array: number[]): number[] {
    let leftBound = 0
    let rightBound = 0

    while(leftBound < array.length && rightBound < array.length) {
      const sum = array.slice(leftBound,rightBound + 1).reduce((s,value) => s + value, 0)
      if(sum < expectedSum) {
        rightBound++
      } else if(sum > expectedSum) {
        leftBound++
      } else {
        return [leftBound, rightBound]
      }
    }
  }

  const input = loadArray()

  for (let i = 25; i < input.length; i++) {
    if (findSumBounds(input[i], [...input.slice(i - 25, i)]).length !== 2) {
      console.log('A number that does not follow the rule is', input[i])
      const bounds = findSumAll(input[i], [...input.slice(0, i)])
      
      const weakness =
        Math.max(...input.slice(bounds[0], bounds[1])) +
        Math.min(...input.slice(bounds[0], bounds[1]))
      console.log('the encryption weakness is', weakness)
    }
  }
})()

// upper bound: 88465922335224
