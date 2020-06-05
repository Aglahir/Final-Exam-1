import React from "react";
import Book from "./Book";

class BookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://www.googleapis.com/books/v1/volumes?q=",
      results: "",
    };
  }

  getBooks = (event) => {
    event.preventDefault();
    let settings = {
      method: "GET",
    };

    fetch(this.state.url + event.currentTarget.query.value, settings)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("error");
        }
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
        this.setState({ results: jsonResponse });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.getBooks}>
          <input id="query" />
          <button type="submit">Search</button>
        </form>
        <Book req={this.state.results} />
      </div>
    );
  }
}

export default BookForm;
