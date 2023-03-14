import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Livre} from "../Model/livre";
import Swal from "sweetalert2";
import {ConnexionStatusService} from "../Service/ConnexionStatus/connexion-status.service";
import {Observable} from "rxjs";
import * as events from "events";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit{



  public addBookForm:any| FormGroup;
  public isConnected :boolean=false

  public errorMessage: any;
  public fileContent:any ;



  constructor(private route:Router , private _fb: FormBuilder, private connexionservice:ConnexionStatusService) {

  }
  ngOnInit(): void {
    // if(this.isConnected!=true){
    //   this.route.navigate(['/Home'])
    // }else{
    //   this.ngOninitForm()
    // }
    this.ngOninitForm()

  }

  ngOninitForm(){
    this.addBookForm=this._fb.group({
      isbn:['',[Validators.required]],
      title:['',[Validators.required]],
      author:['',[Validators.required]],
      overview:['',[Validators.required]],
      picture:['',[Validators.required]],
      editionYears:['',[]],
    })

    this.connexionservice.getConnectionStatus().subscribe(status=>{
      this.isConnected=status})
  }

  onRefuse() {
    console.log('refuse')
    this.route.navigate(['/Home'])

  }

  onAccepte() {

      let livre:Livre = {
        author: this.addBookForm.get('author').value,
        overview: this.addBookForm.get('overview').value,
        picture: this.addBookForm.get('picture').value,
        title: this.addBookForm.get('title').value,
        isbn:this.addBookForm.get('isbn').value,
        editionYears: this.addBookForm.get('editionYears').value,
      }
      console.log(livre)
      Swal.fire(
        'Livre!',
        'Le livre '+ livre.title+ 'a été ajouté',
        'success'
      ).then(result =>{
        console.log('onCreateAccount')
        this.route.navigate(['/Home'])
      })

    console.log('accepte')

  }


  // uploadPictureFiles(files: any) {
  //   this.imageService
  //     .getBase64(file[0])
  //     .subscribe(str => this.coverPhotos = str);
  //
  // }
  //
  // getBase64(file): Observable<string> {
  //   return new Observable<string>(sub => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       sub.next(reader.result.toString());
  //       sub.complete();
  //     };
  //     reader.onerror = error => {
  //       sub.error(error);
  //     };
  //   })
  // }


  uploadPictureFiles($event: Event ) {
    // const file= events.
    //
    const  reader = new FileReader();
    reader.onload=()=>{
      this.fileContent = reader.result as string;

    }
    reader.onerror = (error) => {
      this.errorMessage = `Une erreur s'est produite pendant la lecture du fichier : ${error}`;
    }

    //@TODO
    /**
     * revoir ajout des fichiers image
     *
     */
    // try {
    //   reader.readAsText(file);
    // } catch (error) {
    //   this.errorMessage = `Une erreur s'est produite lors de la lecture du fichier : ${error}`;
    // }
  }
}
