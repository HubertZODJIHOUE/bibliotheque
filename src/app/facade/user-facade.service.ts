import {Injectable} from '@angular/core';
import {User} from "../Model/user";


@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {


  public userListe:User[] =[]
   public admin :User ={
   motDePas: "root",
   nom : 'zodjihoue',
   email :'hubert@gmail.com',
   nomUtilisateur : 'root',
   prenoms: 'hubert'
  }
  public Books: any
  public resultOfUserSearch: User|undefined

  constructor() { }


  ngOnInit(){
    this.userListe.push(this.admin)
    this.insertUserInData(this.admin)
    console.log(this.getAllUsers());

  }
  getAllUsers(){
    let users=[]
    users.push(this.admin)
    return users
  }

  iniitUserData(): User {
    return {
      motDePas: "root",
      nom: 'zodjihoue',
      email: 'hubert@gmail.com',
      nomUtilisateur: 'root',
      prenoms: 'hubert'
    }
  }

  getUserByUsername(username  : string): User | undefined{
    if(this.getAllUsers()){
      let users= this.getAllUsers()
      console.log("getAllUsers :",users)
      users.forEach(user=>{
        if(user.nom===username){

          this.resultOfUserSearch= user
          console.log(this.resultOfUserSearch)
          return  ;
        }
      })
    }
   return this.resultOfUserSearch
  }
  insertUserInData(userToInsert: User){
    this.userListe.push(userToInsert)
  //@TODO

    /**
     * ajouter la fonction d'insertion en BD
     */
  }


}
