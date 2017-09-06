const self = this;

/**
* 
* @param {*} playersColors - array with 2 strings of hexadecimal color or css color name
* @param {*} spotValue - index in column array
* @return {string} css color or css hexadecimal value
*/
exports.getColor = playersColors => spotValue => 
  self.isFreeSpot(spotValue) ? 'blue' : playersColors[spotValue]

exports.isFreeSpot = spotValue => self.isNullOrUndefined(spotValue)

exports.isNullOrUndefined = value => value == null