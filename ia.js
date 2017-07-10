const IA = {}

IA.chooseColumnIndex = (grid) => {
  const availableColIndexes = IA.getAvailableColumnIndexes(grid)
  return (availableColIndexes && availableColIndexes.length) ?
  availableColIndexes[ IA.getRandom(availableColIndexes.length) ] : -1;
}

IA.getRandom = (max) => {
  return Math.floor(Math.random() * max);
}

IA.getAvailableColumnIndexes = (grid) => {
  return  grid.map( (col, i) => ({index: i, length: col.length}) )
              .filter( item => item.length < 6)
              .map( item => item.index)
}

module.exports = IA;


