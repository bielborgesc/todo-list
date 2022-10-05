import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_TASK, GET_TASKIES, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from '../graphql/graphql.queries';
import { Task } from '../model/task.model';
import * as moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs';
import { TaskDto } from '../model/task.dto.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  taskForm: FormGroup = new FormGroup({
    inputTask: new FormControl()
  });

  taskies: Task[] = [];
  loading = true;
  error: any;
  today: moment.Moment = moment();


  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_TASKIES
      })
      .valueChanges.pipe(
        map((result: any) => {
          // console.log(result.data.taskies);
          this.taskies = result?.data?.taskies;
          this.loading = result.loading;
          this.error = result.error;
        })
      )
      .subscribe();
  }

  deleteTask(id: number) {
    const input = {"input": id}
    this.apollo.mutate({
      mutation: DELETE_TASK,
      refetchQueries: [{query: GET_TASKIES}],
      variables: input
    }).subscribe()
  }

  updateTask(task: Task, value: boolean) {
    const input = {
      "input": {
          "id": task.id,
          "status": value,
          "title": `${task.title}`,
      }
    }
    this.apollo.mutate({
      mutation: UPDATE_TASK,
      refetchQueries: [{query: GET_TASKIES}],
      variables: input
    }).subscribe(() => {
      this.taskForm.value.inputTask = ""
    })
  }

  putTask() {
    const input = {
      "input": {
          "status": false,
          "title": `${this.taskForm.value.inputTask}`,
      }
  }
    this.apollo.mutate({
      mutation: CREATE_TASK,
      refetchQueries: [{query: GET_TASKIES}],
      variables: input
    }).subscribe(() => {
      this.taskForm.value.inputTask = ""
    });
  }

}
