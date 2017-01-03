"use strict"

// Cache for elements
let elementCache = {}

/**
 * Get jQuery extended elements
 *
 * Iterates through an Object of selectors and retrieves the jQuery
 * extended objects of those selectors. Returns an Object of those
 * jQuery extended objects for caching.
 *
 * @param {Object} selectors Object of selectors to retrieve and cache
 * @param {mixed} context jQuery extended Object, selector or DOM element to use as a context
 * @param {Boolean} cached Use Impress global cache or always query new
 *
 * @return {Object} Object of jQuery extended elements
 */
const getElements = function(selectors, context = document, cached = false) {
  let elements = {}
  let $context = $(context)

  $.each(selectors, (key, selector) => {
    if($.isPlainObject(selector)) {
      elements[key] = getElements(selector, context, cached)
    } else {
      elements[key] = (cached && elementCache[selector]) ? elementCache[selector] : elementCache[selector] = $(selector, $context)
    }
  });

  return elements
}

export default getElements
