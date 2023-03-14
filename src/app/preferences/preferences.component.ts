import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {LivreFacadeService} from "../facade/livre-facade.service";
import {Book} from "../Model/livre";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent  implements  OnInit{
  public books: Book[]=[]

  constructor(private route : Router , private http:HttpClient , private livreFacade : LivreFacadeService) {

  }

  ngOnInit(): void {
    this.books= this.livreFacade.getbooksListe("angular")
  }

  //@TODO
  /**
   * developper l'affichage en tenant compte des  action disliker , supprimer , verifier si seulement si on est admin avant de supprimer
   *
   */

  getBookInfo(book: Book) {

  }
}
