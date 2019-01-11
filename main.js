// Book object
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

// Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (books.isbn = isbn) {
                book.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

}
// UI
class UI {
    static displayBooks() {

        const books = Store.getBooks();

        books.forEach((book) => {
            UI.addBookToList(book);
        })
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML =
            `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a class="btn btn-danger btn-sm delete text-white">X</a></td>
        `;

        list.appendChild(row);

    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // Vanish in 2.5 seconds

        setTimeout(() => document.querySelector('.alert').remove(), 2500)
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

}


// Display Books
document.addEventListener('DOMContentLoaded',
    UI.displayBooks()
    // console.log('hello')
);

// Handle adding a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all the fields!', 'danger')
    } else {
        // Instantiate book
        const book = new Book(title, author, isbn);

        // Add Book to UI
        UI.addBookToList(book);

        // Add Book to Store
        Store.addBook(book);

        // Show success message
        UI.showAlert('Book has been added', 'success')

        // Clear fields
        UI.clearFields();
    }

})


// Handle removing a book

document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove from Store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show success message
    UI.showAlert('Book has been removed!', 'warning')
})