---
layout: essay
lang: en
pid: careers_en
postTitle: Legends, One-club men and Journeymen
header_type: small

author: Author
category: essays
timeline: 1

dialog: black-text left

excerpt: "The history of football told through the careers<br/> of its players from 1920 till today."
---
  <div class="row fixed-header">
    <div class="header col-xs-12">
      <section>
        <h5>Visual Essay</h5>
        <h1>Legends, <br/>One-club men <br/>and Journeymen</h1>
        <p>The history of football told through the careers<br/> of its players from 1920 till today.</p>
        <div class="note">
          by <a href="https://twitter.com/littleark" target="_blank" title="Carlo on twitter">Carlo Zapponi</a> and
          <a href="https://twitter.com/framis74" target="_blank" title="Francesco on twitter">Francesco Mistrulli</a>
        </div>
        <div class="social">
            <a class="twitter_link" href="https://twitter.com/intent/tweet?text={{title}}&url={{site.url}}&via=ftblsm&hashtags=calcio,football" title="Condividi via Twitter" target="_blank"><i class="icon-twitter"></i></a>
            <a href="https://www.facebook.com/sharer/sharer.php?t={{title}}&u={{site.url}}" target="_blank" title="Condividi su Facebook"><i class="icon-facebook" title="Share on Facebook"></i></a>
        </div>
        <br/><br/>
        <a href="/leggende-bandiere-e-giramondo" title="Leggende, bandiere e giramondo">Italian version</a>
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
    console.log('css',newCSS)
    document.querySelector("head").appendChild(newCSS);

    var mainJS = json['main.js'];
    var newJS = document.createElement("script");
    newJS.setAttribute("type","text/javascript");
    newJS.setAttribute("src","{{ site.baseurl }}/assets/transfers/"+mainJS);
    console.log('js',newJS)
    document.querySelector("body").appendChild(newJS);

  })
</script>
