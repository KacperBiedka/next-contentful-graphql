import type { NextPage } from "next";
import tw from "twin.macro";

import { InspoCard } from "components";
import type { Inspo } from "schema/generated/schema";

export const getStaticProps = async () => {
  const result = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            inspoCollection {
              items {
                title
                slug
                thumbnail {
                  title
                  url
                }
                sys {
                  id
                }
              }
            }
          }
        `,
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();
  const inspos: Array<Inspo> = data.inspoCollection.items;

  return {
    props: {
      inspos,
    },
    revalidate: 1,
  };
};

const Home: NextPage<{ inspos: Array<Inspo> }> = ({ inspos }) => {
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
