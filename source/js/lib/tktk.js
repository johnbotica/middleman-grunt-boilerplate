/**
 * Highlight outstanding images and copy
 *
 * Outlines images and highlights copy in magenta wherever "tktk" is found.
 * Simply start outstanding copy blocks with "tktk" to highlight text. Add
 * a "#tktk" to the end of image src valeus and un-defined href values to
 * outline images and highlight links respectively.
 */
$(function(){
  $('head').append(`<style type="text/css">.tktk, a[href*="#tktk"] {
  color: magenta !important;
}
img[src*="#tktk"] {
  box-shadow: 0 0 0 2px magenta;
}</style>`)

  $("p,li,dt,dd,blockquote,cite,div,h1,h2,h3,h4,h5,h6").filter(function(){
    return $(this).text().match(/^tktk/)
  }).each(function(){
    const $this = $(this)
    let html = $this.html()

    html = html.replace(/^tktk\s*/gi, "")

    $this.html(html)
    $this.addClass('tktk')
  })
})
