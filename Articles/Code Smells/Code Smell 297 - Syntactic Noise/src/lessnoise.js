function isNotNull(x) {
  return x !== null && x !== undefined
  // Another code smell here
}

function mapToValueAndMeta(y) {
  const meta = y.meta ? y.meta : { default: true }
  return { val: y.value, meta }
}

function reduceToProcessedList(acc, { val, meta }) {
  if (meta.default) {
    return acc
  }
  return [...acc, { processed: val * 2, origin: meta }]
}

function isProcessedInRange({ processed }) {
  return processed > 10 && processed < 50
}

// This is more declarative but far from 
// Domian business and too generic
const filtered = arr.filter(isNotNull)
const mapped = filtered.map(mapToValueAndMeta)
const processedList = mapped.reduce(reduceToProcessedList, [])
const result = processedList.some(isProcessedInRange)
