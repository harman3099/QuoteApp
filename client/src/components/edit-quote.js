import React, {Component} from 'react';
import axios from 'axios';

export default class EditQuote extends Component{
  constructor(props){
    super(props);

    this.handleAuthor = this.handleAuthor.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      username: '',
      author: '',
      description: '',
      date: new Date()
    }
  }

  componentDidMount(){

    axios.get(`https://quoteappmotivational.herokuapp.com/quotes/${this.props.match.params.id}`)
    .then(res => {
      this.setState({
        username: res.data.username,
        author: res.data.author,
        description: res.data.description,
        date: new Date(res.data.date)
      })
    })
    .catch(err => console.log(err));
  }

  handleAuthor(e){
    this.setState({
      author: e.target.value
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

    axios.post(`https://quoteappmotivational.herokuapp.com/quotes/update/${this.props.match.params.id}`, quote)
    .then(res => console.log(res.data))

    window.location = '/';
  }

  render(){
    return(
      <div>
        <h4>Update Author of Quote: </h4>
        <h5 className="font-weight-bold font-italic">"{this.state.description}"</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
          </div>
          <div className="form-group">
            <label>Author </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.author}
              onChange={this.handleAuthor}
            />
          </div>
          <div className="form-group">
                <input type="submit" value="Update Author"
                  className="btn btn-primary"
                />
          </div>
        </form>
      </div>
    )
  }
} 