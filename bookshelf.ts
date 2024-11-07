// Importing necessary modules
import { strict as assert } from 'assert';

// Page class implementation
class Page {
    private pageNumber: number;
    private pageLength: number;
    private pageData: string[];

    constructor(number: number, data: string, pageLength: number) {
        this.pageNumber = number;
        this.pageLength = pageLength;
        this.pageData = Array(pageLength).fill(data);
    }

    searchPage(data: string): boolean {
        return this.pageData.includes(data);
    }

    getPageNumber(): number {
        return this.pageNumber;
    }

    getPageData(): string[] {
        return this.pageData;
    }
}

// Book class implementation
class Book {
    private title: string;
    private author: string;
    private pages: Page[];

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
        this.pages = [];
    }

    static access(book: Book, author: string): boolean {
        if (book.author === author) {
            return true;
        } else if (author === "Unknown") {
            return false;
        } else {
            return false;
        }
    }

    newPage(number: number, data: string, pageLength: number): Page {
        const page = new Page(number, data, pageLength);
        this.pages.push(page);
        return page;
    }

    getAuthor(): string {
        return this.author;
    }

    getTitle(): string {
        return this.title;
    }

    pushPage(page: Page): boolean {
        this.pages.push(page);
        return true;
    }

    popPage(): boolean {
        if (this.pages.length > 0) {
            this.pages.pop();
            return true;
        } else {
            console.error("No pages to remove.");
            return false;
        }
    }

    insertPage(page: Page, position: number): boolean {
        if (position < 1 || position > this.pages.length + 1) {
            console.error("Position out of bounds.");
            return false;
        }
        this.pages.splice(position - 1, 0, page);
        return true;
    }

    viewPages(titleFilter: string = ""): string[] {
        return this.pages
            .filter(() => titleFilter === "" || this.title === titleFilter)
            .map(page => `${page.getPageNumber()}: ${page.getPageData()[0] || ""}`);
    }
}

// Shelf class implementation
class Shelf {
    private books: Book[];

    constructor() {
        this.books = [];
    }

    pushBook(book: Book): boolean {
        this.books.push(book);
        return true;
    }

    popBook(): boolean {
        if (this.books.length > 0) {
            this.books.pop();
            return true;
        } else {
            console.error("No books to remove.");
            return false;
        }
    }

    insertBook(book: Book, position: number): boolean {
        if (position < 1 || position > this.books.length + 1) {
            console.error("Position out of bounds.");
            return false;
        }
        this.books.splice(position - 1, 0, book);
        return true;
    }

    viewBooks(titleFilter: string = ""): string[] {
        return this.books
            .filter(book => titleFilter === "" || book.getTitle() === titleFilter)
            .map(book => book.getTitle());
    }

    searchBookshelf(term: string): string[] {
        const results: string[] = [];
        for (const book of this.books) {
            if (book.getTitle().includes(term)) {
                results.push(`Title: ${book.getTitle()}`);
            }
            for (const pageData of book.viewPages()) {
                if (pageData.includes(term)) {
                    results.push(`Page Data in book: ${book.getTitle()}`);
                }
            }
        }
        return results;
    }

    sortBookTitle(): void {
        this.books.sort((a, b) => a.getTitle().localeCompare(b.getTitle()));
    }

    sortBookAuthor(): void {
        this.books.sort((a, b) => a.getAuthor().localeCompare(b.getAuthor()));
    }
}

