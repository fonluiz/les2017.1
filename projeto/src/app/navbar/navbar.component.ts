import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AddSemesterComponent } from '../semesters/add-semester/add-semester.component';
import { AddCourseComponent } from '../courses/add-course/add-course.component';
import { FirebaseService } from '../services/firebase.service';
//import { User } from '../users/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  semesters: string[];
  user: Observable<firebase.User>;
  TIMEOUT_NOT_REGISTERED = 5000;
  NOT_REGISTERED_MESSAGE: string = "Opa! Parece que você não está cadastrado. Entre em contato com o administrador.";

  constructor(
    public dialog: MdDialog,
    private FBservice: FirebaseService,
    public db: AngularFireDatabase,
    public dbAuth: AngularFireAuth,
    private _flashMessagesService: FlashMessagesService,
    private router: Router) {
    this.user = dbAuth.authState
  }
  ngOnInit(){
    this.FBservice.getSemesters().subscribe(semesters => {
          this.semesters = semesters;
    });
    if (this.dbAuth.authState && this.router.url==='/home-body'){
      this.router.navigate(['home-body']);
    }
  }

  openDialog() {
      let dialogRef = this.dialog.open(AddSemesterComponent);
    dialogRef.afterClosed().subscribe(result => {
      // this.selectedOption = result;
    });
  }


  logout(){
    this.dbAuth.auth.signOut();
  }
}
