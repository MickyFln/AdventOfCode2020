;(() => {
  const inputArray = document
    .querySelector('pre')
    .innerText.trim().split('\n')

  function calculateTrees(
    array: string[],
    down: number,
    right: number
  ): number {
    return array
      .filter((arr, index) => !(index % down))
      .reduce((sum, arr, index) => {
        const indexToCheck = (index * right) % arr.length
        if (arr.charAt(indexToCheck) === '#') {
          return ++sum
        } else {
          return sum
        }
      }, 0)
  }

  const sumTrees11 = calculateTrees(inputArray, 1, 1)
  const sumTrees13 = calculateTrees(inputArray, 1, 3)
  const sumTrees15 = calculateTrees(inputArray, 1, 5)
  const sumTrees17 = calculateTrees(inputArray, 1, 7)
  const sumTrees21 = calculateTrees(inputArray, 2, 1)

  console.log('Trees encountered:', sumTrees13)
  console.log(
    'Multiply Trees: ',
    sumTrees11 * sumTrees13 * sumTrees15 * sumTrees17 * sumTrees21
  )
})()
