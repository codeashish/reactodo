import React, { Component } from "react";
import "./App.css";

class App extends Component {


  constructor() {
    super();

    this.handlechange = this.handlechange.bind(this)
    this.addtodo = this.addtodo.bind(this)
    this.deletetodo = this.deletetodo.bind(this)
    this.updatetodo = this.updatetodo.bind(this)
    this.state = {
      buttoninfo: 'Add a todo',
      newtodo: '',
      todos: [{
        id: 1, name: 'Eat'
      },
      {
        id: 2, name: 'Play PUBG'
      },
      {
        id: 3, name: 'Play Cricket'
      }, {
        id: 4, name: 'sleep'
      }]
    }

  }


  handlechange(event) {
    this.setState({
      newtodo: event.target.value
    })
    // console.log(event.target.name,event.target.value)
  }

  addtodo() {
    const newtodo = {
      name: this.state.newtodo,
      id: this.state.todos.length ? (this.state.todos[this.state.todos.length - 1].id + 1) : 0
    };
    //State is mutable
    const oldtodo = this.state.todos;
    oldtodo.push(newtodo)
    this.setState({
      todos: oldtodo,
      newtodo: '',
      buttoninfo: 'Add a ToDo'
    })


  }


  deletetodo(index) {
    const todos = this.state.todos;
    delete todos[index]
    //console.log(todos)
    this.setState({
      todos
    })

  }

  updatetodo(index) {
    const todos = this.state.todos;

    this.setState({
      newtodo: todos[index].name,
      buttoninfo: 'Update todo'

    })
    this.deletetodo(index)



  }

  render() {
    // console.log(this.state.newtodo)
    console.log(this.state.buttoninfo === 'Update todo')
    return (


      <div className='container' >
        <input className='my-4 form-control' placeholder='Add a new todo' name='todo' onChange={this.handlechange} value={this.state.newtodo} />
        <button className='btn-info form-control mb-4 ' onClick={this.addtodo} >{this.state.buttoninfo}</button>

        {
          !(this.state.buttoninfo === 'Update todo') &&

          <ul className='list-group' >

            {this.state.todos.map((item, index) => {
              return <li key={item.id} className='list-group-item' >  <button className='btn-sm btn btn-info mr-5 ' onClick={() => this.updatetodo(index)} > U</button>                  {item.name}    <button className='btn-sm btn btn-danger ml-5 ' onClick={() => this.deletetodo(index)} > x</button>        </li>
            })}
          </ul>



        }

      </div>
    )

  }

}
export default App;
