import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import QuotesList from "./components/quotes-List";
import EditQuote from "./components/edit-quote";
import CreateQuote from "./components/create-quote";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div >
        <Navbar/>
        <div className="container p-3" style={{backgroundColor: "rgba(255, 255, 255, 0.4)"}}>
          <Route path='/' exact component={QuotesList} />
          <Route path='/edit/:id' component={EditQuote} />
          <Route path='/create' component={CreateQuote} />
          <Route path='/user' component={CreateUser} />
        </div>
      </div>
    </Router>
    
  );
}

export default App;
