import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../../Model/livre";

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  private baseurl = 'http://localhost:8033/api/books';

  constructor(private  http :HttpClient) { }

  getLivres(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseurl);
  }

  getBookById(bookId: number): Observable<Book> {
    const url = `${this.baseurl}/${bookId}`;
    return this.http.get<Book>(url);
  }

  /** POST: add a new livre to the server */
  addLivre(livre: Book): Observable<Book> {
    return this.http.post<Book>(this.baseurl, livre);
  }

  /** DELETE: delete the livre from the server */
  deleteLivre(id: number): Observable<Book> {
    const url = `${this.baseurl}/${id}`;
    return this.http.delete<Book>(url);
  }

  /** PUT: update the livre on the server */
  updateLivre(livre: Book): Observable<any> {
    return this.http.put(this.baseurl, livre);
  }

}
