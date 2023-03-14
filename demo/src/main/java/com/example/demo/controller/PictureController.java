package com.example.demo.controller;

import com.example.demo.entities.Picture;
import com.example.demo.entities.ResourceNotFoundException;
import com.example.demo.repository.PictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/Pictures")
public class PictureController {
    @Autowired
    private PictureRepository pictureRepository;

    @PostMapping("/new")
    public Picture createPicture(@RequestBody Picture picture) {
        return pictureRepository.save(picture);
    }
    @GetMapping("")
    public List<Picture> getAllPictures(){
        return pictureRepository.findAll();
    }
    @GetMapping("/{pictureId}")
    public Picture getPictureById(@PathVariable(value = "pictureId") Long pictureId) throws ResourceNotFoundException {
        return pictureRepository.findById(pictureId).orElseThrow(() -> new ResourceNotFoundException("User not found with ID " + pictureId));
    }
    @PutMapping("/{id}")
    public Picture updateUser(@PathVariable(value = "id") Long pictureId, @RequestBody Picture pictureDetails) throws ResourceNotFoundException {
        Picture picture = pictureRepository.findById(pictureId).orElseThrow(() -> new ResourceNotFoundException("picture not found with ID " + pictureId));
        picture.setPictureUrl(pictureDetails.getPictureUrl());
        picture.setData(pictureDetails.getData());
        return pictureRepository.save(picture);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long userId) throws ResourceNotFoundException {
        Picture user = pictureRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with ID " + userId));
        pictureRepository.delete(user);
        return ResponseEntity.ok().build();
    }

    // Exception handler for ResourceNotFoundException
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // Exception handler for MethodArgumentNotValidException
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
