---
layout: essay
lang: it
pid: careers_it
postTitle: Leggende, bandiere e giramondo
header_type: small

author: Author
category: essays
timeline: 1

dialog: black-text left

excerpt: "La storia del calcio raccontata attraverso le carriere<br/> dei suoi interpreti dal 1920 ad oggi."
---

  <div class="row fixed-header">
    <div class="header col-xs-12">
      <section>
        <h1>Leggende, <br/>bandiere <br/>e giramondo</h1>
        <p>
          La storia del calcio raccontata attraverso le carriere<br/> dei suoi interpreti dal 1920 ad oggi.
        </p>
        <div class="note">
          di <a href="https://twitter.com/littleark" target="_blank" title="Carlo su twitter">Carlo Zapponi</a> e
          <a href="https://twitter.com/framis74" target="_blank" title="Francesco su twitter">Francesco Mistrulli</a>
        </div>
        <div class="social">
            <a class="twitter_link" href="https://twitter.com/intent/tweet?text={{title}}&url={{site.url}}&via=ftblsm&hashtags=calcio,football" title="Condividi via Twitter" target="_blank"><i class="icon-twitter"></i></a>
            <a href="https://www.facebook.com/sharer/sharer.php?t={{title}}&u={{site.url}}" target="_blank" title="Condividi su Facebook"><i class="icon-facebook" title="Share on Facebook"></i></a>
        </div>
        <br/><br/>
        <a href="/legends-one-club-men-and-journeymen" title="Legends, One-team-men and Journeymen">English version</a>
      </section>
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
