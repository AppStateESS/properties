export default function Range(current, deci = false) {
  let range = []
  const start = deci
    ? 1.5
    : 1
  for (let i = start; i < 7; i++) {
    range.push({value: i.toString(), label: i.toString()})
  }
  return range
}
