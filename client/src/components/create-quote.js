import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default class CreateQuote extends Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      username: '',
      author: '',
      description: '',
      date: new Date(),
      users: []
    }
  }

  componentDidMount(){
    axios.get('https://quoteappmotivational.herokuapp.com/users')
    .then(res => {
      this.setState({
        users: res.data.map(user => user.username),
        username: res.data[0].username
      })
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDate(e){
    this.setState({
      date: e
    })
  }

  handleSubmit(e){
    e.preventDefault();
    
    const quote = {
      username: this.state.username,
      author: this.state.author,
      description: this.state.description,
      date: this.state.date
    }

    axios.post('https://quoteappmotivational.herokuapp.com/quotes/add', quote)
    .then(res => console.log(res.data))
    .catch(err => console.log(`Error: ${err}`))

    window.location = '/'
  }

  render(){
    return(
      <div>
        <h3>Add a Quote</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username </label>
            <select ref='userInput'
                name="username"
                required
                className='form-control'
                value={this.state.username}
                onChange={this.handleChange}>
                {
                  this.state.users.map(user => {
                    return <option key={user} value={user}>
                      {user}
                    </option>
                  })
                }
                </select>
          </div>
          <div className="form-group">
            <label>Quote: </label>
            <input type="text"
              name="description"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Author </label>
            <input type="text"
              name="author"
              required
              className="form-control"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker 
                selected={this.state.date}
                onChange={this.handleDate}
              />
            </div>
          </div>
          <div className="form-group">
                <input type="submit" value="Add Quote"
                  className="btn btn-primary"
                />
          </div>
        </form>
      </div>
    )
  }
} 