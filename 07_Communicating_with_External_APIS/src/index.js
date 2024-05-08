const resultsDiv = document.querySelector("#results");

const apiSearchForm = document.querySelector("#api-Search");

apiSearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = encodeURI(e.target.search.value);
  console.log(query);
  e.target.reset();
  resultsDiv.innerHTML = "";
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`)
    .then((r) => r.json())
    .then((result) => {
      result.items.forEach((book) => {
        const title = document.createElement("h1");
        title.textContent = book.volumeInfo.title;
        const cover = document.createElement("img");
        cover.src = book.volumeInfo.imageLinks
          ? book.volumeInfo.imageLinks.thumbnail
          : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
        const pAuthors = document.createElement("p");
        if (book.volumeInfo.authors) {
          pAuthors.textContent = `by ${book.volumeInfo.authors.join(", ")}`;
        } else {
          pAuthors.textContent = "no authors available";
        }
        const descrip = document.createElement("p");
        descrip.textContent = book.volumeInfo.description;
        resultsDiv.append(title, cover, pAuthors, descrip);
      });
    });
});
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
// });
