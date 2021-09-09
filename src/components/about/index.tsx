import styled from "styled-components";
import Flex from "@/components/about/flex";

const StylesTitle = styled.h2`
  height: 50px;
  font-size: 48px;
`;

const About = () => (
  <Flex justify="center">
    <StylesTitle>About</StylesTitle>
  </Flex>
);

export default About;
