import React from 'react'
import { Book, type2expr } from './Book'
import { Link } from 'react-router-dom'


class Library extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {/* Add shelves */}
            {Object.keys(type2expr).map(shelf => (
              <Shelf books={this.props.books} key={shelf} shelfType={shelf} moveBook={this.props.moveBook}/>
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
    )
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


export default Library
