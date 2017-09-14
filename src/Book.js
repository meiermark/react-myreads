import React from 'react'


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
      <select name={this.props.book.id}
        onChange={this.props.moveBook}
        defaultValue={this.props.book.shelf?this.props.book.shelf:"none"}>

        {/* diabled option with instructions for the selector */}
        <option name={this.props.book.id} value="none" disabled>
          Move to...
        </option>
        {/* add options for other shelfs */}
        {Object.keys(type2expr).map(shelf => (
          <option key={shelf} name={this.props.book.id} value={shelf}>
            {type2expr[shelf]}
          </option>
        ))}

        {/* would hide the book but not remove it from the library */}
        <option name={this.props.book.id} value="none">None</option>
      </select>
      </div>
    );
  }
}


export { Book, type2expr }
