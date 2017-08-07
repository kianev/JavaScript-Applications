import React, { Component } from 'react';

export default class Books extends Component {
    render() {
        let bookRows = this.props.books.map(book =>
            <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>

            </tr>
        );

        return (
            <div className="books-view">
                <h1>Books</h1>
                <table className="books-table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookRows}
                    </tbody>
                </table>
            </div>
        );
    }
}
