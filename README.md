# Bookshelf

A small library for managing large amounts of data in a three layer tree

You Bookshelf consists of:
Shelves, hold an array of books
Books, hold an array of pages
Pages, hold an array of data

Usage:
Page:
Constructor args, pageNumber(default -1), data(default null), pageLength(length of the pages array, default 10)

searchPage(term), returns 0 or 1 depending on whether or not the page contains <term>

Book:
Constructor args, title(default Untitled), author(default Unknown)
pages, array of pages in the book
access(book, author), simple way to check if the author in the input can access the book in the input
newPage(number, data, pageLength), creates a new instance of Page, adds it to the array, then returns it
author(), returns author
title(), returns title
pushPage(page), adds an existing page to the end of the book
popPage(), removes the last page in the book
insertPage(page, position), adds the page to that position in the array
viewPages(), unimplemented


Shelf:
Constructor args, books (defaults to no books)
pushBook(book), adds an existing book to the shelf
popBook(), removes the last book in the shelf
insertBook(book, position), inserts the book to the given position in the array
viewBooks(titleFilter), returns all books, or when specified returns books with a given title
searchBookshelf(term), searches book titles and page content for <term>
sortBookTitle(), sorts books from a to z
sortBookAuthor(), sorts books from a to z
changeBookTitle(oldTitle, newTitle), changes any books with oldTitle as their title to newTitle
removeByTitle(title), removes books with the given title
paginateBooks(pageNumber, pageSize), creates the given amount of pages with the given amount of length in the books. DELETES CONTAINED DATA OF THE BOOKS
exportBook(), exports the data in JSON format
