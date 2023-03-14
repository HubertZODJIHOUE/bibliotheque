import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Livre} from "../Model/livre";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  implements OnInit{
   public search: any;
    public books =[];
    public isbn = 9780812567700
    constructor(private http: HttpClient, private route: Router) {
      // this.http.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${this.isbn}&limit=7&format=json&jscmd=data`)
      //   .subscribe((data: any) => {
      //     this.books= data[`ISBN:${this.search}`];
      //     console.log(this.books)
      //   }, error => {}, ()=>{ console.log('ddddd', this.books)});
    }
  ngOnInit(): void {

    // this.getBooks()
    console.log(this.books)

  }

  searchBooks(name: string): Observable<any> {
    const url = `https://openlibrary.org/search.json?title=${name}&limit=10`;
    return this.http.get<any>(url);
  }

  getBooks() {
    this.searchBooks("Victor Hugo").subscribe(data => {
      data.docs.forEach((book: any) => {
        //
        // console.log('Title:', book.title);
        // console.log('Author:', book.author);
        // console.log('Overview:', book.description);
        // console.log('Cover Image:', book.cover_i);
        // @ts-ignore
         this.books.push(book);
      });
    }, error => {
      console.log('An error occurred:', error);
    }, ()=>{console.log(this.books); console.log('dans le complete')});
  }

  // onClickSearch() {
  //   console.log(this.search)
  //   this.http.get(`https://openlibrary.org/search.json?author=${this.search}`)
  //     .subscribe((data: any) => {
  //       this.books = data.docs;
  //       console.log(this.books)
  //     });
  // }
  onClickSearch() {
    if(this.search.length == 10 || this.search.length == 13){
      this.http.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${this.search}&limit=3&format=json&jscmd=data`)
        .subscribe((data: any) => {
          this.books= data[`ISBN:${this.search}`];
          console.log(this.books)
        }, error => {
          Swal.fire(
            'Livre!',
            'Problème de connexion au serveur !',
            'error'
          ).then(result =>{
            this.route.navigate(['/Home'])
          })
        }, ()=>{  });
    }else{
      this.http.get(`https://openlibrary.org/search.json?author=${this.search}&limit=3`)
        .subscribe((data: any) => {
          this.books = data.docs;
        }, error => {
          Swal.fire(
            'Livre!',
            'Problème de connexion au serveur !',
            'error'
          ).then(result =>{
            this.route.navigate(['/Home'])
          })
        });
    }
  }

  //@TODO
  /**
   * la recherche d'un livre et affichage
   *
   */



}
