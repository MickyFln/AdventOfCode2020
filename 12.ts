;(() => {
  function loadArray(): { direction: string; distance: number }[] {
    return document
      .querySelector('pre')
      .innerText.trim()
      .split('\n')
      .map(line => {
        return {
          direction: line.charAt(0),
          distance: parseInt(line.slice(1), 10),
        }
      })
  }

  const directions = loadArray()

  const shipA = {
    posX: 0,
    posY: 0,
    facingDirection: 'E',
  }

  const shipB = {
    posX: 0,
    posY: 0,
  }

  let wayPoint = {
    posX: 10,
    posY: 1,
  }

  directions.forEach(dir => moveShip(dir.direction, dir.distance))
  directions.forEach(dir => moveWaypoint(dir.direction, dir.distance))

  console.log(
    'the manhatten distance for part A is',
    Math.abs(shipA.posX) + Math.abs(shipA.posY)
  )
  console.log(
    'the manhatten distance for part B is',
    Math.abs(shipB.posX) + Math.abs(shipB.posY)
  )
  function moveShip(direction: string, distance: number) {
    switch (direction) {
      case 'N':
        shipA.posY += distance
        break
      case 'S':
        shipA.posY -= distance
        break
      case 'E':
        shipA.posX += distance
        break
      case 'W':
        shipA.posX -= distance
        break
      case 'L':
      case 'R':
        turnShip(direction, distance)
        break
      case 'F':
        moveShip(shipA.facingDirection, distance)
        break
      default:
        console.error('this should not happen')
    }
  }

  function turnShip(direction: string, distance: number) {
    switch (direction + distance + shipA.facingDirection) {
      case 'L90N':
      case 'R90S':
      case 'L180E':
      case 'R180E':
      case 'L270S':
      case 'R270N':
        shipA.facingDirection = 'W'
        break
      case 'L90E':
      case 'R90W':
      case 'L180S':
      case 'R180S':
      case 'L270W':
      case 'R270E':
        shipA.facingDirection = 'N'
        break
      case 'L90S':
      case 'R90N':
      case 'L180W':
      case 'R180W':
      case 'L270N':
      case 'R270S':
        shipA.facingDirection = 'E'
        break
      case 'L90W':
      case 'R90E':
      case 'L180N':
      case 'R180N':
      case 'L270E':
      case 'R270W':
        shipA.facingDirection = 'S'
        break
      default:
        console.error(
          'this also should not happen',
          direction,
          distance,
          shipA.facingDirection
        )
    }
  }

  function moveWaypoint(direction: string, distance: number) {
    switch (direction) {
      case 'N':
        wayPoint.posY += distance
        break
      case 'S':
        wayPoint.posY -= distance
        break
      case 'E':
        wayPoint.posX += distance
        break
      case 'W':
        wayPoint.posX -= distance
        break
      case 'L':
      case 'R':
        turnWaypoint(direction, distance)
        break
      case 'F':
        shipB.posX += distance * wayPoint.posX
        shipB.posY += distance * wayPoint.posY
        break
      default:
        console.error('just nope')
    }
  }

  function turnWaypoint(direction: string, distance: number) {
    switch (direction + distance) {
      case 'L90':
      case 'R270':
        wayPoint = {
          posX: wayPoint.posY * -1,
          posY: wayPoint.posX,
        }
        break
      case 'L180':
      case 'R180':
        wayPoint = {
          posX: wayPoint.posX * -1,
          posY: wayPoint.posY * -1,
        }
        break
      case 'L270':
      case 'R90':
        wayPoint = {
          posX: wayPoint.posY,
          posY: wayPoint.posX * -1,
        }
        break
      default:
        console.error('how???')
    }
  }
})()

// 2600 too high
