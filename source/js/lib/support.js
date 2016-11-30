"use strict"

import supportsCss from '../helpers/supports-css'

class Support {
  constructor() {
    this.html = $(document.body.parentNode)

    this.cssRules = ["clip-path", "-webkit-clip-path"]

    this.checkCssSupport()
  }

  checkCssSupport() {
    this.cssRules.forEach((cssRule) => {
      if(supportsCss(cssRule)) {
        this.html.addClass(`has-${cssRule}`)
      }
    })
  }
}

export default Support
