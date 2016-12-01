"use strict"

import camelize from './camelize'

/**
 * Check browser support for a CSS rule
 *
 * Pass a normally formatted CSS rule as the argument to see if
 * the browser supports it. The CSS rule will automatically be
 * converted to camelCase as it appears in the document.body.style
 * Object.
 *
 * @param  {String} rule The CSS rule to check for
 *
 * @return {Boolean}
 */
const supportsCss = function(rule) {
  const formattedRule = camelize(rule.replace(/^-/, ""), "-")

  return (formattedRule in document.body.style)
}

export default supportsCss
