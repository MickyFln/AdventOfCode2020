;(() => {
  const seats = document
    .querySelector('pre')
    .innerText.split('\n')
    .filter(n => !!n)
    .map(bp =>
      parseInt(
        bp
          .replaceAll('R', '1')
          .replaceAll('L', '0')
          .replaceAll('F', '0')
          .replaceAll('B', '1'),
        2
      )
    )
  console.log('highest SeatId is:', Math.max(...seats))
  console.log('places with one neighbouring seat empty:' ,seats.filter((v, i, arr) => {
    const prevSeatAvailable = arr.indexOf(v-1) === -1
    const nextSeatAvailable = arr.indexOf(v+1) === -1
    return prevSeatAvailable && !nextSeatAvailable || nextSeatAvailable && !prevSeatAvailable
  }))
})()
