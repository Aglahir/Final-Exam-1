import React from "react";
import "./App.css";
import Book from "./Book";
import BookForm from "./BookForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://www.googleapis.com/books/v1/volumes?q=",
    };
  }

  /* 
    Your code goes here
  */

  render() {
    return (
      <div>
        <BookForm />
      </div>
    );
  }
}

export default App;
