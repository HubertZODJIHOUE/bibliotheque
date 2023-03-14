import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {debounceTime, Observable, Subject} from "rxjs";
import {LivreFacadeService} from "../facade/livre-facade.service";
import {Book, Livre} from "../Model/livre";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnChanges , OnInit{
   public books: Book[]=[]
  public logoUrl = 'assets/logo.png';
  selectedItem: any;
  public  search:string="";
  private searchChange= new Subject<string>()

 constructor(private route : Router , private http:HttpClient , private livreFacade : LivreFacadeService) {
   this.searchChange.pipe(debounceTime(10)).subscribe(value => {

   });
 }

 ngOnInit(){
  this.onInputChange(this.search)
  this.searchChange.next(this.search)
   console.log('search anh',this.searchChange);
   console.log('simple',this.search);
 }

  trackByMyId(index: number, book: any): number {

  return  book.index
  }


//  ---------------- G O O G L E --------------------------
  showFullText: boolean=false;

  title: string = 'Ajouté à mes préférences';

  getBookInfo(book: Book) {
    console.table(book)
    if(!book.description){
      book.description = " La description de ce livre n'est pas disponible, car elle est en vente unique, vous pouvez le trouver sur Amazon en faisant une recherche avec le nom de l'auteur."
    }
    Swal.fire({
      title :book.title,
      imageUrl:book.coverImage,
      imageHeight:65,
      imageWidth:65,
      text: book.description,
      showCancelButton: true,

    })
  }

  onIconClick(book: Book) {

    book.isLiked= !book.isLiked;
    console.log(book)
    console.log('totototo')
    if(book.isLiked){
      this.title="retiré de mes préférences"
      //@TODO
      /**
       * ajouter ce book a la liste des preference

       * */
    }else{
      this.title="Ajouté à mes préférences"

      //@TODO
      /**
       * retirer le  book  de la liste des preference

       * */
    }


  }

  maFonction() {
    // Code à exécuter lorsque l'utilisateur clique sur l'icône
    console.log('Icône cliquée !');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('dfdfzfgfg', this.search)
  }

  //@TODO
  /**
   * lorsque le statue de conneion n'est pas ok afficher les livre sans afficher le coeur rouge si il font parti des preference ou pas
   * l'afficher uniquement que quand on est connecté
   * pour ce faire afficher une liste standar de livre au debut
   * si on est connecter ajuter a cette liste la liste des preference
   */
  validerRechearch() {
    console.log('search value', this.search)
  }

  onInputChange(value: any) {
    this.search = value;
    console.log(this.search);
    this.books=this.livreFacade.getbooksListe(this.search)
    console.log(this.books);
  }
}
