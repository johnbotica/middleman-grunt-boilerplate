"use strict"

const camelize = function(str, delimiter=" ") {
  return str.split(delimiter).map((word, i) => {
    return i > 0 ? `${word.substr(0,1).toUpperCase()}${word.substr(1)}` : word.toLowerCase()
  }).join("")
}

export default camelize
