---
layout: essay
lang: en
pid: careers_en
postTitle: Legends, One-club men and Journeymen
header_type: small

author: Author
category: essays
timeline: 1

dialog: black-text left transparent

excerpt: "The history of football visualized through the careers of its players from 1920 to today"
---
  <div class="row fixed-header">
    <div class="header col-xs-12">
      <section>
        <h1>Legends, <br class="hide"/>One-club men <br/>and Journeymen</h1>
        <p>The history of football through the careers<br/> of its players from 1920 to today.</p>
        <div class="note">
          by <a href="https://twitter.com/littleark" target="_blank" title="Carlo on twitter">Carlo Zapponi</a> and
          <a href="https://twitter.com/framis74" target="_blank" title="Francesco on twitter">Francesco Mistrulli</a>
        </div>
        <div class="social">
            <a class="twitter_link" href="https://twitter.com/intent/tweet?text={{page.postTitle}}%20-%20{{page.excerpt | strip_html}}&url={{site.url}}{{ page.url }}&via=ftblsm&hashtags=football,dataviz" title="Share on Twitter" target="_blank"><i class="icon-twitter"></i></a>
            <a href="https://www.facebook.com/sharer/sharer.php?t={{page.postTitle}}&u={{site.url}}{{ page.url }}" target="_blank" title="Share on Facebook"><i class="icon-facebook" title="Share on Facebook"></i></a>
        </div>
      </section>
      <a class="lang-link" href="/leggende-bandiere-e-giramondo" title="Leggende, bandiere e giramondo">Italian version</a>
    </div>
  </div>
  <div id="transfersRoot" class="overlapping-content"></div>

<script>
  fetch("{{ site.baseurl }}/assets/transfers/asset-manifest.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    var mainCSS = json['main.css'];
    var newCSS = document.createElement("link");
    newCSS.setAttribute("rel","stylesheet");
    newCSS.setAttribute("href","{{ site.baseurl }}/assets/transfers/"+mainCSS)
    // console.log('css',newCSS)
    document.querySelector("head").appendChild(newCSS);

    var mainJS = json['main.js'];
    var newJS = document.createElement("script");
    newJS.setAttribute("type","text/javascript");
    newJS.setAttribute("src","{{ site.baseurl }}/assets/transfers/"+mainJS);
    // console.log('js',newJS)
    document.querySelector("body").appendChild(newJS);

  })
</script>
