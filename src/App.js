import * as BooksAPI from './BooksAPI'

import React from 'react'
import { Route } from 'react-router-dom'

import Library from './Library'
import BookSearch from './BookSearch'
import './App.css'


class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }

    this.moveBook = this.moveBook.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((newBooks) => this.setState({
      books: newBooks
    }))
  }

  // move book from one shelf to another in the library
  moveBook(event) {
    var targetShelf = event.target.value;
    var targetId = event.target.name;

    BooksAPI.get(targetId).then((newBook) =>
      BooksAPI.update(newBook, targetShelf).then(() =>
        BooksAPI.getAll().then((newBooks) => this.setState({
          books: newBooks
        }))
      )
    )
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() =>
          <BookSearch knownBooks={this.state.books} moveBook={this.moveBook}/>
        }/>

        <Route exact path="/" render={() =>
          <Library books={this.state.books} moveBook={this.moveBook}/>
        }/>
      </div>
    )
  }
}


export default BooksApp
