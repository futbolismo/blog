---
layout: essay

pid: careers
postTitle: The careers of players


author: Author
category: miserie
timeline: 1

dialog: black-text left

excerpt: "bla bla"
---
<div id="transfersRoot"></div>
<script>
  fetch("{{ site.baseurl }}/assets/essays/transfers/index.html")
  .then(function(response) {
    return response.text();
  })
  .then(function(html) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");

    console.log(doc)

    var mainCSS = doc.querySelector("head link[rel='stylesheet']");
    console.log(mainCSS)
    var newCSS = document.createElement("link");
    newCSS.setAttribute("rel","stylesheet");
    newCSS.setAttribute("href","{{ site.baseurl }}/assets/essays"+mainCSS.getAttribute("href"))
    document.querySelector("head").appendChild(newCSS);

    var mainJS = doc.querySelector("body script");
    var src = mainJS.getAttribute("src");
    console.log(mainJS)

    var newJS = document.createElement("script");
    newJS.setAttribute("type","text/javascript");
    newJS.setAttribute("src","{{ site.baseurl }}/assets/essays/"+src);

    document.querySelector("body").appendChild(newJS);

  })
</script>
