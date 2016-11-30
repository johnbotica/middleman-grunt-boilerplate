"use strict"

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

  a.setParam = function(key, val) {
    a.params[key] = val
    a.search = `?${$.param(a.params)}`
  }

  return a
}

export default parseUrl
