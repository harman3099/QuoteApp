import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Quote = props => (
  <tr>
    <td className="font-weight-bold text-break border-right"> <span className="font-italic">"{props.quote.description}"</span>  - {props.quote.author}. </td>
    <td className="border-right">{props.quote.username}</td>
    <td className="border-right">{props.quote.date.substring(0,10)}</td>
    <td>
    <Link className='btn btn-sm btn-info m-1' to={`/edit/${props.quote._id}`}>Edit Author</Link> <button className='btn btn-sm btn-danger ml-1' onClick={() => {props.deleteQuote(props.quote._id)}}>Delete</button>
    </td>
  </tr>
);

export default class QuotesList extends Component{
  constructor(props){
    super(props);

    this.deleteQuote = this.deleteQuote.bind(this);
    this.quotesList = this.quotesList.bind(this);

    this.state = {
      quotes: []
    }
  }

  componentDidMount(){
    axios.get('https://quoteappmotivational.herokuapp.com/quotes')
    .then(res => {
      this.setState({
        quotes: res.data
      })
    })
    .catch(err => console.log(err));
  }

  deleteQuote(id){
    axios.delete(`https://quoteappmotivational.herokuapp.com/quotes/${id}`)
    .then(() => console.log('Quote Deleted'))
    this.setState({
      quotes: this.state.quotes.filter(quote => quote._id !== id)
    })
  }

  quotesList(){
    return this.state.quotes.map(currQ => {
      return <Quote quote={currQ}
              deleteQuote={this.deleteQuote}
              key={currQ._id}
              />
    })
  }

  render(){
    return(
      <div>
        <h3 className="text-center">Motivational Quotes provide you a little push towards achieving your goals.</h3>
        <hr/>
        <h5 className="text-center">Share your favourite quote with us. You may notice some of the Quotes have an unknown author.
          If you happen to know the author please feel free to update the quote. </h5>
        <hr/>
        <br/>
        <table className='table table-fixed'>
          <thead className='thead-light'>
            <tr>
              <th className="text-center">Quote</th>
              <th className="text-center">Submitted By</th>
              <th className="text-center">Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.quotesList()}
          </tbody>
        </table>
      </div>
    )
  }
}

