/*variables initialisation*/

let formDiv = document.querySelector("#formDiv");
let newBook;
let myLibrary = [];

/*EVENTS*/
let submit = document.querySelector("#subButton");
submit.addEventListener("click", addBookToLibrary);

let addBook = document.querySelector("#addBook");
addBook.addEventListener("click", function () {
  formDiv.style.display = "block";
});
function Book() {
  // the constructor...
  this.title = form.title.value;
  this.author = form.author.value;
  this.pages = form.pages.value;
  this.read = form.read.checked;
}
/*book  Object constructor*/
function addBookToLibrary() {
  event.preventDefault();
  newBook = new Book();
  if (newBook.title != "") {
    myLibrary.push(newBook);
    saveData();
    loopArray();
  }
  formDiv.style.display = "none";
  form.reset();
}
/*add book to array myLibrary*/

function loopArray() {
  for (let i = 0; i < myLibrary.length; i++) {
    if (!document.getElementById(i)) {
      createBook(myLibrary[i]);
    }
  }
}
/*loop the array myLibrary and call createBook function at each iteration*/

function createBook(book) {
  let books = document.querySelector("#books");
  let divB = document.createElement("div");
  let title = document.createElement("div");
  let author = document.createElement("div");
  let pages = document.createElement("div");
  let read = document.createElement("button");
  let remove = document.createElement("button");

  title.textContent = book.title;
  title.classList.add("title");
  divB.appendChild(title);

  author.textContent = book.author;
  author.classList.add("author");
  divB.appendChild(author);

  pages.textContent = book.pages;
  pages.classList.add("pages");
  divB.appendChild(pages);

  read.addEventListener("click", function () {
    if (book.read) {
      read.textContent = "Not Read Yet";
      read.style.backgroundColor = "#f815158c";
      read.classList.replace("read", "noRead");
      book.read = false;
      saveData();
    } else {
      read.textContent = "Read";
      read.classList.replace("noRead", "read");
      read.style.backgroundColor = "green";
      book.read = true;
      saveData();
    }
  });

  if (book.read) {
    read.textContent = "Read";
    read.style.backgroundColor = "green";
    read.classList.add("read");
  } else {
    read.textContent = "Not Read Yet";
    read.style.backgroundColor = "#f815158c";
    read.classList.add("noRead");
  }

  divB.appendChild(read);

  remove.textContent = "remove";
  remove.style.backgroundColor = "#dbdad9";
  remove.classList.add("remove");
  remove.addEventListener("click", function () {
    document.getElementById(myLibrary.indexOf(book)).remove();

    myLibrary.splice(myLibrary.indexOf(book), 1);
    saveData();
  });
  divB.appendChild(remove);

  divB.setAttribute("id", myLibrary.indexOf(book));
  books.appendChild(divB);
}
/*create all the components of the card that displays each books*/

function saveData() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}
/*save myLibrary into the localStorage*/

function restore() {
  if (!localStorage.myLibrary) {
    loopArray();
  } else {
    let objects = localStorage.getItem("myLibrary"); // gets information from local storage to use in below loop to create DOM/display
    objects = JSON.parse(objects);
    myLibrary = objects;
    loopArray();
  }
}
/*get the saved array myLibrary,parse it and loop it so it displays all books*/

restore();
