import type { NextPage } from "next";
import tw from "twin.macro";
import type { Entry } from "contentful";
import { createClient } from "contentful";

import type { IInspoFields } from "schema/generated/contentful";

type InspoItems = Array<Entry<IInspoFields>>;

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  });

  const res = await client.getEntries({ content_type: "inspo" });

  return {
    props: {
      inspos: res.items,
    },
  };
};

const Home: NextPage<{ inspos: InspoItems }> = ({ inspos }) => {
  console.log(inspos);
  return (
    <Wrapper>
      <Header>Content will come here ✨</Header>
      {inspos[0].fields.title}
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex p-4 h-full w-full
`;

const Header = tw.h1`
`;

export default Home;
