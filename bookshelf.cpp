#include "bookshelf.hpp"

// Page class implementation
Page::Page(int number, const std::string& data, int pageLength)
    : pageNumber(number), pageLength(pageLength), pageData(pageLength, data) {}

bool Page::searchPage(const std::string& data) {
    return std::find(pageData.begin(), pageData.end(), data) != pageData.end();
}

int Page::getPageNumber() const {
    return pageNumber;
}

const std::vector<std::string>& Page::getPageData() const {
    return pageData;
}

// Book class implementation
Book::Book(const std::string& title, const std::string& author)
    : title(title), author(author) {}

bool Book::access(const Book& book, const std::string& author) {
    if (book.author == author) {
        return true;
    } else if (author == "Unknown") {
        return false;
    } else {
        return false;
    }
}

Page Book::newPage(int number, const std::string& data, int pageLength) {
    Page page(number, data, pageLength);
    pages.push_back(page);
    return page;
}

const std::string& Book::getAuthor() const {
    return author;
}

const std::string& Book::getTitle() const {
    return title;
}

bool Book::pushPage(const Page& page) {
    pages.push_back(page);
    return true;
}

bool Book::popPage() {
    if (!pages.empty()) {
        pages.pop_back();
        return true;
    } else {
        std::cerr << "No pages to remove." << std::endl;
        return false;
    }
}

bool Book::insertPage(const Page& page, int position) {
    if (position < 1 || position > static_cast<int>(pages.size()) + 1) {
        std::cerr << "Position out of bounds." << std::endl;
        return false;
    }
    pages.insert(pages.begin() + position - 1, page);
    return true;
}

std::vector<std::string> Book::viewPages(const std::string& titleFilter) const {
    std::vector<std::string> result;
    for (const auto& page : pages) {
        if (titleFilter.empty() || title == titleFilter) {
            result.push_back(std::to_string(page.getPageNumber()) + ": " + (page.getPageData().empty() ? "" : page.getPageData()[0]));
        }
    }
    return result;
}

// Shelf class implementation
bool Shelf::pushBook(const Book& book) {
    books.push_back(book);
    return true;
}

bool Shelf::popBook() {
    if (!books.empty()) {
        books.pop_back();
        return true;
    } else {
        std::cerr << "No books to remove." << std::endl;
        return false;
    }
}

bool Shelf::insertBook(const Book& book, int position) {
    if (position < 1 || position > static_cast<int>(books.size()) + 1) {
        std::cerr << "Position out of bounds." << std::endl;
        return false;
    }
    books.insert(books.begin() + position - 1, book);
    return true;
}

std::vector<std::string> Shelf::viewBooks(const std::string& titleFilter) const {
    std::vector<std::string> result;
    for (const auto& book : books) {
        if (titleFilter.empty() || book.getTitle() == titleFilter) {
            result.push_back(book.getTitle());
        }
    }
    return result;
}

std::vector<std::string> Shelf::searchBookshelf(const std::string& term) const {
    std::vector<std::string> results;
    for (const auto& book : books) {
        if (book.getTitle().find(term) != std::string::npos) {
            results.push_back("Title: " + book.getTitle());
        }
        // Assuming each Page has a method to get the page data as a vector of strings
        for (const auto& page : book.viewPages()) {
            if (page.find(term) != std::string::npos) {
                results.push_back("Page Data in book: " + book.getTitle());
            }
        }
    }
    return results;
}

void Shelf::sortBookTitle() {
    std::sort(books.begin(), books.end(), [](const Book& a, const Book& b) {
        return a.getTitle() < b.getTitle();
    });
}

void Shelf::sortBookAuthor() {
    std::sort(books.begin(), books.end(), [](const Book& a, const Book& b) {
        return a.getAuthor() < b.getAuthor();
    });
}

bool Shelf::changeBookTitle(const std::string& title, const std::string& newTitle) {
    auto it = std::find_if(books.begin(), books.end(), [&title](const Book& book) {
        return book.getTitle() == title;
    });
    if (it != books.end()) {
        it->changeBookTitle(newTitle);
        return true;
    } else {
        std::cerr << "Book not found." << std::endl;
        return false;
    }
}

int Shelf::removeByTitle(const std::string& title) {
    int initialLength = books.size();
    books.erase(std::remove_if(books.begin(), books.end(), [&title](const Book& book) {
        return book.getTitle() == title;
    }), books.end());
    return initialLength - books.size();
}

std::vector<Book> Shelf::paginateBooks(int pageNumber, int pageSize) const {
    int startIndex = (pageNumber - 1) * pageSize;
    int endIndex = std::min(startIndex + pageSize, static_cast<int>(books.size()));
    return std::vector<Book>(books.begin() + startIndex, books.begin() + endIndex);
}

std::string Shelf::exportBooks() const {
    std::string result = "[";
    for (const auto& book : books) {
        result += "{\"title\":\"" + book.getTitle() + "\", \"author\":\"" + book.getAuthor() + "\"},";
    }
    if (!books.empty()) {
        result.pop_back();
    }
    result += "]";
    return result;
}
