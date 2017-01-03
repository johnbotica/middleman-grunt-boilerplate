/**
 * Throttle execution of a function
 *
 * Limits the amount of times a function can be called. Useful for
 * controlling rapidly occurring events such as scrolling.
 *
 * Example with a standalone function:
 *
 *   var myFunction = function(){
 *     console.log(window.scrollTop)
 *   }
 *   throttle(myFunction, 100)
 *
 * Or, in reference to a method on an Object:
 *
 *   var MyClass = function(){
 *     this.myFunction = function(){
 *       console.log(window.scrollTop)
 *     }
 *
 *     // The .bind(this) will keep the meaning of "this" as the MyClass
 *     // instance when executing this.myFunction
 *     $(window).on('scroll', throttle(this.myFunction.bind(this), 100))
 *   }
 *
 * @param  {Function} callback Function to throttle
 * @param  {Number}   limit    Minimum time between executions in milliseconds
 * @return {Function}
 */
export default function(callback, limit) {
  let wait = false;
  return function() {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(function() {
        wait = false;
      }, limit);
    }
  }
}
