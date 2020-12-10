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

  const joltages = loadArray()

  joltages.sort((a, b) => a - b)

  const differences = [0, 0, 0, 1]

  let currJoltage = 0
  joltages.forEach(j => {
    differences[j - currJoltage]++
    currJoltage = j
  })
  console.log(differences)
  console.log(
    'the number of 1-jolt differences multiplied by the number of 3-jolt differences is',
    differences[1] * differences[3]
  )

  const possibleChildren = new Map<number, number>()

  function countPossibleChildren(index: number): number {
    if(possibleChildren.has(index)) {
      return possibleChildren.get(index)
    } else if (index >= joltages.length - 1) {
      return 1
    } else {
      const currValue = joltages[index]
      let sum = 0
      if (joltages[index + 1] - 3 <= currValue) {
        sum += countPossibleChildren(index + 1)
      }
      if (joltages[index + 2] && joltages[index + 2] - 3 <= currValue) {
        sum += countPossibleChildren(index + 2)
      }
      if (joltages[index + 3] && joltages[index + 3] - 3 <= currValue) {
        sum += countPossibleChildren(index + 3)
      }
      possibleChildren.set(index, sum)
      return sum
    }
  }
  console.log(
    'all possible variations are',
    countPossibleChildren(0) + countPossibleChildren(1) + countPossibleChildren(2)
  )
})()
