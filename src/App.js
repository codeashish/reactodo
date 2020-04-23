import React, { Component } from "react";
import "./App.css";
import axios from 'axios'
import loadingif from  './loading.gif'
import ListItem from './listitem'


class App extends Component {


  constructor() {
    super();
   this.apiUrl='https://5ea12c8feea7760016a9256d.mockapi.io/'
    this.handlechange = this.handlechange.bind(this)
    this.addtodo = this.addtodo.bind(this)
    this.deletetodo = this.deletetodo.bind(this)
     this.updateTodo = this.updateTodo.bind(this)
    this.edittodo=this.edittodo.bind(this)
    // this.generateToDoId=this.generateToDoId.bind(this)
    this.alert=this.alert.bind(this)

    this.state = {

      notification:null,
      buttoninfo: 'Add a todo',
      newtodo: '',
      editingIndex:null,
      todos: [],
      loading:true
    }

  }


// generateToDoId(){

//   const lasttodo=this.state.todos[this.state.todos.length-1]
//   if(lasttodo){
//     return lasttodo.id+1;

//   }
//   return 0
// }



  handlechange(event) {
    this.setState({
      newtodo: event.target.value
    })
    // console.log(event.target.name,event.target.value)
  }

  async addtodo() {
    const url=this.apiUrl+'todo'
    const res=await axios.post(url,{
      name:this.state.newtodo
    })

    // console.log(res)




    //State is mutable
    const oldtodo = this.state.todos;
    oldtodo.push(res.data)
    this.setState({
      todos: oldtodo,
      newtodo: '',
      buttoninfo: 'Add a ToDo'
    })
    this.alert('ToDo created sucessfully')


  }


  async deletetodo(index) {

    const url=this.apiUrl+'todo'


    const todos = this.state.todos;
    const todo=this.state.todos[index]
  await axios.delete(url+"/"+todo.id)
     delete todos[index]
    this.setState({
      todos
    })
    this.alert('Delete todo sucessfully ')

  }

  edittodo(index) {
    const todos = this.state.todos;

    this.setState({
      newtodo: todos[index].name,
      buttoninfo: 'Update todo',
      editingIndex:index,
      

    })
    



  }
  async updateTodo(){
    const todo=this.state.todos[this.state.editingIndex]
    const url=this.apiUrl+'todo'
    await axios.put(url+'/'+todo.id,{name:this.state.newtodo})

    todo.name=this.state.newtodo
    const todos=this.state.todos  
    todos[this.state.editingIndex]=todo
    
    this.setState({
      todos,
      newtodo: '', 
      editingIndex:null,
      buttoninfo:'Add todo'
    })
    this.alert("Todo updated Sucessfully ")

  }
  componentWillMount(){
    console.log("I will mount")
  }

  async componentDidMount(){
    let url=(this.apiUrl)+'/todo'
    const res=await axios.get(url)
   this.setState({
     todos:res.data,
     loading:false
   })

  }

  alert(notification){
    this.setState({
      notification
    })
    setTimeout(()=>{this.setState({notification:null})},2000)

  }








  render() {
    // console.log(this.state.newtodo)
    // console.log(this.state.buttoninfo === 'Update todo')
    return (
      
      
      <div className='container' >
      { this.state.notification &&
          <div className='alert alert-success mt-3 ' >
          <p className='text-center mt-2'>{this.state.notification}  </p>
        </div>  

      }
        <input className='my-4 form-control' placeholder='Add a new todo' name='todo' onChange={this.handlechange} value={this.state.newtodo} />
        <button className='btn-success form-control mb-4 ' disabled={this.state.newtodo.length<2}  onClick={(this.state.buttoninfo === 'Update todo')?this.updateTodo:this.addtodo } >{this.state.buttoninfo}</button>

      {
        this.state.loading &&
        <img src={loadingif}  className='rounded mx-auto d-block' width='100px' alt='Loader' />
      }


        {
          !(this.state.buttoninfo === 'Update todo') &&




          <ul className='list-group' >

            {this.state.todos.map((item, index) => {
              return <ListItem
                key={item.id}
              item={item} edittodo={()=>this.edittodo(index)}  deletetodo={()=>this.deletetodo(index)}      />
            })}
          </ul>



        }

      </div>
    )

  }

}
export default App;
