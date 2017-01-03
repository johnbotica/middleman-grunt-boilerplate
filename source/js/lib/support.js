"use strict"

import supportsCss from '../helpers/supports-css'

/**
 * CSS Support classes
 *
 * Adds classes to the `html` element for the CSS rules checked.
 *
 * Example:
 *   // Adds "has-clip-path" and "has--webkit-clip-path" if the browser
 *   // supports those rules, or "no-clip-path" and "no--webkit-clip-path"
 *   // if the browser does not support those rules
 *   new Support(["clip-path", "-webkit-clip-path"])
 */
class Support {
  constructor(rules) {
    this.html = $(document.body.parentNode)

    this.cssRules = rules

    this.checkCssSupport()
  }

  checkCssSupport() {
    this.cssRules.forEach((cssRule) => {
      if(supportsCss(cssRule)) {
        this.html.addClass(`has-${cssRule}`)
      } else {
        this.html.addClass(`no-${cssRule}`)
      }
    })
  }
}

export default Support
