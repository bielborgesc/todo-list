import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {GET_TASK, GET_TASKIES, CREATE_TASK, UPDATE_TASK, DELETE_TASK} from '../graphql/graphql.queries';
import { Task } from '../model/task.model';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  taskies: Task[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_TASKIES
      })
      .valueChanges.subscribe((result: any) => {
        this.taskies = result?.data?.taskies;
        this.loading = result.loading;
        this.error = result.error;
      });
  }

}
