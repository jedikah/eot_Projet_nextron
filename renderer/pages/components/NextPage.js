import React, { useEffect } from "react";

const NextPage = props => {
  useEffect(() => {
    //console.log("base props: ", props);
  });

  return <div>{props.children}</div>;
};

export default HomePage;
