package com.example.demo.controller;

import com.example.demo.entities.Book;
import com.example.demo.entities.ResourceNotFoundException;
import com.example.demo.entities.Utilisateur;
import com.example.demo.repository.UtilisateurRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class userController {
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @GetMapping()
    public List<Utilisateur> getAllUsers() {
        return  utilisateurRepository.findAll();
    }

    @PostMapping("/new")
    public Utilisateur createUser(@RequestBody Utilisateur user) {
        return utilisateurRepository.save(user);
    }


    @GetMapping("/{id}")
    public Utilisateur getUserById(@PathVariable(value = "id") Long userId) throws ResourceNotFoundException {
        return utilisateurRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with ID :  " + userId));
    }

    @PutMapping("/{id}")
    public Utilisateur updateUser(@PathVariable(value = "id") Long userId, @RequestBody Utilisateur userDetails) throws ResourceNotFoundException {
        Utilisateur user = utilisateurRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with ID " + userId));
        user.setNom(userDetails.getNom());
        user.setPrenom(userDetails.getPrenom());
        user.setEmail(userDetails.getEmail());
        user.setPreferences(userDetails.getPreferences());
        user.setEnvies(userDetails.getEnvies());
        user.setRole(userDetails.getRole());

        return utilisateurRepository.save(user);
    }

    // Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long userId) throws ResourceNotFoundException {
        Utilisateur user = utilisateurRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with ID " + userId));
        utilisateurRepository.delete(user);
        return ResponseEntity.ok().build();
    }

    // Exception handler for ResourceNotFoundException
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFoundException(@NotNull ResourceNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // Exception handler for MethodArgumentNotValidException
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValidException(@NotNull MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{userId}/preferences")
    public List<Book> getUserPreferences(@PathVariable(value = "userId") Long userId) {
         return utilisateurRepository.finduserPreferences(userId);
    }

    @GetMapping("/{userId}/envies")
    public List<Book> getUserEnvies(@PathVariable(value = "userId") Long userId) {
        return utilisateurRepository.findUserEnvies(userId);
    }



}
