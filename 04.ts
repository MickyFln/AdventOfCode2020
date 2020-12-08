;(() => {
  const arr202004 = document
    .querySelector('pre')
    .innerText.split('\n\n')
    .filter(n => !!n)
    .map(p => {
      return p.replaceAll('\n', ' ').split(' ')
    })
    .map(p => {
      const pp: any = {}
      p.forEach(ppp => {
        const pa = ppp.split(':')
        pp[pa[0]] = pa[1]
      })
      return pp
    })

  const validPassportCount = arr202004
    .filter(p => p.byr && p.iyr && p.eyr && p.hgt && p.hcl && p.ecl && p.pid)
    .filter(p => {
      const birthYear = parseInt(p.byr, 10)
      const issueYear = parseInt(p.iyr, 10)
      const expirYear = parseInt(p.eyr, 10)
      const height = parseInt(p.hgt.slice(0, -2), 10)
      const heightUnit = p.hgt.slice(-2)
      const hairColor = /^#[a-f0-9]{6}$/.test(p.hcl)
      const eyeColor =
        ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(p.ecl) > -1
      const ppNumber = /^[0-9]{9}$/.test(p.pid)
      return (
        birthYear >= 1920 &&
        birthYear <= 2002 &&
        issueYear >= 2010 &&
        issueYear <= 2020 &&
        expirYear >= 2020 &&
        expirYear <= 2030 &&
        ((heightUnit === 'cm' && height >= 150 && height <= 193) ||
          (heightUnit === 'in' && height >= 59 && height <= 76)) &&
        hairColor &&
        eyeColor &&
        ppNumber
      )
    }).length

  console.log('There are', validPassportCount, 'valid passports')
})()
