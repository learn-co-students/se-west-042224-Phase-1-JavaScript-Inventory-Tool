//////////////////////////////////////
// Select elements (that will be referenced frequently)
//////////////////////////////////////
const toggleBookFormButton = document.querySelector("#toggleForm");
const bookForm = document.querySelector("#book-form");

//////////////////////////////////////
// Helper functions
//////////////////////////////////////
function formatPrice(price) {
  return "$" + Number.parseFloat(price).toFixed(2);
}

function fillIn(form, data) {
  form.title.value = data.title;
  form.author.value = data.author;
  form.price.value = data.price;
  form.imageUrl.value = data.imageUrl;
  form.inventory.value = data.inventory;
}

fillIn(bookForm, {
  title: "Designing Data-intensive Applications",
  author: "Martin Kleppmann",
  price: 22,
  inventory: 1,
  imageUrl:
    "https://m.media-amazon.com/images/I/51ZSpMl1-LL._SX379_BO1,204,203,200_.jpg",
});


/////////////////////////////////////
// render functions (Data => Display)
/////////////////////////////////////
function renderHeader(bookStore) {
  document.querySelector('#store-name').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.querySelector('#address').textContent = bookStore.address;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#store').textContent = bookStore.location;
}

function renderAllBooks(bookStore) {
  // bookStore.inventory.forEach(book => renderBook(book));
  bookStore.inventory.forEach(renderBook); // this syntax is shorthand for line above
}

// function: renderBook(book)
// --------------------------
// accepts a book object as an argument and creates
// an li something like this:
// <li class="list-li">
//   <h3>Eloquent JavaScript</h3>
//   <p>Marjin Haverbeke</p>
//   <p>$10.00</p>
//   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
// </li>
// appends the li to the ul#book-list in the DOM
function renderBook(book) {
    
  const li = document.createElement('li');
  li.className = 'list-li';
  
  const h3 = document.createElement('h3');
  h3.textContent = book.title;
  li.append(h3);

  const pAuthor = document.createElement('p');
  pAuthor.textContent = book.author;
  li.append(pAuthor);
  
  const pPrice = document.createElement('p');
  pPrice.textContent = formatPrice(book.price);
  li.append(pPrice);
  
  const pStock = document.createElement('p');
  pStock.className = "grey";
  if (book.inventory === 0) {
    pStock.textContent = "Out of stock";
  } else if (book.inventory < 3) {
    pStock.textContent = "Only a few left!";
  } else {
    pStock.textContent = "In stock"
  }
  li.append(pStock);
  
  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;
  li.append(img);

  const btn = document.createElement('button');
  btn.textContent = 'Delete';
  li.append(btn);

  btn.addEventListener('click', (e) => {
    li.remove();
  })


  document.querySelector('#book-list').append(li);
}


////////////////////////////////////////////////////////////////
// Event Listeners/Handlers (Behavior => Data => Display)
////////////////////////////////////////////////////////////////



function toggleBookForm() {
  const bookFormHidden = bookForm.classList.toggle('collapsed');
  if (bookFormHidden) {
    toggleBookFormButton.textContent = "New Book";
  } else {
    toggleBookFormButton.textContent = "Hide Book Form";
  }
}

// hide and show the new book form when toggle buton is clicked
toggleBookFormButton.addEventListener('click', () => {
  toggleBookForm();
});

// also hide the form when it's visible and the escape key is pressed
window.addEventListener('keydown', (e) => {
  const isVisible = !bookForm.classList.contains("collapsed");
  if (isVisible && e.code == "Escape") {
    toggleBookForm();
  }
})

// handle submitting new book form

function handleSubmit(e){
  e.preventDefault();

  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: parseFloat(e.target.price.value),
    inventory: parseInt(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value,
    reviews: []
  }
  
  e.target.reset(); // clear form
  toggleBookForm(); // hide book form
  renderBook(book); // display new book to DOM
}
bookForm.addEventListener('submit', handleSubmit)



////////////////////////////////////////////
// call render functions to populate the DOM
////////////////////////////////////////////

renderHeader(bookStore)
renderFooter(bookStore)
renderAllBooks(bookStore)



