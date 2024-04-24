//BookStore has been moved to data.js 
console.log(bookStore);

function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

//* Create a function that uses a selector to get the header and add the bookStore name as its text content
// Renders Header
function renderHeader(){
  document.querySelector('#store-name').textContent = bookStore.name
}

//* Create a function that grabs all the divs from the footer and add the book store name, address, hours and/or phone number
// Renders Footer

function renderFooter(){
  const footerDivs = document.querySelectorAll("footer div")
  console.log("🚀 ~ renderFooter ~ footerDivs:", footerDivs)
  footerDivs[0].textContent = bookStore.name
  footerDivs[1].textContent = bookStore.number
  footerDivs[2].textContent = bookStore.address

}

// create a function called renderBook(book)
// it will take a book object as an argument
// and create the html struture for rendering 
// that book and insert it into our webpage!

const bookList = document.querySelector("#book-list") // selecting "anchor" element in global scope for easy reuse; "anchor" because we will append to it
bookList.innerHTML = '' // this "erases" the existing <li></li> from created in the DOM from the HTML doc


// function renderBook(book) {
// should create an li element that looks something like this:
  // <li class="list-li">
  //   <h3>Eloquent JavaScript : A Modern Introduction to Programming</h3>
  //   <p>Marjin Haverbeke</p>
  //   <p>$10.00</p>
  //   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
  //   <button>Delete</button>
  // </li>

function renderBook(book) {
  const li = document.createElement('li')
  const h3 = document.createElement('h3')
  const pAuthor = document.createElement('p')
  const pPrice = document.createElement('p')
  const img = document.createElement('img')
  const btn = document.createElement('button')

  li.classList.add('list-li')

  h3.textContent = book.title
  pAuthor.textContent = book.author
  pPrice.textContent = formatPrice(book.price)
  btn.textContent = "Delete"
  img.src = book.imageUrl

  li.append(h3, pAuthor, pPrice, img, btn)

  bookList.appendChild(li)
   // li.innerHTML = `  // using innerHTML is shorter, but comes with pitfalls and potential security issues
    //   <h3>${book.title}</h3>
    //   <p>${book.author}</p>
    //   <p>${formatPrice(book.price)}</p>
    //   <img src=${book.imageUrl} alt="${book.title} cover"/>
    //   <button>Delete</button>
    // `
    // li.classList.add('list-li')
    // bookList.appendChild(li)
}


// Organize function calls
renderHeader()
renderFooter()
bookStore.inventory.forEach(bookObj => renderBook(bookObj))