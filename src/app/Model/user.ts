import {Book} from "./livre";

export interface User{
  nom:string,
  prenoms: string,
  email: string,
  id?: any,
  nomUtilisateur? : string,
  motDePas: string
}

export interface Utilisateur{
  id?:any,
  nom:string,
  prenom:string,
  email:string,
  role?:any,
  envies:Book[];
  preferences:Book[];
}
