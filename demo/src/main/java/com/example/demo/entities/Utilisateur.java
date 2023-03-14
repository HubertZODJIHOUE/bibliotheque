package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity @NoArgsConstructor @AllArgsConstructor @Data @JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;

    private String prenom;

    private String email;
    @Enumerated(EnumType.STRING)
    private  Role role;
//    @OneToMany(mappedBy = "userPref", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Book> preference = new ArrayList<>();
//    @OneToMany(mappedBy = "userenvies", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Book> envies = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "USER_ENVIES",
            joinColumns = @JoinColumn(name = "USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "BOOK_ID"))
    private List<Book> envies = new ArrayList<>();


    @ManyToMany
    @JoinTable(
            name = "USER_PREFERENCES",
            joinColumns = @JoinColumn(name = "USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "BOOK_ID"))
    private List<Book> preferences = new ArrayList<>();


}
