

class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}



class UI {
  static showBooks() {
    const books = Data.getBooks()

    books.forEach((book, i) => {
      UI.addBookList(book)
    })
  }

  static addBookList(book) {
    const $container = document.getElementById('list-books')
    const $tr = document.createElement('tr')
    $tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><button class="btn btn-danger btn-sm delete">X</button></td>
    `
    $container.appendChild($tr)
  }


  static removeBookList(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove()
    }
  }


  static showAlert(message, className) {
    const $container = document.querySelector('.container')
    const $form = document.getElementById('form-book')

    const div = document.createElement('div')
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))

    $container.insertBefore(div, $form)

    setTimeout(() => {
      div.remove()
    }, 3000)
  }

  static cleanForm() {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
  }
}



class Data {
  static getBooks() {
    let books
    if(localStorage.getItem('books') === null) {
      books = []
    } else {
      books =  JSON.parse(localStorage.getItem('books'))
    }
    return books
  }


  static addBook(book) {
    const books =  Data.getBooks()
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))

    document.getElementById('list-books').innerHTML = ''
    UI.showBooks()
  }


  static removeBook(isbn) {
    console.log(isbn)
    const books = Data.getBooks()

    books.forEach((book, i) => {
      if(book.isbn === isbn) {
        books.splice(i, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books))

    UI.showAlert('Borrado Correctamente', 'success')
  }
}


document.addEventListener('DOMContentLoaded', e => UI.showBooks())



const $form = document.getElementById('form-book')

$form.addEventListener('submit', e => {
  e.preventDefault()

  // Get values
  
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const isbn = document.getElementById('isbn').value
  


  if(title === '' || author === '' || isbn === '') {
    UI.showAlert('Debes ingresar todos los campos.', 'danger')
  } else {
    const book = new Book(title, author, isbn)
    Data.addBook(book)
    UI.showAlert('Agregado Correctamente', 'success')

    UI.cleanForm()
  }
})


// Delete Book

const $ListBooks = document.getElementById('list-books')

$ListBooks.addEventListener('click', e => {
  UI.removeBookList(e.target)
  Data.removeBook(e.target.parentElement.previousElementSibling.textContent)
})