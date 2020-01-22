import React, { useEffect } from "react";
import Container from "./layouts/Container";
import SignIn from "../../redux/containers/SignICtn";
import ParticleField from "react-particles-webgl";

import animConfig from "./animConfig";

const config = animConfig;
const HomePage = props => {
  useEffect(() => {
    console.log("base props: ", props);
  });

  return (
    <Container justify="center" style={{ backgroundColor: "#f5950563" }}>
      <ParticleField config={config} />
      <SignIn>{props.children}</SignIn>
    </Container>
  );
};

export default HomePage;
