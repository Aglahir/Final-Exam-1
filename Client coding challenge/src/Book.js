import React from "react";

function Book(props) {
  if (props) {
    return (
      <div>
        {props.req.items.map((value, index) => {
          return <p>{value.volumeInfo.title}</p>;
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Book;
