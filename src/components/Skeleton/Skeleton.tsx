import type { FC } from "react";
import tw from "twin.macro";

export const Skeleton: FC = () => {
  return (
    <Wrapper>
      <Banner />
      <Title />
      <Info />
      <Content />
    </Wrapper>
  );
};

const Wrapper = tw.div`
    flex flex-col my-5
`;

const Banner = tw.div`
    bg-slate-100 rounded-sm my-5 py-9
`;

const Title = tw.div`
    bg-slate-100 rounded-sm my-5 h-10 w-full max-w-md
`;

const Info = tw.div`
    bg-slate-100 rounded-sm h-5 my-5
`;

const Content = tw.div`
    bg-slate-100 rounded-sm my-5 py-2
`;
