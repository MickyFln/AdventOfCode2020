;(() => {
  const inputArray = document
    .querySelector('pre')
    .innerText.trim()
    .split('\n')
    .map(rule => rule.split(' bags contain '))

  function findParentBags(searchStrings: Set<string>): Set<string> {
    const pb = new Set<string>()
    searchStrings.forEach(search => {
      inputArray
        .filter(rule => rule[1].includes(search))
        .map(rule => rule[0])
        .forEach(color => pb.add(color))
    })
    if (pb.size === searchStrings.size) {
      return pb
    } else {
      return new Set([...pb, ...findParentBags(pb)])
    }
  }

  const possibleBags = findParentBags(new Set(['shiny gold']))
  console.log('Possible nummber of parental bags is', possibleBags.size)

  function sumChildrenBags(color: string): number {
    const possibleChildBags = inputArray.find(rule =>
      rule[0].includes(color)
    )[1]
    if (possibleChildBags === 'no other bags.') {
      return 1
    } else {
      const childBags = possibleChildBags
        .split(', ')
        .map(c => c.split(' bag')[0].trim())
        .map(cb => {
          return {
            count: parseInt(cb.charAt(0), 10),
            color: cb.slice(1).trim(),
          }
        })
      let sum = 1 // this bag
      childBags.forEach(cb => {
        sum += cb.count * sumChildrenBags(cb.color)
      })
      return sum
    }
  }

  const noOfBags = sumChildrenBags('shiny gold')
  console.log('Number of bags to pack is', noOfBags - 1)
})()
