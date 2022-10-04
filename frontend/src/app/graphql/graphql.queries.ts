import {gql} from 'apollo-angular'

const GET_TASKIES = gql`
  {
    taskies{
        id
        title
        status
    }
  }
`
const GET_TASK = gql`
  query Task($input:Int!){
    task(id: $input){
      id
      title
      status
    }
  }
`

const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!){
    createTask(createTaskInput: $input){
      id
      title
      status
    }
  }
`

const UPDATE_TASK = `
  mutation UpdateTask($input: UpdateTaskInput!){
    updateTask(updateTaskInput: $input){
      id,
      title
      status
    }
  }
`

const DELETE_TASK = gql`
  mutation RemoveTask($input: Int!){
    removeTask(id: $input){id}
  }
`

export {GET_TASK, GET_TASKIES, CREATE_TASK, UPDATE_TASK, DELETE_TASK}
