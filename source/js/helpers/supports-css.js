"use strict"

import camelize from './camelize'

const supportsCss = function(rule) {
  const formattedRule = camelize(rule.replace(/^-/, ""), "-")

  return (formattedRule in document.body.style)
}

export default supportsCss
