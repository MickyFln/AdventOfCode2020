// https://adventofcode.com/2019/day/1/input
;(() => {
  const inputArray = document
    .querySelector('pre')
    .innerText.trim().split('\n\n')

  const answersAnyoneAnswered = inputArray
    .map((n: string) => n.replaceAll('\n', ''))
    .reduce((sum, v) => {
      return sum + [...new Set(v.split(''))].length
    }, 0)
  console.log('Number of questions anyone answered:', answersAnyoneAnswered)

  const answersEveryoneAnswered = inputArray
    .map(n =>
      n.trim().split('\n').map(answerSheet => answerSheet.split('').sort().join(''))
    )
    .map(
      answers =>
        answers[0]
          .split('')
          .filter(letter => answers.every(ans => ans.includes(letter))).length
    )
    .reduce((sum, value) => value + sum, 0)

  console.log('Number of questions everyone answered:', answersEveryoneAnswered)
})()
