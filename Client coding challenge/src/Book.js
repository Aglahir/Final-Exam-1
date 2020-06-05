import React from "react";

function Book(props) {
  if (props.req) {
    return (
      <div>
        {props.req.items.map((value, index) => {
          return (
            <div>
              <p>{value.volumeInfo.title}</p>
              <img src="{value.imageLinks.smallThumbnail}" />
              <p>{value.volumeInfo.description}</p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Book;
