package com.example.demo.repository;

import com.example.demo.entities.Book;
import com.example.demo.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UtilisateurRepository  extends JpaRepository <Utilisateur, Long> {
    @Query("SELECT  u.preferences FROM  Utilisateur  u WHERE u.id= :utilisateurId")
    List<Book> finduserPreferences(@Param("utilisateurId") Long utilisateurId);

    @Query("SELECT  u.envies FROM  Utilisateur  u WHERE u.id= :utilisateurId")
    List<Book> findUserEnvies(@Param("utilisateurId") Long utilisateurId);
}
