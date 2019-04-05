import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import 'antd/dist/antd.css';
import HomePage from './Home/HomePage';
import AddPage from './AddPage/AddPage';
import EditPage from './EditPage/EditPage';
import DefaultLayout from './DefaultLayout';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state =  {
      currentItem: 'home',
    }
  }

  handleClick = (e) => {
    this.setState({
      currentItem: e.key,
    });
  }

  render() {
    const { currentItem } = this.state;
    return (
      <div>
        <Router>
          <div>
            <Route
              exact path="/"
              render={() => <DefaultLayout currentItem={currentItem} onClick={this.handleClick}><HomePage /></DefaultLayout>}
            />
            <Route
              exact path="/add"
              render={() => <DefaultLayout currentItem={currentItem} onClick={this.handleClick}><AddPage /></DefaultLayout>}
            />
            <Route
              exact path="/edit/:id_recette"
              render={(props) => <DefaultLayout currentItem={currentItem} onClick={this.handleClick}><EditPage {...props} /></DefaultLayout>}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
