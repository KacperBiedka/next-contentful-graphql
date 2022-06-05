import type { NextPage } from "next";
import tw from "twin.macro";
import type { Entry } from "contentful";
import { createClient } from "contentful";

import type { IInspoFields } from "schema/generated/contentful";

import { InspoCard } from "components";

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
    revalidate: 1,
  };
};

const Home: NextPage<{ inspos: InspoItems }> = ({ inspos }) => {
  return (
    <Wrapper>
      {inspos.map((inspo) => (
        <InspoCard key={inspo.sys.id} inspo={inspo} />
      ))}
    </Wrapper>
  );
};

const Wrapper = tw.div`
  grid h-full w-full grid-cols-1 gap-10 md:grid-cols-2
`;

export default Home;
