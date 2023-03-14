import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../Model/user";


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent  implements OnInit{
   public createAcountUser: any | FormGroup;

  constructor(private route:Router, private createAcountUserFormBuilder : FormBuilder) {
    console.log("create account")

  }

  ngOnInit(): void {
    this.ngOninitForm()
    }

  ngOninitForm(){
    console.log("je suis dans le ngoninit")

      this.createAcountUser=this.createAcountUserFormBuilder.group({
        Prenoms:['',[Validators.required]],
        nom:['',[Validators.required]],
        email:['',[Validators.required ,Validators.email]],
        password:['',[Validators.required]],
      })

  }


  onRefuseCreateAccount() {
    console.log('onRefuseCreateAccount')

    this.route.navigate(['/Home'])

  }

  onCreateAccount() {
    let userToInsert: User ={
      "nom" :this.createAcountUser.get('nom').value,
      "email":this.createAcountUser.get('email').value,
      "prenoms":this.createAcountUser.get('Prenoms').value,
      "motDePas":this.createAcountUser.get('password').value,
    }
    console.log(userToInsert)
    //@TODO ecrire le service qui permet d'inserrer un utilisateur en passant ar le service de façade
    Swal.fire(
      'Creation de Compte reussit!',
      'Connectez-vous maintenant pour continuer!',
      'success'
    ).then(result =>{
      console.log('onCreateAccount')
      this.route.navigate(['/Login'])
    })



  }

  onLogin() {
    console.log('jai clicker sur login')
    this.route.navigate(['/Login']).then(r => console.log(r))
  }
}
