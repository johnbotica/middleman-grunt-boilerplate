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
