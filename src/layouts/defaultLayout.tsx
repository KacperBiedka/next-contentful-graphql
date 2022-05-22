import type { ReactNode } from "react";
import Link from "next/link";

import tw from "twin.macro";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper className="layout">
      <header>
        <Link href="/">
          <Header>
            <Heading>Inspos</Heading>
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
    cursor-pointer
`;

const Heading = tw.h1`
    text-4xl m-0 font-sans my-5 mx-5
`;

const Content = tw.div`
    md:mt-5 mb-10 mx-auto max-w-7xl w-full h-full p-5
`;

const Footer = tw.footer`
    bg-slate-900 p-2 text-slate-500 mt-auto text-center
`;

export default DefaultLayout;
