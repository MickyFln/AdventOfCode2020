;(() => {
  const inputArray = document
    .querySelector('pre')
    .innerText.trim()
    .split('\n')
    .map(n => {
      n.trim()
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

  const validPwds1 = inputArray.filter(checkPassword1)
  const validPwds2 = inputArray.filter(checkPassword2)
  console.log(
    'Part 1: Out of',
    inputArray.length,
    'given passwords',
    validPwds1.length,
    'are valid'
  )
  console.log(
    'Part 2: Out of',
    inputArray.length,
    'given passwords',
    validPwds2.length,
    'are valid'
  )
})()
