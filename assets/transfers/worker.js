onmessage = function(e) {
  console.log('Worker: Message received from main script');
  if(e.data.type === 'autocomplete-sorting') {

    // fetch(
    //   `https://raw.githubusercontent.com/futbolismo/blog/gh-pages/assets/data/listMajorFromCareers.json` // ?${+new Date()}
    // )
    fetch(
      `https://raw.githubusercontent.com/futbolismo/blog/gh-pages/assets/data/${e.data.file}?${+new Date()}` // ?${+new Date()}
    )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(json => {

      const extraList = ['Ada Hegerberg-Jul 10, 1995','Said Altınordu-Jul 24, 1912'];

      const dataList = [...json, ...extraList].map(d => {
          const label = d.replace(/ †/gi, "");
          const name = label.replace(/-.{3}\s.*$/i, '').replace(/-n\/a/gi, '');
          let value = label;
          try {
            value = label.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          } catch(e) {
            console.log('string.normalize(\'NFD\') not supported');
          }
          return {
            label,
            name,
            value,
          };
        }).sort((a, b) => {
          const wordA = a.name;
          const wordB = b.name;
          if (wordB.match(wordA)) return -1;
          if (wordA.match(wordB)) return 1;
          if (wordA < wordB) return -1;
          if (wordA > wordB) return 1;
          return 0;
        });

      const sortedItems = dataList.sort((a, b) => {
        a.name =
          a.name || (a.label && a.label.replace(/-.{3}\s.*$/i, '').replace(/-n\/a/gi, '')); //  || a.value.split("-")[0];
        b.name =
          b.name || (b.label && b.label.replace(/-.{3}\s.*$/i, '').replace(/-n\/a/gi, '')); // || b.value.split("-")[0];

        const wordA = a.name; // wordArrayA.length < 2 ? wordArrayA[0] : `${wordArrayA[1]} ${wordArrayA[0]}`;
        const wordB = b.name; // wordArrayB.length < 2 ? wordArrayB[0] : `${wordArrayB[1]} ${wordArrayB[0]}`;

        // console.log(wordA,'vs',wordB)

        if (wordB.match(wordA)) return -1;
        if (wordA.match(wordB)) return 1;

        if (wordA < wordB) return -1;
        if (wordA > wordB) return 1;

        // return a.name.length - b.name.length;
        return 0;
      });
      console.log('Worker: Posting sorted list back');
      postMessage({
        file: e.data.file,
        listLength: sortedItems.length,
        sortedItems,
        flatList: sortedItems.map(d => d.value)
      });
    });
  }
}
