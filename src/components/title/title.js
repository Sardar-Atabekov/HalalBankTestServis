import React from "react";
import "./title.css";
const Title = ({ children }) => {
  return (
    <div className={"title-block my-4 my-lg-3"}>
      <h2 className={"titleStyle"}>{children}</h2>
      <div className="line"></div>
    </div>
  );
};
export default Title;
