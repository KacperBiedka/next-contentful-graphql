import type { ReactNode } from "react";
import Link from "next/link";

import tw from "twin.macro";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper className="layout">
      <header>
        <Link href="/">
          <Header>
            <Preheading>DROP IN</Preheading>
            <Heading>YOUR STuff</Heading>
          </Header>
        </Link>
      </header>

      <Content>{children}</Content>

      <Footer>
        <p>Made with love by Kacper Biedka 💙</p>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = tw.div`    
 flex flex-col min-h-screen
`;

const Header = tw.a`
   flex flex-col mt-10 p-5 uppercase text-center bg-slate-900 max-w-xs self-center mx-auto text-white
`;

const Preheading = tw.p`
    text-2xl m-0 font-sans
`;

const Heading = tw.h1`
    text-4xl m-0 font-sans
`;

const Content = tw.div`
    my-5 mx-auto max-w-7xl w-full h-full
`;

const Footer = tw.footer`
    bg-slate-800 px-6 py-8 text-slate-500 mt-auto text-center
`;

export default DefaultLayout;
