import type { NextPage } from "next";
import tw from "twin.macro";

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Header>Content will come here ✨</Header>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex p-4 h-full w-full
`;

const Header = tw.h1`
`;

export default Home;
