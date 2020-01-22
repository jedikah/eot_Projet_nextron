import React, { useEffect } from "react";
import Container from "./layouts/Container";
import SignIn from "./layouts/SignIn";

const HomePage = props => {
  useEffect(() => {
    console.log("base props: ", props);
  });

  return (
    <Container justify="center" style={{ border: "1px solid red" }}>
      <SignIn></SignIn>
      {props.children}
    </Container>
  );
};

export default HomePage;
