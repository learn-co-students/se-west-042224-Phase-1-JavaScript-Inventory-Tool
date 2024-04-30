//////////////////////////////////////////////////////////
// Fetch Data & Call render functions to populate the DOM
//////////////////////////////////////////////////////////
getJSON("http://localhost:3000/stores")
  .then((stores) => {
    // this populates a select tag with options so we can switch between stores on our web page
    renderStoreSelectionOptions(stores);
    renderHeader(stores[0]);
    renderFooter(stores[0]);
  })
  .catch((err) => {
    console.error(err);
    // renderError('Make sure to start json-server!') // I'm skipping this so we only see this error message once if JSON-server is actually not running
  });

// load all the books and render them
getJSON("http://localhost:3000/books")
  .then((books) => {
    books.forEach(renderBook);
  })
  .catch(renderError);

///////////////////
// render functions
///////////////////
function renderHeader(store) {
  document.querySelector("#store-name").textContent = store.name;
}

function renderFooter(bookStore) {
  document.querySelector("#address").textContent = bookStore.address;
  document.querySelector("#number").textContent = bookStore.number;
  document.querySelector("#store").textContent = bookStore.location;
}

// target the select tag
const storeSelector = document.querySelector("#store-selector");

// adds options to a select tag that allows swapping between different stores
function renderStoreSelectionOptions(stores) {
  // clear out any currently visible options
  storeSelector.innerHTML = "";
  // add an option to the select tag for each store
  stores.forEach(addSelectOptionForStore);
  // add a listener so that when the selection changes, we fetch that store's data from the server and load it into the DOM
  storeSelector.addEventListener("change", (e) => {
    getJSON(`http://localhost:3000/stores/${e.target.value}`).then((store) => {
      renderHeader(store);
      renderFooter(store);
    });
  });
}

function addSelectOptionForStore(store) {
  const option = document.createElement("option");
  // the option value will appear within e.target.value
  option.value = store.id;
  // the options textContent will be what the user sees when choosing an option
  option.textContent = store.name;
  storeSelector.append(option);
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

  // this new code adds an input field which both shows the current inventory and will allow changes to the inventory of a book
  const inventoryInput = document.createElement("input");
  inventoryInput.type = "number";
  inventoryInput.className = "inventory-input";
  inventoryInput.value = book.inventory;
  inventoryInput.min = 0;
  li.append(inventoryInput);

  // add code to update inventory
  inventoryInput.addEventListener("change", (e) => {
    // console.log('new value', e.target.value) // checking how to get the new value
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inventory: parseInt(e.target.value) }), // <input> values are strings by default
    };
    fetch(`http://localhost:3000/books/${book.id}`, config)
      .then((response) => response.json())
      .then((updatedBook) => {
        if (updatedBook.inventory === 0) {
          // pessimistic rendering
          pStock.textContent = "Out of stock";
        } else if (updatedBook.inventory < 3) {
          pStock.textContent = "Only a few left!";
        } else {
          pStock.textContent = "In stock";
        }
      });
  });

  const pStock = document.createElement("p");
  pStock.className = "grey";
  if (book.inventory === 0) {
    pStock.textContent = "Out of stock";
  } else if (book.inventory < 3) {
    pStock.textContent = "Only a few left!";
  } else {
    pStock.textContent = "In stock";
  }
  li.append(pStock);

  const img = document.createElement("img");
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;
  li.append(img);

  const btn = document.createElement("button");
  btn.textContent = "Delete";

  btn.addEventListener("click", (e) => {
    // add code to delete book from db
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          // pessimitic rendering
          li.remove();
        } else {
          renderError(res.statusText);
        }
      })
      .catch(renderError);
    // li.remove(); // optimistic rendering
  });
  li.append(btn);

  document.querySelector("#book-list").append(li);
}

function renderError(error) {
  const main = document.querySelector("main");
  const errorDiv = document.createElement("div");
  errorDiv.className = "error";
  if (error.message === "Failed to fetch") {
    errorDiv.textContent =
      "Whoops! Looks like you forgot to start your JSON-server!";
  } else {
    errorDiv.textContent = error;
  }
  main.prepend(errorDiv);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      errorDiv.remove();
    }
  });
}

function fillIn(form, data) {
  for (field in data) {
    if (form[field]) {
      form[field].value = data[field];
    }
  }
}

// New Function to populate the store form with a store's data to update
function populateStoreEditForm(store) {
  const form = document.querySelector("#store-form");
  form.dataset.storeId = store.id; // adds store id to the form's dataset in the DOM
  fillIn(form, store);
  showStoreForm();
}

function formatPrice(price) {
  let formattedPrice = Number.parseFloat(price).toFixed(2);
  return `$${formattedPrice}`;
}

////////////////////
// Event Handlers
///////////////////

// Book Form button
const toggleBookFormButton = document.querySelector("#toggleBookForm");
const bookForm = document.querySelector("#book-form");
let bookFormVisible = !bookForm.classList.contains("collapsed");

function toggleBookForm() {
  if (bookFormVisible) {
    hideBookForm();
  } else {
    showBookForm();
  }
}

function showBookForm() {
  bookFormVisible = true;
  bookForm.classList.remove("collapsed");
  toggleBookFormButton.textContent = "Hide Book form";
}

function hideBookForm() {
  bookFormVisible = false;
  bookForm.classList.add("collapsed");
  toggleBookFormButton.textContent = "New Book";
}

toggleBookFormButton.addEventListener("click", toggleBookForm);

// Store Form button
const toggleStoreFormButton = document.querySelector("#toggleStoreForm");
const storeForm = document.querySelector("#store-form");
let storeFormVisible = false;

function toggleStoreForm() {
  if (storeFormVisible) {
    hideStoreForm();
  } else {
    showStoreForm();
  }
}

function hideStoreForm() {
  document.querySelector("#store-form").classList.add("collapsed");
  storeFormVisible = false;
  storeEditMode = false;
  storeForm.reset();
  toggleStoreFormButton.textContent = "New Store";
}

function showStoreForm() {
  document.querySelector("#store-form").classList.remove("collapsed");
  storeFormVisible = true;
  toggleStoreFormButton.textContent = "Hide Store form";
  storeForm.querySelector('[type="submit"]').value = storeEditMode
    ? "SAVE STORE"
    : "ADD STORE";
}

toggleStoreFormButton.addEventListener("click", toggleStoreForm);

// allow escape key to hide either form
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideStoreForm();
    hideBookForm();
  }
});

// book form submit
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // pull the info for the new book out of the form
  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: e.target.price.value,
    reviews: [],
    inventory: Number(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value,
  };

  // pessimistic rendering here:
  postJSON("http://localhost:3000/books", book)
    .then((book) => {
      renderBook(book);
      e.target.reset();
    })
    .catch(renderError);
});

// store form submit

storeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const store = {
    name: e.target.name.value,
    address: e.target.address.value,
    number: e.target.number.value,
    hours: e.target.hours.value,
    location: e.target.location.value,
  };

  if (storeEditMode) {
    // ✅ write code for updating the store here
    patchJSON(
      `http://localhost:3000/stores/${e.target.dataset.storeId}`,
      store
    ).then((updatedStore) => {
      renderHeader(updatedStore);
      renderFooter(updatedStore);
      storeSelector.querySelector(
        `option[value="${updatedStore.id}"]`
      ).textContent = updatedStore.name;
    });
  } else {
    postJSON("http://localhost:3000/stores", store)
      .then(addSelectOptionForStore)
      .catch(renderError);
  }
  hideStoreForm();
  e.target.reset();
});

// edit store button
const editStoreBtn = document.querySelector("#edit-store");
let storeEditMode = false;

editStoreBtn.addEventListener("click", (e) => {
  const selectedStoreId = document.querySelector("#store-selector").value;
  storeEditMode = true;
  getJSON(`http://localhost:3000/stores/${selectedStoreId}`).then(
    populateStoreEditForm
  );
});

fillIn(bookForm, {
  title: "Designing Data-Intenseive Applications",
  author: "Martin Kleppmann",
  price: 22.2,
  imageUrl:
    "https://m.media-amazon.com/images/I/51ZSpMl1-LL._SX379_BO1,204,203,200_.jpg",
  inventory: 1,
});
