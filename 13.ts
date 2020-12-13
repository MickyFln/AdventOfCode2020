;(() => {
  function loadArray(): string[] {
    return document.querySelector('pre').innerText.trim().split('\n')
  }

  const input = loadArray()
  const arrivalTime = parseInt(input[0], 10)
  const departureTimes = input[1]
    .split(',')
    .filter(t => t !== 'x')
    .map(t => parseInt(t, 10))

  const waitingTimes = new Map<number, number>()
  departureTimes.forEach(time =>
    waitingTimes.set(time, time - (arrivalTime % time))
  )
  let minWaitingTime = arrivalTime
  let minBus = 0
  waitingTimes.forEach((v, k) => {
    if (v < minWaitingTime) {
      minWaitingTime = v
      minBus = k
    }
  })
  console.log(
    'minimum waiting time is',
    minWaitingTime,
    'for bus no',
    minBus,
    '. their product is',
    minWaitingTime * minBus
  )

  // Part 2

  let increment = 1
  let timestamp = 0

  input[1].split(',').forEach((busId, index) => {
    if (busId !== 'x') {
      const busIdNum = parseInt(busId, 10)

      while ((timestamp + index) % busIdNum !== 0) {
        timestamp += increment
      }
      increment *= busIdNum
    }
  })

  console.log('At', timestamp, 'you have the required delays for every bus')
})()
