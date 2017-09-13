import React from 'react'
import { Link, Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'


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


const type2expr = {
  "currentlyReading" : "Currently Reading",
  "read" : "Read",
  "wantToRead" : "Want to Read"
}


class Book extends React.Component {
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            backgroundImage: "url(\""+this.props.book.imageLinks.smallThumbnail+"\")",
            width: 128,
            height: 193
          }}></div>
          {/* more complicated... moved to own component */}
          <ShelfSelector book={this.props.book} moveBook={this.props.moveBook}/>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors.join("; ")}</div>
      </div>
    );
  }
}


class ShelfSelector extends React.Component{
  render() {
    return (
      <div className="book-shelf-changer">
      <select name={this.props.book.title} onChange={this.props.moveBook} defaultValue={this.props.book.shelf}>
        {/* diabled option with instructions for the selector */}
        <option name={this.props.book.title} value="none" disabled>
          Move to...
        </option>
        {/* add options for other shelfs */}
        {Object.keys(type2expr).map(shelf => (
          <option key={shelf} name={this.props.book.title} value={shelf}>
            {type2expr[shelf]}
          </option>
        ))}

        {/* would hide the book but not remove it from the library */}
        <option name={this.props.book.title} value="none">None</option>
      </select>
      </div>
    );
  }
}


class Shelf extends React.Component {
  render() {
    // filter books that are in this shelf
    var printBooks = this.props.books.filter(
      book => this.props.shelfType === book.shelf);

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{type2expr[this.props.shelfType]}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* print books */}
            {printBooks.map(book => (
              <li key={book.title}>
                <Book book={book} moveBook={this.props.moveBook}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}


class BookSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      foundBooks: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.rememberBook = this.rememberBook.bind(this);
  }

  handleChange(event) {
    var newQuery = event.target.value;
    const maxResults = 10;

    this.setState({
      searchQuery: newQuery,
    });

    var newBooks = BooksAPI.search(newQuery, maxResults);
    newBooks.then(val => this.setState({
      foundBooks: val
    }));
  }

  rememberBook(event) {
    var rememberedBook = this.state.foundBooks.filter(
      book => book.title === event.target.name
    )[0];
    rememberedBook.shelf = event.target.value;
    this.props.addBook(rememberedBook);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
        <div className="close-search">
          <Link
            to="/"
            className="BookSearch"
          >Library</Link>
        </div>

          {/*<a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>*/}
          <div className="search-books-input-wrapper">
            <SearchField handleChange={this.handleChange} value={this.state.searchQuery}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.foundBooks.map(book => (
            <li key={book.title}>
              <Book book={book} moveBook={this.rememberBook}/>
            </li>
          ))}
          </ol>
        </div>
      </div>
    );
  }
}


class SearchField extends React.Component {
  render() {
    return (
      <input type="text" placeholder="Search by title or author" onChange={this.props.handleChange} value={this.props.value}/>
    )
  }
}


class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: BOOKS
    }

    this.moveBook = this.moveBook.bind(this);
    this.addBook = this.addBook.bind(this);
  }

  moveBook(event) {
    /* move book to new shelf */
    var newBooks = this.state.books;
    newBooks.filter(book => book.title === event.target.name)[0].shelf = event.target.value;
    this.setState({books: newBooks});
    //TODO: remove book if shelf is none
  }

  addBook(newBook) {
    if(this.state.books.filter(book => book.title === newBook.title).length === 0) {
      var newBooks = this.state.books;
      newBooks.push(newBook);
      this.setState({books: newBooks});
    }
    //TODO otherwise the book already exists... update shelf???
  }

  render() {
    return (
      <div className="app">

        <Route path="/search" render={() =>
          <BookSearch addBook={this.addBook}/>
        }/>

        <Route exact path="/" render={() =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {/* Add shelves */}
                {Object.keys(type2expr).map(shelf => (
                  <Shelf books={this.state.books} key={shelf} shelfType={shelf} moveBook={this.moveBook}/>
                ))}
              </div>
            </div>

            <div className="open-search">
              <Link

                to="/search"
                className="BookSearch"
              >Add a book</Link>
            </div>
          </div>
        }/>
      </div>
    )
  }
}

export default BooksApp
