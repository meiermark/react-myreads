import React from 'react'
import { Route } from 'react-router-dom'

import Library from './Library'
import BookSearch from './BookSearch'
import './App.css'

var assert = require('assert');

// initial books
var BOOKS = [
  {
    title: "To Kill a Mockingbird",
    authors: ["Harper Lee"],
    shelf: "currentlyReading",
    imageLinks: {
      smallThumbnail: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'
    }
  }
];


class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: BOOKS
    }

    this.moveBook = this.moveBook.bind(this);
    this.addBook = this.addBook.bind(this);
  }

  // move book from one shelf to another in the library
  moveBook(event) {
    // move book to new shelf
    var newBooks = this.state.books;

    // put book in new shelf
    if(event.target.value !== "none") {
      var selectedBooks = this.state.books.filter(book => book.title === event.target.name);
      // more or less than one hit would be unexpected
      assert(selectedBooks.length === 1);
      selectedBooks[0].shelf = event.target.value;
    }
    // remove book from library
    else {
      newBooks = newBooks.filter(book => book.title !== event.target.name);
    }

    this.setState({books: newBooks});
  }

  // add a book from the search to the library
  addBook(newBook) {
    var selectedBooks = this.state.books.filter(book => book.title === newBook.title);
    // more than one hit in the library would be unexpected
    assert(selectedBooks.length <= 1);

    // new book: add
    if(selectedBooks.length === 0) {
      var newBooks = this.state.books;
      newBooks.push(newBook);
      this.setState({books: newBooks});
    }
    // known book: update shelf
    else if(selectedBooks.length === 1) {
      selectedBooks[0].shelf = event.target.value;
    }
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() =>
          <BookSearch addBook={this.addBook}/>
        }/>

        <Route exact path="/" render={() =>
          <Library books={this.state.books} moveBook={this.moveBook}/>
        }/>
      </div>
    )
  }
}


export default BooksApp
