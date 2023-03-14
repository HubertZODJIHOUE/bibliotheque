 export interface Livre{
  isbn :string,
  title:string,
  author:string,
  overview : string,
  picture: string,
  editionYears?:Date,

}

 export class Book {
   title?: string;
   author?: string;
   ISBN?: string;
   publishedDate?: string;
   description?: string;
   coverImage?: string;
   isLiked : boolean = false
 }
