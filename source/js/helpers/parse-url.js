"use strict"

/**
 * Parse an URL into an Object
 *
 * Parses an URL into its components (schema, host, path, etc.) using the
 * `a` tag href technique. Adds an additional `params` property to browse
 * query parameters as an Object.
 *
 * In addition to being able to browse query parameters as an Object you can
 * also set a query parameter using the `setParam` method.
 *
 * @param  {String} url URL to parse
 *
 * @return {Object}
 */
const parseUrl = function(url) {
  let a = document.createElement('a')

  a.href = url
  a.params = a.search
              .substr(1)
              .split("&")
              .map(i => i.split("="))
              .reduce((o, i) => {
                o[i[0]] = decodeURIComponent(`${i[1]}`.replace(/\+/g, "%20"))
                return o
              }, {})

  /**
   * Set a query parameter
   *
   * @param {String} key Query parameter key
   * @param {String} val Query parameter value
   *
   * @return {this}
   */
  a.setParam = function(key, val) {
    a.params[key] = val
    a.search = `?${$.param(a.params)}`
  }

  return a
}

export default parseUrl
