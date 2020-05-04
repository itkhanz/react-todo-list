import React, { Component }from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import About from './components/pages/About';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';


class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5') 
      .then(res => this.setState({ todos: res.data }))
  }

  // Toggle Complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => { 
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  // Delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }) );
  }

  //Add Todo
  addTodo = (title) => {
    // const newTodo = {
    //   id: uuidv4(),
    //   title,
    //   completed: false
    // }
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then(res => this.setState({ todos: 
      [...this.state.todos, res.data] }));
  }

  render() {
    // console.log(this.state.todos);

    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                < Todos 
                  todos={this.state.todos} 
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}  
                />      
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />

            <div className="App-cover">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  A React JS App
                </p>
              </header> 
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;






// Logo Code
{/* <header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Hello World!
  </p>
</header>  */}