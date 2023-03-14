package com.example.demo.controller;

import com.example.demo.entities.Book;
import com.example.demo.entities.ResourceNotFoundException;
import com.example.demo.repository.BookReposirtory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookReposirtory bookReposirtory;

    @PostMapping("/new")
    public Book createBook(@RequestBody Book book) {
        return bookReposirtory.save(book);
    }
    @GetMapping()
    public List<Book> getAllBooks(){
        return bookReposirtory.findAll();
    }
    @GetMapping("/{bookId}")
    public Book  getBookById(@PathVariable(value = "bookId") Long bookId) {
                // Effectuer des traitements et renvoyer une réponse
                return bookReposirtory.findById(bookId).get();
    }

    @PutMapping("/{bookId}")
    public Book updateBook(@PathVariable(value = "bookId") Long bookId, @RequestBody Book bookDetails) throws ResourceNotFoundException {
        Book book = bookReposirtory.findById(bookId).orElseThrow(() -> new ResourceNotFoundException("Book not found with ID " + bookId));

        book.setAuthors(bookDetails.getAuthors());
        book.setIsbn(bookDetails.getIsbn());
        book.setTitle(bookDetails.getTitle());
        book.setCoverImage(bookDetails.getCoverImage());
        book.setOverview(bookDetails.getOverview());

        return bookReposirtory.save(book);
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "bookId") Long userId) throws ResourceNotFoundException {
        Book user = bookReposirtory.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Book not found with ID " + userId));
        bookReposirtory.delete(user);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }



}
