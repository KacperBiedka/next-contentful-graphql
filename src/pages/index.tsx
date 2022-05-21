import type { NextPage } from "next";
import tw from "twin.macro";

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Header>Witam witam</Header>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex p-4 bg-green-100
`;

const Header = tw.h1`
  dark:bg-slate-900
`;

export default Home;
