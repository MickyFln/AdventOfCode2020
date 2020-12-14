;(() => {
  function loadArray(): string[] {
    return document.querySelector('pre').innerText.trim().split('\n')
  }

  const input1 = loadArray()

  const memory1 = new Map<number, number>()

  let mask: string[]

  function maskAndSetMemory1(slot: number, value: string) {
    const maskedValue = applyMask1(parseInt(value, 10).toString(2))
    memory1.set(slot, parseInt(maskedValue, 2))
  }

  function maskAndSetMemory2(slot: string, value: number) {
    const maskedSlot = applyMask2(parseInt(slot, 10).toString(2))
    const slotsToFill = createAllSlots(maskedSlot)
    slotsToFill.map(s => parseInt(s, 2)).forEach(s => memory2.set(s, value))
  }

  function createAllSlots(maskedSlot: string): string[] {
    const firstX = maskedSlot.indexOf('X')
    if (firstX < 0) {
      return [maskedSlot]
    } else {
      const varA = maskedSlot.split('')
      const varB = maskedSlot.split('')
      varA[firstX] = '0'
      varB[firstX] = '1'
      return [
        ...createAllSlots(varA.join('')),
        ...createAllSlots(varB.join('')),
      ]
    }
  }

  function applyMask1(val: string): string {
    const paddedValue = val.padStart(36, '0').split('')

    mask.forEach((value, index) => {
      if (value !== 'X') {
        paddedValue[index] = value
      }
    })
    return paddedValue.join('')
  }

  function applyMask2(val: string): string {
    const paddedValue = val.padStart(36, '0').split('')

    mask.forEach((value, index) => {
      if (value !== '0') {
        paddedValue[index] = value
      }
    })
    return paddedValue.join('')
  }

  input1.forEach(line => {
    if (line.startsWith('mask')) {
      mask = line.split(' = ')[1].split('')
    } else {
      const match = line.match(/^mem\[(\d+)\] = (\d+)$/)
      maskAndSetMemory1(parseInt(match[1], 10), match[2])
    }
  })

  let sum1 = 0
  memory1.forEach(value => (sum1 += value))
  console.log('The sum after applyying all inputs is', sum1)

  const input2 = loadArray()
  const memory2 = new Map<number, number>()

  mask = []

  input2.forEach(line => {
    if (line.startsWith('mask')) {
      mask = line.split(' = ')[1].split('')
    } else {
      const match = line.match(/^mem\[(\d+)\] = (\d+)$/)
      maskAndSetMemory2(match[1], parseInt(match[2], 10))
    }
  })
  let sum2 = 0
  memory2.forEach(value => (sum2 += value))

  console.log('The sum of the memory slots with version 2 is', sum2)

})()

// 1454957297469 too low
