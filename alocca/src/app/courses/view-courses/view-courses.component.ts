﻿import { Component, OnInit } from '@angular/core';

import { DialogsService } from '../../services/dialogs.service';
import { SnackbarService } from '../../services/snackbar.service';
import { CoursesDmService } from '../../data-manager/courses/courses-dm.service';


@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {
  /**
   * List of saved Courses.
   */
  courses: any[];
  /**
   * Message to display when a course is deleted.
   */
  DELETED_MESSAGE: string = "Disciplina deletada com sucesso!";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when a course is deleted.
   */
  TIMEOUT_DELETED_MESSAGE: number = 2500;
  /**
   * Message to display when a course is not deleted.
   */
  NOT_DELETED_MESSAGE: string = "Não foi possível remover a disciplina. Tente novamente!";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when a course is not deleted.
   */
  TIMEOUT_NOT_DELETED_MESSAGE: number = 5000;

  constructor(
    private snackService: SnackbarService,
    private dialogsService: DialogsService,
    private courseDM: CoursesDmService    
  ) { }

  /**
   * Sets necessary elements on the start of the page.
   */
  ngOnInit() {
    this.courseDM.getCourses().subscribe(courses =>{
      this.courses = courses;
    });
  }

  /**
   * Delete selected course.
   * 
   * @param id Key (code) of the course selected to be deleted.
   * @param courseShortName  Short name of the course selected to be deleted.
   */
  onDeleteCourse(id: string, courseShortName: string){
    var title = "Excluir Disciplina";
    var message = "Deseja realmente excluir a disciplina "+courseShortName+" ?";
    this.dialogsService
      .confirm(title, message)
      .subscribe(res => {
        if (res) {
          this.courseDM.deleteCourse(id).then(() => {
            this.snackService.openSnackBar(this.DELETED_MESSAGE,this.TIMEOUT_DELETED_MESSAGE);            
          }).catch(() => {
            this.snackService.openSnackBar(this.NOT_DELETED_MESSAGE,this.TIMEOUT_NOT_DELETED_MESSAGE);            
          })
        }
      });
  }
}
