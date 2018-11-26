import React, { Component } from 'react';
import Title from './title/Title'
import TodoFrom from './todo-form/TodoForm'
import TodoList from './todo-list/TodoList';
import './TodoApp.css';

class App extends Component {
  state = {
    data: [],
    todoItem: ""
  }

  setTodoItemState = (val) => {
    this.setState({todoItem: val})
  }
//this will render our list as soon as we load. Otherwise it will only render when we add an todo item
  componentDidMount() {
    this.getTodos()
  }

  getTodos() {
    fetch("http://localhost:5002/todos")
    .then((data) => data.json())
    .then(todos => this.setState({data: todos}))
  }

  addTodo = () => {
    const newTodo = {text: this.state.todoItem}
    fetch("http://localhost:5002/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(newTodo)
    })
    .then(() => this.getTodos())
  }

  deleteTodo = (id) => {
    fetch(`http://localhost:5002/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify()
    })
    .then(e => e.json())
    .then(() => this.getTodos())
  }



  render() {
    return (
      <div className="TodoApp">
        <Title />
        <TodoFrom addTodo={this.addTodo} setTodoItemState={this.setTodoItemState}/>
        <TodoList deleteTodo={this.deleteTodo} todos={this.state.data} componentDidMount={this.componentDidMount}/>
      </div>
    )
  }
}

export default App;
