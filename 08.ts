;(() => {
  function loadArray(): {
    operation: string
    value: number
    isVisited: boolean
  }[] {
    return document
      .querySelector('pre')
      .innerText.trim()
      .split('\n')
      .map(line => {
        return {
          operation: line.split(' ')[0],
          value: parseInt(line.split(' ')[1], 10),
          isVisited: false,
        }
      })
  }

  function runProgram(
    instructions: { operation: string; value: number; isVisited: boolean }[]
  ) {
    let v = 0
    let i: number
    for (i = 0; i < instructions.length && !instructions[i].isVisited; ) {
      switch (instructions[i].operation) {
        case 'acc':
          v += instructions[i].value
          instructions[i].isVisited = true
          i++
          break
        case 'nop':
          instructions[i].isVisited = true
          i++
          break
        case 'jmp':
          instructions[i].isVisited = true
          i += instructions[i].value
          break
        default:
          console.log('this shouldnt happen:', instructions[i].operation)
      }
    }
    if (i < instructions.length) {
      throw new Error(v.toString())
    } else {
      return v
    }
  }

  try {
    const instr = loadArray()
    runProgram(instr)
  } catch (error) {
    console.log('value before looping:', error.message)
  }

  let value
  let swappingI = 0
  while (typeof value === 'undefined') {
    const array = loadArray()
    if (swappingI >= array.length) {
      console.log('no single Error found')
      break
    }
    while (array[swappingI].operation === 'acc') {
      swappingI++
    }
    if (array[swappingI].operation === 'jmp') {
      array[swappingI].operation = 'nop'
    } else if (array[swappingI].operation === 'nop') {
      array[swappingI].operation = 'jmp'
    } else {
      console.error('this should not happen')
    }
    try {
      value = runProgram(array)
    } catch (error) {
      swappingI++
    }
  }

  console.log(
    'swapped the',
    swappingI,
    'th instruction. Now the value is',
    value
  )
})()
// lower bound: 1792
