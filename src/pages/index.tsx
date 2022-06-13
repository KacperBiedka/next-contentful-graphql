import type { NextPage } from "next";
import tw from "twin.macro";
import { gql } from "@apollo/client";

import { InspoCard } from "components";
import type { Inspo } from "schema/generated/schema";

import client from "../lib/apolloClient";

const GET_INSPOS = gql`
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
`;

export const getStaticProps = async () => {
  const { data, error } = await client.query({
    query: GET_INSPOS,
  });

  if (error) {
    console.error(error);
    return {};
  }

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
