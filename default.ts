;(() => {
  function loadArray(): number[] {
    return document
      .querySelector('pre')
      .innerText.trim()
      .split('\n')
      .map(line => {
        return parseInt(line, 10)
      })
  }

  const input = loadArray()

  
})()
