#ifndef BOOKSHELF_HPP
#define BOOKSHELF_HPP

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

// Page class
class Page {
private:
    int pageNumber;
    int pageLength;
    std::vector<std::string> pageData;

public:
    Page(int number = -1, const std::string& data = "", int pageLength = 10);
    bool searchPage(const std::string& data);

    // Accessors for testing
    int getPageNumber() const;
    const std::vector<std::string>& getPageData() const;
};

// Book class
class Book {
private:
    std::string title;
    std::string author;
    std::vector<Page> pages;

public:
    Book(const std::string& title = "Untitled", const std::string& author = "Unknown");
    bool access(const Book& book, const std::string& author);
    Page newPage(int number, const std::string& data, int pageLength);

    const std::string& getAuthor() const;
    const std::string& getTitle() const;

    bool pushPage(const Page& page);
    bool popPage();
    bool insertPage(const Page& page, int position);

    std::vector<std::string> viewPages(const std::string& titleFilter = "") const;
};

// Shelf class
class Shelf {
private:
    std::vector<Book> books;

public:
    bool pushBook(const Book& book);
    bool popBook();
    bool insertBook(const Book& book, int position);

    std::vector<std::string> viewBooks(const std::string& titleFilter = "") const;
    std::vector<std::string> searchBookshelf(const std::string& term) const;
    void sortBookTitle();
    void sortBookAuthor();
    bool changeBookTitle(const std::string& title, const std::string& newTitle);
    int removeByTitle(const std::string& title);

    std::vector<Book> paginateBooks(int pageNumber, int pageSize) const;
    std::string exportBooks() const;
};

#endif // BOOKSHELF_HPP
