const result = arr.filter(x => x !== null && x !== undefined)
  .map((y) => ({ val: y.value, meta: 
    y.meta ? y.meta : {default: true}}))
  .reduce((acc, {val, meta}) => 
    meta.default ? acc : [...acc, 
      {processed: val * 2, origin: meta}], [])
  .some(({processed}) => processed > 10 && processed < 50);