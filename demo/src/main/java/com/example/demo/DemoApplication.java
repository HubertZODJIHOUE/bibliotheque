package com.example.demo;

import com.example.demo.entities.Book;
import com.example.demo.entities.Role;
import com.example.demo.entities.Utilisateur;
import com.example.demo.repository.BookReposirtory;
import com.example.demo.repository.PictureRepository;
import com.example.demo.repository.UtilisateurRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;

import java.util.List;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	@Bean
	CommandLineRunner start(UtilisateurRepository utilisateurRepository , PictureRepository pictureRepository, BookReposirtory bookReposirtory ){
		return  args -> {
			Utilisateur user1 = new Utilisateur(null,"ZODJHOUE", "Hubert", "hamegan@gmail.com", Role.ADMIN,null,null);
			Utilisateur user2 = new Utilisateur(null,"OUKSILI", "sami", "samiouksili@gmail.com", Role.ADMIN,null,null);
			Utilisateur user3 = new Utilisateur(null,"DOMIGUES", "thomas", "thoasdomguez@gmail.com", Role.ADMIN,null,null);
			Utilisateur user4 = new Utilisateur(null,"BLUSTHER", "thomas", "bluster@gmai.com", Role.ADMIN,null,null);
			utilisateurRepository.save(user1);
			utilisateurRepository.save(user2);
			utilisateurRepository.save(user3);
			utilisateurRepository.save(user4);


			Book book1= new Book(null,"12456","les contemplation","je suis un livre de decouverte",user1,null);
			Book book2= new Book(null,"87856","les reserveurs","je suis un livre de reserveuurs",user2,null);
			Book book3= new Book(null,"895456","les determiner","je suis un livre de deter",user3,null);
			Book book4= new Book(null,"178956","les jugement","je suis un livre de juge",user4,null);
			  bookReposirtory.save(book1);
			  bookReposirtory.save(book2);
			  bookReposirtory.save(book3);
			  bookReposirtory.save(book4);

			  List<Book> envieUser1 = new ArrayList<>();
			  envieUser1.add(book1);
			  envieUser1.add(book2);
			  user1.setEnvies(envieUser1);
			List<Book> preference = new ArrayList<>();
			preference.add(book3);
			preference.add(book4);
			user1.setPreferences(preference);
			utilisateurRepository.save(user1);


			List<Book> envielisteUser2 = new ArrayList<>();
			envielisteUser2.add(book3);
			envielisteUser2.add(book4);
			user2.setEnvies(envielisteUser2);
			List<Book> preferenceUser2 = new ArrayList<>();
			preferenceUser2.add(book1);
			preferenceUser2.add(book2);
			user2.setPreferences(preferenceUser2);
			utilisateurRepository.save(user2);


		};
	}


}
