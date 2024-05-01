const resultsDiv = document.querySelector("#results");

const apiSearchForm = document.querySelector("#api-Search");

apiSearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = encodeURI(e.target.search.value);
  console.log(query);
  e.target.reset();
  // fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=episodes`)
  //   .then(r => r.json())
  //   .then(show => {
  //     console.log("🚀 ~ apiSearchForm.addEventListener ~ show:", show)
  //     const episode1 = show._embedded.episodes[0]
  //     const elements = [
  //       createElement('h1', {textContent: show.name}),
  //       createElement('img', {
  //         src: episode1.image.medium,
  //         alt: `${episode1.name} poster`
  //       }),
  //       createElement('div', {innerHTML: show.summary})
  //     ]
  //     resultsDiv.append(...elements)
  //     show._embedded.episodes.forEach(episode => {
  //       const epiElements = [
  //         createElement('h2', {textContent: `S${episode.season}E${episode.number}: ${episode.name}`}),
  //         createElement('img', { src: episode.image.medium, alt: `${episode.name} poster`}),
  //         createElement('div', { innerHTML: episode.summary })
  //       ]
  //     resultsDiv.append(...epiElements)
  //     })
  //   })
});
