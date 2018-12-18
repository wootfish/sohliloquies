// for posts that use MathJax for LaTeX rendering, so we can show an
// explanatory message only to users who have javascript disabled

var element=document.getElementById("noscript_notice")
element.parentNode.removeChild(element)
alert("i'm not being blocked!")
