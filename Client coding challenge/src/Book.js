import React from "react";

function Book(props) {
  return (
    <div>
      {props.req.items.map((value, index) => {
        return <p>{value.volumeInfo.title}</p>;
      })}
    </div>
  );
}

export default Book;
