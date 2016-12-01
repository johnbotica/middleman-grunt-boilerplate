"use strict"

// tktk highlighter
import "./lib/tktk"

// CSS support classes
import "./lib/support"

// Bootstrap libraries
import '../vendor/bootstrap/js/src/alert'
import '../vendor/bootstrap/js/src/button'
import '../vendor/bootstrap/js/src/carousel'
import '../vendor/bootstrap/js/src/collapse'
import '../vendor/bootstrap/js/src/dropdown'
import '../vendor/bootstrap/js/src/modal'
import '../vendor/bootstrap/js/src/popover'
import '../vendor/bootstrap/js/src/scrollspy'
import '../vendor/bootstrap/js/src/tab'
import '../vendor/bootstrap/js/src/tooltip'
import '../vendor/bootstrap/js/src/util'

// jQuery lazy loading
import '../vendor/jquery.unveil'

$(() => {
  // Initialize CSS support classes
  new Support()

  // Initialize image lazy loading
  $('img[data-src]').unveil(200, function() {
    $(this).on('load', function(event){
      $(this).removeClass('loading')
    })
  })

  $(document).on('slide.bs.carousel', function(event){
    $('img[data-src]', event.relatedTarget).trigger('unveil')
  })
})
