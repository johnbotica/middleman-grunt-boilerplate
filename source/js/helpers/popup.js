"use strict"

const popup = function(href, width = 500, height = 300) {
  const dimensions = {
    width: width,
    height: height,
    screenLeft: window.screenLeft || screen.left,
    screenTop: window.screenTop || screen.top,
    windowWidth: window.innerWidth || document.documentElement.clientWidth || screen.width,
    windowHeight: window.innerHeight || document.documentElement.clientHeight || screen.height
  }
  const features = [
    "menubar=no",
    "location=no",
    "resizable=yes",
    "scrollbars=yes",
    "status=no",
    "personalbar=no",
    "toolbar=no",
    "chrome=no",
    `width=${dimensions.width}`,
    `height=${dimensions.height}`,
    `left=${dimensions.windowWidth/2 - dimensions.width/2 + dimensions.screenLeft}`,
    `top=${dimensions.windowHeight/2 - dimensions.height/2 + dimensions.screenTop}`
  ]

  window.open(href, `${new Date().getTime()}`, features.join(","))
}

export default popup
