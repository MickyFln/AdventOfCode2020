;(() => {
  // https://adventofcode.com/2020/day/2/input
  const arr202002 = document
    .querySelector('pre')
    .innerText.split('\n')
    .filter(n => !!n)
    .map(n => {
      const info = n.split(': ')
      const obj = {
        password: info[1],
        letter: '',
        minOccurences: NaN,
        maxOccurences: NaN,
      }
      const pwReq = info[0].split(' ')
      obj.letter = pwReq[1]
      const occurences = pwReq[0].split('-')
      obj.minOccurences = parseInt(occurences[0], 10)
      obj.maxOccurences = parseInt(occurences[1], 10)
      return obj
    })

  function checkPassword1(pwd: {
    password: string
    letter: string
    minOccurences: number
    maxOccurences: number
  }): boolean {
    const occurences = pwd.password.split(pwd.letter).length - 1
    return occurences >= pwd.minOccurences && occurences <= pwd.maxOccurences
  }

  function checkPassword2(pwd: {
    password: string
    letter: string
    minOccurences: number
    maxOccurences: number
  }): boolean {
    const foo = pwd.password.charAt(pwd.minOccurences - 1) === pwd.letter
    const bar = pwd.password.charAt(pwd.maxOccurences - 1) === pwd.letter
    if (Math.random() > 0.99) {
      console.log(pwd, foo, bar)
    }
    return (foo && !bar) || (!foo && bar)
  }

  const validPwds1 = arr202002.filter(checkPassword1)
  const validPwds2 = arr202002.filter(checkPassword2)
  console.log(
    'Part 1: Out of',
    arr202002.length,
    'given passwords',
    validPwds1.length,
    'are valid'
  )
  console.log(
    'Part 2: Out of',
    arr202002.length,
    'given passwords',
    validPwds2.length,
    'are valid'
  )
})()
