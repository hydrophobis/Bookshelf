class Page {
  constructor(number = -1, data = null, pageLength = 10){
    this.pageNumber = number;
    this.pageLength = pageLength;
    this.pageData = new Array(pageLength).fill(data);
  }

  searchPage(data){
    return pageData.indexOf(data) !== -1;
  }

  
}






class Book {
  constructor(title = "Untitled", author = "Unknown") {
    this.title = title;
    this.author = author;
  }

  let pages = [];

  newPage(number, data, pageLength){
    let page = new Page(number, data, pageLength); 
    pages.push(page);
    return page;
  }

  addPage(page){
    if(!page instanceof Page){
      return -1;
    }
    pages.push(page);
    return 0;
  }

  author(){
    return this.author;
  }

  title(){
    return this.title;
  }

    // Adds a new book
  pushPage(page) {
    if (page instanceof Page) {
      this.pages.push(page);
      return true; // Return true if book is added successfully
    } else {
      console.error("Only instances of Page can be added.");
      return false; // Return false if fail
    }
  }

  // Removes the last book
  popPage() {
    if (this.pages.length > 0) {
      return this.pages.pop();
    } else {
      console.error("No pages to remove.");
      return null;
    }
  }

  // Inserts a book at a specific position
  insertPage(page, position) {
    if (!(page instanceof Page)) {
      console.error("Only instances of Page can be added.");
      return false; // Return false if book addition fails
    }

    if (position < 1 || position > this.pages.length + 1) {
      console.error("Position out of bounds.");
      return false; // Return false if position is out of bounds
    }

    this.books.splice(position - 1, 0, page);
    return true; // Return true if book is inserted successfully
  }

  // Returns all books on the shelf, or when specified, only books with a specific title
  viewPages(titleFilter = null) {
    if (!titleFilter) {
      return this.pages.map((book, index) => `${pageNumber}: ${pageData}`);
    } else {
      return this.pages
        .filter((page) => page.title === titleFilter)
        .map((page, index) => `${pageNumber}: ${pageData}`);
    }
  }
}






class Shelf {
  constructor(books = []) {
    this.books = books;
  }

  // Adds a new book
  pushBook(book) {
    if (book instanceof Book) {
      this.books.push(book);
      return true; // Return true if book is added successfully
    } else {
      console.error("Only instances of Book can be added.");
      return false; // Return false if book addition fails
    }
  }

  // Removes the last book
  popBook() {
    if (this.books.length > 0) {
      return this.books.pop();
    } else {
      console.error("No books to remove.");
      return null;
    }
  }

  // Inserts a book at a specific position
  insertBook(book, position) {
    if (!(book instanceof Book)) {
      console.error("Only instances of Book can be added.");
      return false; // Return false if book addition fails
    }

    if (position < 1 || position > this.books.length + 1) {
      console.error("Position out of bounds.");
      return false; // Return false if position is out of bounds
    }

    this.books.splice(position - 1, 0, book);
    return true; // Return true if book is inserted successfully
  }

  // Returns all books on the shelf, or when specified, only books with a specific title
  viewBooks(titleFilter = null) {
    if (!titleFilter) {
      return this.books.map((book, index) => `${index + 1}: ${book.title}`);
    } else {
      return this.books
        .filter((book) => book.title === titleFilter)
        .map((book, index) => `${index + 1}: ${book.title}`);
    }
  }

  // Searches the entire data tree for a single term
  searchBookshelf(term) {
    let results = [];

    this.books.forEach((book) => {
      if (book.title.includes(term)) {
        results.push({ book: book.title, location: "Title" });
      }

      if (book.pageData && book.pageData.indexOf(term) !== -1) {
        results.push({ book: book.title, location: "Page Data" });
      }
    });

    return results;
  }

  // Sorts books by title
  sortBookTitle() {
    this.books.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Sorts books by author
  sortBookAuthor() {
    this.books.sort((a, b) => a.author.localeCompare(b.author));
  }

  // Updates book details by title
  changeBookTitle(title, newTitle) {
    const bookIndex = this.books.findIndex((book) => book.title === title);
    if (bookIndex !== -1) {
      this.books[bookIndex].title = newTitle;
      return true; // Return true if book details are updated successfully
    } else {
      console.error("Book not found.");
      return false; // Return false if book is not found
    }
  }

  // Removes books by title
  removeByTitle(title) {
    const initialLength = this.books.length;
    this.books = this.books.filter((book) => book.title !== title);
    return initialLength - this.books.length; // Return number of books removed
  }

  // Paginates books
  paginateBooks(pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return this.books.slice(startIndex, startIndex + pageSize);
  }

  // Export books data in JSON format
  exportBooks() {
    return JSON.stringify(this.books);
  }
}
