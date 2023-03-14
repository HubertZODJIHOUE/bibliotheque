import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router} from "@angular/router";
import {ConnexionStatusService} from "./Service/ConnexionStatus/connexion-status.service";
import Swal from "sweetalert2";
import {map, Observable} from "rxjs";
import {Book} from "./Model/livre";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  public isConnected = false;
  public authentificationValue: any;

  public search: any;

  public isbn = 9780812567700;
  public logoUrl = 'assets/logo.png';
  // books=[];

  private API_KEY = '1067152610543-nbo6aogpec5l5vohlmmlg1aj7e0bois9.apps.googleusercontent.com';
   books = [];
  private listeBooks: Book[]=[];


  constructor(private router: Router, private connexionservice: ConnexionStatusService,
              private http: HttpClient ) {
    // this.getBooks()
    console.log(this.isConnected)
    this.connexionservice.getConnectionStatus().subscribe(status => {
      this.isConnected = status
    })


  }

  //@TODO
  /**
   * géré la navbar z-index
   *
   */


  private apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

  // searchBooks(query: string): Observable<Book[]> {
  //   console.log('je suis dde dans ')
  //   return this.http.get<any>(`${this.apiUrl}${query}&key=${this.API_KEY}`)
  //     .pipe(
  //       map(res => res.items.map((item: { volumeInfo: any; }) => {
  //         console.log("chaque res" , res)
  //         const volumeInfo = item.volumeInfo;
  //         const books = new Book();
  //         books.title = volumeInfo.title;
  //         books.author = volumeInfo.authors ? volumeInfo.authors.join(', ') : '';
  //         books.ISBN = volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers[0].identifier : '';
  //         books.publishedDate = volumeInfo.publishedDate;
  //         books.description = volumeInfo.description;
  //         books.coverImage = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '';
  //         console.log("+++++++++++", books)
  //         return books;
  //       }))
  //     );
  // }




  // searchBooks(name: string): Observable<any> {
  //   const url = `https://openlibrary.org/search.json?title=${name}&limit=10`;
  //   return this.http.get<any>(url);
  // }


  // getBooks() {
  //   this.searchBooks("Victor Hugo").subscribe(data => {
  //     data.docs.forEach((book: { title: any; author_name: any; description: any; cover_i: any; }) => {this.books.push(book)
  //       console.log('Title:', book.title);
  //       console.log('Author:', book.author_name);
  //       console.log('Overview:', book.description);
  //       console.log('Cover Image:', book.cover_i);
  //     });
  //   }, error => {
  //     console.log('An error occurred:', error);
  //   }, ()=>console.log(this.books));
  // }
  //


  ngOnInit(): void {


    this.router.navigate(['/Home'])
    // console.log(this.books)
  }


  getConnectionStatus() {
    this.connexionservice.getConnectionStatus();
  }


  onClickToConnect() {

  }

  onClickToDeconnecte() {
    this.isConnected = false
    this.connexionservice.sendConnectionStatus(this.isConnected)
    Swal.fire(
      'Deconexion!',
      'Vous etes deconnecter!',
      'success'
    ).then(result => {
      this.router.navigate(['/Home'])
    })

  }
  //@TODO
  /**
   * revoir google authentification
   *
   */


  toogleAAddBokPage() {
    this.router.navigate(['/AjouterUnLivre'])

  }

  // searchBooks(name: string): Observable<any> {
  //   const url = `https://openlibrary.org/search.json?title=${name}&limit=10`;
  //   return this.http.get<any>(url);
  //   }
  //
  //   getBooks()
  //   {
  //     this.searchBooks("Victor Hugo").subscribe(data => {
  //       data.docs.forEach((book: { title: any; author_name: any; description: any; cover_i: any; }) => {
  //         // @ts-ignore
  //         this.books.push(data.docs)
  //         console.log('Title:', book.title);
  //         console.log('Author:', book.author_name);
  //         console.log('Overview:', book.description);
  //         console.log('Cover Image:', book.cover_i);
  //       });
  //     }, error => {
  //       console.log('An error occurred:', error);
  //     }, () => console.log(this.books));
  //   }


    // onClickSearch() {
    //   if(this.search.length == 10 || this.search.length == 13){
    //     this.http.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${this.search}&limit=3&format=json&jscmd=data`)
    //       .subscribe((data: any) => {
    //         this.books= data[`ISBN:${this.search}`];
    //         console.log(this.books)
    //       }, error => {
    //         Swal.fire(
    //           'Livre!',
    //           'Problème de connexion au serveur !',
    //           'error'
    //         ).then(result =>{
    //           this.router.navigate(['/Home'])
    //         })
    //       }, ()=>{  });
    //   }else{
    //     this.http.get(`https://openlibrary.org/search.json?author=${this.search}&limit=3`)
    //       .subscribe((data: any) => {
    //         this.books = data.docs;
    //         console.log(this.books)
    //       }, error => {
    //         Swal.fire(
    //           'Livre!',
    //           'Problème de connexion au serveur !',
    //           'error'
    //         ).then(result =>{
    //           this.router.navigate(['/Home'])
    //         })
    //       });
    //   }
    // }


  onClickSearch() {
    // this.http.get(`${this.apiUrl}${this.search}`)
    //   .subscribe(data => {
    //     console.log('efzejjhbebzebzbzbkzzjbczkbkbcz')
    //     console.log(data)
    //     // @ts-ignore
    //     this.books.push(data['items'][0].etag);
    //     console.log(this.books)
    //   }, error => {},  ()=>{console.log('yes  we can ', this.books)});

    //
    // this.http.get<any>(`${this.apiUrl}${this.search}`)
    //     .pipe(
    //       map(res => res.items.map((item: { volumeInfo: any; }) => {
    //         console.log("chaque res" , res)
    //         const volumeInfo = item.volumeInfo;
    //         const books = new Book();
    //         books.title = volumeInfo.title;
    //         books.author = volumeInfo.authors ? volumeInfo.authors.join(', ') : '';
    //         books.ISBN = volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers[0].identifier : '';
    //         books.publishedDate = volumeInfo.publishedDate;
    //         books.description = volumeInfo.description;
    //         books.coverImage = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '';
    //         console.log("+++++++++++", books)
    //         this.listeBooks.push(books)
    //         return books;
    //       }))
    //     ).subscribe(()=>{}, error => {}, ()=>{
    //       console.log('je suis a la fin de mon subscribe' , this.listeBooks);
    //       localStorage.setItem('books', JSON.stringify(this.listeBooks))
    //     });


   // this.searchBooks(this.search)
  }
}
