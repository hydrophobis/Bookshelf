# Bookshelf

A small library for managing large amounts of data in a three layer tree<br><br>

You Bookshelf consists of:<br>
Shelves, hold an array of books<br>
Books, hold an array of pages<br>
Pages, hold an array of data<br><br>

Usage:<br>
Page:<br>
Constructor args, pageNumber(default -1), data(default null), pageLength(length of the pages array, default 10)<br>
searchPage(term), returns 0 or 1 depending on whether or not the page contains term<br><br>

Book: <br>
Constructor args, title(default Untitled), author(default Unknown)<br>
pages, array of pages in the book<br>
access(book, author), simple way to check if the author in the input can access the book in the input<br>
newPage(number, data, pageLength), creates a new instance of Page, adds it to the array, then returns it<br>
author(), returns author<br>
title(), returns title<br>
pushPage(page), adds an existing page to the end of the book<br>
popPage(), removes the last page in the book<br>
insertPage(page, position), adds the page to that position in the array<br>
viewPages(), unimplemented<br><br>


Shelf:<br>
Constructor args, books (defaults to no books)<br>
pushBook(book), adds an existing book to the shelf<br>
popBook(), removes the last book in the shelf<br>
insertBook(book, position), inserts the book to the given position in the array<br>
viewBooks(titleFilter), returns all books, or when specified returns books with a given title<br>
searchBookshelf(term), searches book titles and page content for term<br>
sortBookTitle(), sorts books from a to z<br>
sortBookAuthor(), sorts books from a to z<br>
changeBookTitle(oldTitle, newTitle), changes any books with oldTitle as their title to newTitle<br>
removeByTitle(title), removes books with the given title<br>
paginateBooks(pageNumber, pageSize), creates the given amount of pages with the given amount of length in the books. DELETES CONTAINED DATA OF THE BOOKS<br>
exportBook(), exports the data in JSON format<br>
