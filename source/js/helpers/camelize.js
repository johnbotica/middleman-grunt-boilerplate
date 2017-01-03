"use strict"

/**
 * Convert a phrase to camel case
 *
 * @param  {String} str       String to convert
 * @param  {String} delimiter Delimiter to determine word separation (space character by default)
 *
 * @return {String}           Camel case version of the str
 */
const camelize = function(str, delimiter=" ") {
  return str.split(delimiter).map((word, i) => {
    return i > 0 ? `${word.substr(0,1).toUpperCase()}${word.substr(1)}` : word.toLowerCase()
  }).join("")
}

export default camelize
