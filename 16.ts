;(() => {
  function loadArray(): string[] {
    return document.querySelector('pre').innerText.trim().split('\n')
  }

  const input = loadArray()
  const validationsInput: string[] = []
  const validations: VC[] = []
  const myTicket: number[] = []
  const allNearbyTickets: number[][] = []
  const validNearbyTickets: number[][] = []
  const myActualTicket: any = {}

  let currentInput: string = 'validations'
  input.forEach(line => {
    switch (currentInput) {
      case 'validations':
        if (line === '') {
          currentInput = 'myTicket'
          break
        }
        validationsInput.push(line.trim())
        break
      case 'myTicket':
        if (line.indexOf(',') < 0) {
          break
        } else {
          line.split(',').forEach(v => myTicket.push(parseInt(v, 10)))
          currentInput = 'nearbyTickets'
          break
        }
      case 'nearbyTickets':
        if (line.indexOf(',') < 0) {
          break
        } else {
          allNearbyTickets.push(line.split(',').map(v => parseInt(v, 10)))
          break
        }
      default:
        console.log(line)
        break
    }
  })

  validationsInput.forEach(vi => {
    const regExMatch = vi.match(/^(.*): (\d+)-(\d+) or (\d+)-(\d+)$/)
    const validationCriteria: VC = {
      name: regExMatch[1],
      firstRange: [parseInt(regExMatch[2], 10), parseInt(regExMatch[3], 10)],
      secondRange: [parseInt(regExMatch[4], 10), parseInt(regExMatch[5], 10)],
    }
    validations.push(validationCriteria)
  })

  let ticketScanningErrorRate = 0
  allNearbyTickets.forEach(ticket => {
    const currTicketScanningErrorRate = ticketScanningErrorRate
    ticket.forEach(field => {
      if (
        validations.every(
          v =>
            !(
              (field >= v.firstRange[0] && field <= v.firstRange[1]) ||
              (field >= v.secondRange[0] && field <= v.secondRange[1])
            )
        )
      ) {
        ticketScanningErrorRate += field
      }
    })
    if (currTicketScanningErrorRate === ticketScanningErrorRate) {
      validNearbyTickets.push(ticket)
    }
  })

  console.log('the ticketScanningErrorRate is', ticketScanningErrorRate)

  const byCriteria = new Map<number, number[]>()
  const criteriaName = new Map<string, number[]>()

  myTicket.forEach((field, index) => {
    byCriteria.set(index, [field])
  })
  validNearbyTickets.forEach(ticket =>
    ticket.forEach((field, index) => byCriteria.get(index).push(field))
  )
  validations.forEach(v => criteriaName.set(v.name, []))

  byCriteria.forEach((fields, index) => {
    validations.forEach(validation => {
      if (
        fields.every(
          field =>
            (field >= validation.firstRange[0] &&
              field <= validation.firstRange[1]) ||
            (field >= validation.secondRange[0] &&
              field <= validation.secondRange[1])
        )
      ) {
        criteriaName.get(validation.name).push(index)
      }
    })
  })

  const numsToRemove: number[] = []
  while (numsToRemove.length < criteriaName.size) {
    runThroughCriteraMap()
  }
  runThroughCriteraMap()
  console.log(myActualTicket)
  const departureMultiplication =
    myActualTicket['departure date'] *
    myActualTicket['departure location'] *
    myActualTicket['departure platform'] *
    myActualTicket['departure station'] *
    myActualTicket['departure time'] *
    myActualTicket['departure track']

  console.log(
    'multiplied values whose name starts with depatrue:',
    departureMultiplication
  )

  function runThroughCriteraMap() {
    criteriaName.forEach((indices, name) => {
      indices = indices.filter(i => !numsToRemove.includes(i))
      if (indices.length === 1) {
        numsToRemove.push(indices[0])
        myActualTicket[name] = myTicket[indices[0]]
      }
    })
  }

  interface VC {
    name: string
    firstRange: number[]
    secondRange: number[]
  }
})()
