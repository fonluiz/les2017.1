﻿import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SnackbarService } from '../../services/snackbar.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Class } from '../class.model'
import { Schedule } from '../schedule.model'

@Component({
  selector: 'app-add-allocation',
  templateUrl: './add-allocation.component.html',
  styleUrls: ['./add-allocation.component.css']
})
export class AddAllocationComponent implements OnInit {
  SAVED_SUCCESSFULLY_MESSAGE: string = "Novas turmas criadas!";
  NOT_SAVED_MESSAGE: string = "Erro ao salvar. Verifique se a turma já foi cadastrada.";
  MESSAGES_TIME = 4000;
  coursesList: any[];
  courseKey: string;
  classesNumber: number;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private snackbarsService: SnackbarService
    ) {}


  ngOnInit() {
    this.FBservice.getCourses().subscribe(coursesnames =>{
      this.coursesList = coursesnames;
    });
  }

  saveNewClasses(){
    for (var _i = 1; _i <= this.classesNumber; _i++) {
          let newClass = new Class(this.courseKey, _i);
          this.FBservice.saveClass(newClass);
    }

    // if (savedSuccessfully) {
    //   this.snackbarsService.openSnackBar(this.SAVED_SUCCESSFULLY_MESSAGE, this.MESSAGES_TIME);
    // } else {
    //   this.snackbarsService.openSnackBar(this.NOT_SAVED_MESSAGE, this.MESSAGES_TIME);
    // }

  }
}
