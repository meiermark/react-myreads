import * as BooksAPI from './BooksAPI'

import React from 'react'
import { Book } from './Book'
import { Link } from 'react-router-dom'


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


export default BookSearch
