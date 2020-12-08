// https://adventofcode.com/2019/day/1/input
;(() => {
  const array = document
    .querySelector('pre')
    .innerText.trim().split('\n\n')
    .filter(n => !!n)

  const answersAnyoneAnswered = array
    .map((n: string) => n.replaceAll('\n', ''))
    .reduce((sum, v) => {
      return sum + [...new Set(v.split(''))].length
    }, 0)
  console.log('Number of questions anyone answered:', answersAnyoneAnswered)

  const answersEveryoneAnswered = array
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
