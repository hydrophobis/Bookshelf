import java.util.*;

// Page class implementation
class Page {
    private int pageNumber;
    private int pageLength;
    private List<String> pageData;

    public Page(int number, String data, int pageLength) {
        this.pageNumber = number;
        this.pageLength = pageLength;
        this.pageData = new ArrayList<>(Collections.nCopies(pageLength, data));
    }

    public boolean searchPage(String data) {
        return pageData.contains(data);
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public List<String> getPageData() {
        return pageData;
    }
}

// Book class implementation
class Book {
    private String title;
    private String author;
    private List<Page> pages;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
        this.pages = new ArrayList<>();
    }

    public static boolean access(Book book, String author) {
        if (book.author.equals(author)) {
            return true;
        } else if (author.equals("Unknown")) {
            return false;
        } else {
            return false;
        }
    }

    public Page newPage(int number, String data, int pageLength) {
        Page page = new Page(number, data, pageLength);
        pages.add(page);
        return page;
    }

    public String getAuthor() {
        return author;
    }

    public String getTitle() {
        return title;
    }

    public boolean pushPage(Page page) {
        pages.add(page);
        return true;
    }

    public boolean popPage() {
        if (!pages.isEmpty()) {
            pages.remove(pages.size() - 1);
            return true;
        } else {
            System.err.println("No pages to remove.");
            return false;
        }
    }

    public boolean insertPage(Page page, int position) {
        if (position < 1 || position > pages.size() + 1) {
            System.err.println("Position out of bounds.");
            return false;
        }
        pages.add(position - 1, page);
        return true;
    }

    public List<String> viewPages(String titleFilter) {
        List<String> result = new ArrayList<>();
        for (Page page : pages) {
            if (titleFilter.isEmpty() || title.equals(titleFilter)) {
                result.add(page.getPageNumber() + ": " + (page.getPageData().isEmpty() ? "" : page.getPageData().get(0)));
            }
        }
        return result;
    }
}

// Shelf class implementation
class Shelf {
    private List<Book> books;

    public Shelf() {
        this.books = new ArrayList<>();
    }

    public boolean pushBook(Book book) {
        books.add(book);
        return true;
    }

    public boolean popBook() {
        if (!books.isEmpty()) {
            books.remove(books.size() - 1);
            return true;
        } else {
            System.err.println("No books to remove.");
            return false;
        }
    }

    public boolean insertBook(Book book, int position) {
        if (position < 1 || position > books.size() + 1) {
            System.err.println("Position out of bounds.");
            return false;
        }
        books.add(position - 1, book);
        return true;
    }

    public List<String> viewBooks(String titleFilter) {
        List<String> result = new ArrayList<>();
        for (Book book : books) {
            if (titleFilter.isEmpty() || book.getTitle().equals(titleFilter)) {
                result.add(book.getTitle());
            }
        }
        return result;
    }

    public List<String> searchBookshelf(String term) {
        List<String> results = new ArrayList<>();
        for (Book book : books) {
            if (book.getTitle().contains(term)) {
                results.add("Title: " + book.getTitle());
            }
            for (String page : book.viewPages("")) {
                if (page.contains(term)) {
                    results.add("Page Data in book: " + book.getTitle());
                }
            }
        }
        return results;
    }

    public void sortBookTitle() {
        books.sort(Comparator.comparing(Book::getTitle));
    }

    public void sortBookAuthor() {
        books.sort(Comparator.comparing(Book::getAuthor));
    }
}

