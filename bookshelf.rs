use std::cmp::Ordering;

// Page struct implementation
pub struct Page {
    page_number: i32,
    page_length: i32,
    page_data: Vec<String>,
}

impl Page {
    pub fn new(number: i32, data: &str, page_length: i32) -> Self {
        Page {
            page_number: number,
            page_length,
            page_data: vec![data.to_string(); page_length as usize],
        }
    }

    pub fn search_page(&self, data: &str) -> bool {
        self.page_data.contains(&data.to_string())
    }

    pub fn get_page_number(&self) -> i32 {
        self.page_number
    }

    pub fn get_page_data(&self) -> &Vec<String> {
        &self.page_data
    }
}

// Book struct implementation
pub struct Book {
    title: String,
    author: String,
    pages: Vec<Page>,
}

impl Book {
    pub fn new(title: &str, author: &str) -> Self {
        Book {
            title: title.to_string(),
            author: author.to_string(),
            pages: Vec::new(),
        }
    }

    pub fn access(&self, author: &str) -> bool {
        if self.author == author {
            true
        } else if author == "Unknown" {
            false
        } else {
            false
        }
    }

    pub fn new_page(&mut self, number: i32, data: &str, page_length: i32) -> Page {
        let page = Page::new(number, data, page_length);
        self.pages.push(page.clone());
        page
    }

    pub fn get_author(&self) -> &str {
        &self.author
    }

    pub fn get_title(&self) -> &str {
        &self.title
    }

    pub fn push_page(&mut self, page: Page) -> bool {
        self.pages.push(page);
        true
    }

    pub fn pop_page(&mut self) -> bool {
        if !self.pages.is_empty() {
            self.pages.pop();
            true
        } else {
            eprintln!("No pages to remove.");
            false
        }
    }

    pub fn insert_page(&mut self, page: Page, position: usize) -> bool {
        if position < 1 || position > self.pages.len() + 1 {
            eprintln!("Position out of bounds.");
            false
        } else {
            self.pages.insert(position - 1, page);
            true
        }
    }

    pub fn view_pages(&self, title_filter: &str) -> Vec<String> {
        self.pages
            .iter()
            .filter(|_| title_filter.is_empty() || self.title == title_filter)
            .map(|page| {
                format!(
                    "{}: {}",
                    page.get_page_number(),
                    page.get_page_data().first().unwrap_or(&String::new())
                )
            })
            .collect()
    }
}

// Shelf struct implementation
pub struct Shelf {
    books: Vec<Book>,
}

impl Shelf {
    pub fn new() -> Self {
        Shelf { books: Vec::new() }
    }

    pub fn push_book(&mut self, book: Book) -> bool {
        self.books.push(book);
        true
    }

    pub fn pop_book(&mut self) -> bool {
        if !self.books.is_empty() {
            self.books.pop();
            true
        } else {
            eprintln!("No books to remove.");
            false
        }
    }

    pub fn insert_book(&mut self, book: Book, position: usize) -> bool {
        if position < 1 || position > self.books.len() + 1 {
            eprintln!("Position out of bounds.");
            false
        } else {
            self.books.insert(position - 1, book);
            true
        }
    }

    pub fn view_books(&self, title_filter: &str) -> Vec<String> {
        self.books
            .iter()
            .filter(|book| title_filter.is_empty() || book.get_title() == title_filter)
            .map(|book| book.get_title().to_string())
            .collect()
    }

    pub fn search_bookshelf(&self, term: &str) -> Vec<String> {
        let mut results = Vec::new();
        for book in &self.books {
            if book.get_title().contains(term) {
                results.push(format!("Title: {}", book.get_title()));
            }
            for page in book.view_pages("") {
                if page.contains(term) {
                    results.push(format!("Page Data in book: {}", book.get_title()));
                }
            }
        }
        results
    }

    pub fn sort_book_title(&mut self) {
        self.books.sort_by(|a, b| a.get_title().cmp(b.get_title()));
    }

    pub fn sort_book_author(&mut self) {
        self.books.sort_by(|a, b| a.get_author().cmp(b.get_author()));
    }
}

