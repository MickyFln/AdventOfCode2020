;(() => {
  function loadArray(): number[][] {
    return document
      .querySelector('pre')
      .innerText.trim()
      .replaceAll('.', '0')
      .replaceAll('L', '1')
      .split('\n')
      .map(line =>
        line
          .trim()
          .split('')
          .map(seat => parseInt(seat, 10))
      )
  }

  let os = loadArray()
  let ns = triggerRound(os, 4, false)

  while (!compareSeatmaps(os, ns)) {
    os = ns
    ns = triggerRound(os, 4, false)
  }

  console.log(
    'Part A: Seats don\'t change anymore. Now there are',
    countOccupiedSeats(ns),
    'occupied seats'
  )

  let os2 = loadArray()
  let ns2 = triggerRound(os2, 3, true)

  while (!compareSeatmaps(os2, ns2)) {
    os2 = ns2
    ns2 = triggerRound(os2, 3, true)
  }

  console.log(
    'Part B: Seats don\'t change anymore. Now there are',
    countOccupiedSeats(ns2),
    'occupied seats'
  )

  function triggerRound(
    oldSeatmap: number[][],
    threshold: number,
    partB: boolean
  ): number[][] {
    const newSeatmap = [...new Array(oldSeatmap.length)].map(
      () => new Array(oldSeatmap[0].length)
    )

    for (let i = 0; i < oldSeatmap.length; i++) {
      for (let j = 0; j < oldSeatmap[i].length; j++) {
        if (oldSeatmap[i][j] === 0) {
          newSeatmap[i][j] = 0
        } else {
          const emptySeatCount = partB
            ? getEmptySeatsCountB(oldSeatmap, i, j)
            : getEmptySeatsCount(oldSeatmap, i, j)
          if (oldSeatmap[i][j] === 1 && emptySeatCount === 8) {
            newSeatmap[i][j] = 2
          } else if (oldSeatmap[i][j] === 2 && emptySeatCount <= threshold) {
            newSeatmap[i][j] = 1
          } else {
            newSeatmap[i][j] = oldSeatmap[i][j]
          }
        }
      }
    }
    return newSeatmap
  }

  function getEmptySeatsCount(seats: number[][], row: number, column: number) {
    return (
      rightSeatEmpty(seats, row, column) +
      leftSeatEmpty(seats, row, column) +
      topSeatEmpty(seats, row, column) +
      bottomSeatEmpty(seats, row, column) +
      topRightSeatEmpty(seats, row, column) +
      topLeftSeatEmpty(seats, row, column) +
      bottomRightSeatEmpty(seats, row, column) +
      bottomLeftSeatEmpty(seats, row, column)
    )
  }

  function getEmptySeatsCountB(seats: number[][], row: number, column: number) {
    return (
      rightSeatEmptyB(seats, row, column) +
      leftSeatEmptyB(seats, row, column) +
      topSeatEmptyB(seats, row, column) +
      bottomSeatEmptyB(seats, row, column) +
      topRightSeatEmptyB(seats, row, column) +
      topLeftSeatEmptyB(seats, row, column) +
      bottomRightSeatEmptyB(seats, row, column) +
      bottomLeftSeatEmptyB(seats, row, column)
    )
  }

  function rightSeatEmpty(
    seats: number[][],
    row: number,
    column: number
  ): number {
    return column === seats[row].length - 1 || seats[row][column + 1] < 2
      ? 1
      : 0
  }
  function leftSeatEmpty(
    seats: number[][],
    row: number,
    column: number
  ): number {
    return column === 0 || seats[row][column - 1] < 2 ? 1 : 0
  }
  function topSeatEmpty(
    seats: number[][],
    row: number,
    column: number
  ): number {
    return row === 0 || seats[row - 1][column] < 2 ? 1 : 0
  }
  function bottomSeatEmpty(
    seats: number[][],
    row: number,
    column: number
  ): number {
    return row === seats.length - 1 || seats[row + 1][column] < 2 ? 1 : 0
  }
  function topLeftSeatEmpty(
    seats: number[][],
    row: number,
    column: number
  ): number {
    return row === 0 || column === 0 || seats[row - 1][column - 1] < 2 ? 1 : 0
  }
  function topRightSeatEmpty(
    seats: number[][],
    row: number,
    column: number
  ): number {
    return row === 0 ||
      column === seats[row].length - 1 ||
      seats[row - 1][column + 1] < 2
      ? 1
      : 0
  }
  function bottomLeftSeatEmpty(
    seats: number[][],
    row: number,
    column: number
  ): number {
    return row === seats.length - 1 ||
      column === 0 ||
      seats[row + 1][column - 1] < 2
      ? 1
      : 0
  }
  function bottomRightSeatEmpty(
    seats: number[][],
    row: number,
    column: number
  ): number {
    return row === seats.length - 1 ||
      column === seats[row].length - 1 ||
      seats[row + 1][column + 1] < 2
      ? 1
      : 0
  }

  function rightSeatEmptyB(
    seats: number[][],
    row: number,
    column: number
  ): number {
    if (column === seats[row].length - 1) {
      return 1
    } else if (seats[row][column + 1] === 0) {
      return rightSeatEmptyB(seats, row, column + 1)
    } else {
      return -1 * seats[row][column + 1] + 2
    }
  }
  function leftSeatEmptyB(
    seats: number[][],
    row: number,
    column: number
  ): number {
    if (column === 0) {
      return 1
    } else if (seats[row][column - 1] === 0) {
      return leftSeatEmptyB(seats, row, column - 1)
    } else {
      return -1 * seats[row][column - 1] + 2
    }
  }
  function topSeatEmptyB(
    seats: number[][],
    row: number,
    column: number
  ): number {
    if (row === 0) {
      return 1
    } else if (seats[row - 1][column] === 0) {
      return topSeatEmptyB(seats, row - 1, column)
    } else {
      return -1 * seats[row - 1][column] + 2
    }
  }
  function bottomSeatEmptyB(
    seats: number[][],
    row: number,
    column: number
  ): number {
    if (row === seats.length - 1) {
      return 1
    } else if (seats[row + 1][column] === 0) {
      return bottomSeatEmptyB(seats, row + 1, column)
    } else {
      return -1 * seats[row + 1][column] + 2
    }
  }
  function topLeftSeatEmptyB(
    seats: number[][],
    row: number,
    column: number
  ): number {
    if (row === 0 || column === 0) {
      return 1
    } else if (seats[row - 1][column - 1] === 0) {
      return topLeftSeatEmptyB(seats, row - 1, column - 1)
    } else {
      return -1 * seats[row - 1][column - 1] + 2
    }
  }
  function topRightSeatEmptyB(
    seats: number[][],
    row: number,
    column: number
  ): number {
    if (row === 0 || column === seats[row].length - 1) {
      return 1
    } else if (seats[row - 1][column + 1] === 0) {
      return topRightSeatEmptyB(seats, row - 1, column + 1)
    } else {
      return -1 * seats[row - 1][column + 1] + 2
    }
  }
  function bottomLeftSeatEmptyB(
    seats: number[][],
    row: number,
    column: number
  ): number {
    if (row === seats.length - 1 || column === 0) {
      return 1
    } else if (seats[row + 1][column - 1] === 0) {
      return bottomLeftSeatEmptyB(seats, row + 1, column - 1)
    } else {
      return -1 * seats[row + 1][column - 1] + 2
    }
  }
  function bottomRightSeatEmptyB(
    seats: number[][],
    row: number,
    column: number
  ): number {
    if (row === seats.length - 1 || column === seats[row].length - 1) {
      return 1
    } else if (seats[row + 1][column + 1] === 0) {
      return bottomRightSeatEmptyB(seats, row + 1, column + 1)
    } else {
      return -1 * seats[row + 1][column + 1] + 2
    }
  }

  function compareSeatmaps(
    oldSeatmap: number[][],
    newSeatmap: number[][]
  ): boolean {
    let isEqual = true
    oldSeatmap.forEach((row, rowIndex) =>
      row.forEach((seat, seatIndex) => {
        isEqual = isEqual && seat === newSeatmap[rowIndex][seatIndex]
      })
    )
    return isEqual
  }

  function countOccupiedSeats(seatMap: number[][]): number {
    let occupiedSeats = 0
    seatMap.forEach(row =>
      row.forEach(seat => {
        occupiedSeats += seat === 2 ? 1 : 0
      })
    )
    return occupiedSeats
  }
})()

// 2407 is too high
