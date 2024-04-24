//document.addEventListener("DOMContentLoaded", () => {// your logic here})
// this is the way it was done before <script defer />

//////////////////////////////////////
// Select elements (that will be referenced frequently)
//////////////////////////////////////
const toggleFormButton = document.querySelector("#toggleForm");
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

//////////////////////////////////////
// render functions  (Data => Display)
//////////////////////////////////////

// create a function renderHeader() that takes the store name from bookStore and adds to the DOM
function renderHeader(bookStore) {
  document.querySelector("#store-name").textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.querySelector("#store").textContent = bookStore.location;
  document.querySelector("#number").textContent = bookStore.number;
  document.querySelector("#address").textContent = bookStore.address;
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
  const li = document.createElement("li");
  li.className = "list-li";

  const h3 = document.createElement("h3");
  h3.textContent = book.title;
  li.append(h3);

  const pAuthor = document.createElement("p");
  pAuthor.textContent = book.author;
  li.append(pAuthor);

  const pPrice = document.createElement("p");
  pPrice.textContent = formatPrice(book.price);
  li.append(pPrice);

  const img = document.createElement("img");
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;
  img.title = `${book.title} cover`;
  li.append(img);

  const btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.addEventListener("click", (e) => li.remove());
  li.append(btn);

  document.querySelector("#book-list").append(li);
}
////////////////////////////////////////////
// Event listeners & handlers (Behavior -> (DATA) -> Display -> Behavior)
////////////////////////////////////////////

function toggleBookForm() {
  const isHidden = bookForm.classList.toggle("collapsed");
  // console.log("🚀 ~ toggleBookForm ~ isHidden:", isHidden)
  if (isHidden) {
    toggleFormButton.innerText = "New Book";
  } else {
    toggleFormButton.innerText = "Hide Book Form";
  }
  // let buttonText
  // isHidden ? buttonText = "New Book" : "Hide Book Form"
  // toggleBookForm.textContent = buttonText
}

toggleFormButton.addEventListener("click", toggleBookForm);

function handleSubmit(event) {
  event.preventDefault();
  console.dir(event.target);
  console.log(event.target.title);
  console.log(event.target.title.value);
  const newBook = {
    title: event.target.title.value,
    author: event.target.author.value,
    price: event.target.price.value,
    inventory: event.target.inventory.value,
    imageUrl: event.target.imageUrl.value,
    reviews: [],
  };
  renderBook(newBook);
  event.target.reset();
  toggleBookForm();
}

bookForm.addEventListener("submit", handleSubmit);

window.addEventListener("keydown", (e) => {
  console.log(e.code);
  const isVisible = !bookForm.classList.contains("collapsed");
  if (isVisible && e.code == "Escape") {
    toggleBookForm();
  }
});

////////////////////////////////////////////
// call render functions to populate the DOM
////////////////////////////////////////////

renderHeader(bookStore);
renderFooter(bookStore);
// bookStore.inventory.forEach(renderBook);
renderAllBooks(bookStore)