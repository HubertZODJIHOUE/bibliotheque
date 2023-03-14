import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserFacadeService} from "../facade/user-facade.service";
import {AbstractControl, FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {User} from "../Model/user";
import Swal from "sweetalert2";
import {ConnexionStatusService} from "../Service/ConnexionStatus/connexion-status.service";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{

  public isCreateAccounte =false;

  public username: string = "";
  public password: string = "";
  public isConnected: boolean=false;

  public isConnect : boolean=false;
  public isclickOnToconnect : boolean=false;
  user: SocialUser | undefined;
  // user: any ;
  loggedIn :boolean = false



  constructor(private  route :Router ,
              private userFacade:UserFacadeService ,
              private connexionService :ConnexionStatusService,
              private authService :SocialAuthService) {

  }

  // refreshToken(): void {
  //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }


  ngOnInit(): void {
    //   this.authService.authState.subscribe((user) => {
    //     this.user = user;
    //     this.loggedIn = (user != null);
    //   }, error => {}, ()=>{ console.log("@@@@@@@@@@@@@@@@@@@", this.user)});
    // }
  }
  ngOnchange(){

  }

  signOut(): void {
    this.authService.signOut().then();
  }

  signInWithGoogle(): void {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user)=>{this.user=user;console.log('testons user', this.user)
      this.isConnect=true;
      this.connexionService.sendConnectionStatus(this.isConnect)
      Swal.fire(
        'login!',
        'Authentification reussit!',
        'success'
      ).then(result =>{
        this.route.navigate(['/Home'])
      })
    } );
  }



  onClickToLogoin() {


    this.isclickOnToconnect= true
    const usersListe = this.userFacade.getAllUsers();
    if(usersListe ){
      const authuser= usersListe.filter(user=>user.nomUtilisateur===this.username);
      if(authuser.length===1 && authuser[0].motDePas===this.password){
        this.isConnect=true;
        this.connexionService.sendConnectionStatus(this.isConnect)
        Swal.fire(
          'login!',
          'Authentification reussit!',
          'success'
        ).then(result =>{
          this.route.navigate(['/Home'])
        })
      }
    }
  }

  onCreateAccount() {
    // this.isCreateAccounte=true;
    this.route.navigate(['/CreateAccount'])

  }

  validLogin(c:AbstractControl):{[key:string]:boolean}|null{
    if(c.get('username') && c.get('password')){
      let userToConnect = this.userFacade.getUserByUsername(c.get('username')?.value)
      if(c.get('password')?.value){
        if(c.get('password')?.value === userToConnect?.prenoms){
          return null
        }
      }
    }

    return {'match': true}
  }





  // loginWithGoogle(): void {
  //   this.auth.signIn(GoogleLoginProvider.PROVIDER_ID).then(r => console.log('ok'));
  // }
  // logOut(): void {
  //   this.auth.signOut();
  // }

  // isConnected() {
  //
  // }


}




