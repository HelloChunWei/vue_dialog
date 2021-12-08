export const findMaxZindex = (): number => {
  return Math.max(1, ...Array.from(
      document.querySelectorAll('*')).map(el => getComputedStyle(el).zIndex)
      .filter(v => !isNaN(parseInt(v[1])))
      .map(o => parseInt(o)
      )
    )
}
