import React from "react";

const DropDown = (props) => {
  return <article> {props.visibility && props.children}</article>;
};

export default DropDown;
