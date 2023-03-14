import { Injectable } from '@angular/core';
import {map} from "rxjs";
import {Book} from "../Model/livre";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LivreFacadeService {
  public search = 'php'

  listeBooks: Book[] =[];

  constructor( private http : HttpClient ) { }


  private apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

  getbooksListe(search: string){
    if(search ==null){
      search=this.search
    }
    this.http.get<any>(`${this.apiUrl}${search}`)
      .pipe(
        map(res => res.items.map((item: { volumeInfo: any; }) => {
          const volumeInfo = item.volumeInfo;
          const books = new Book();
          books.title = volumeInfo.title;
          books.author = volumeInfo.authors ? volumeInfo.authors.join(', ') : '';
          books.ISBN = volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers[0].identifier : '';
          books.publishedDate = volumeInfo.publishedDate;
          books.description = volumeInfo.description;
          books.coverImage = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '';
          this.listeBooks.push(books)
          return books;
        }))
      ).subscribe(()=>{}, error => {}, ()=>{



    });
    return this.listeBooks
  }
}


