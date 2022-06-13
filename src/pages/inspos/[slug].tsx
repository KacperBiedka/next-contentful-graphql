import Image from "next/image";
import tw from "twin.macro";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { gql } from "@apollo/client";

import client from "lib/apolloClient";
import { Skeleton } from "components";
import { Inspo } from "schema/generated/schema";

const GET_INSPO_SLUGS = gql`
  query {
    inspoCollection {
      items {
        slug
      }
    }
  }
`;

export const getStaticPaths = async () => {
  const { data, error } = await client.query({
    query: GET_INSPO_SLUGS,
  });

  if (error) {
    console.error(error);
    return {};
  }

  const inspoSlugs: Array<Inspo> = data.inspoCollection.items;

  const paths = inspoSlugs.map(({ slug }) => {
    return { params: { slug: slug || "" } };
  });

  return {
    paths,
    fallback: true,
  };
};

type Params = {
  params: {
    slug: string;
  };
};

const GET_INSPO = gql`
  query GetInspo($slug: String!) {
    inspoCollection(where: { slug: $slug }) {
      items {
        title
        description {
          json
        }
        tags
        featuredImage {
          title
          url
          width
          height
        }
      }
    }
  }
`;

export const getStaticProps = async ({ params }: Params) => {
  const { data, error } = await client.query({
    query: GET_INSPO,
    variables: {
      slug: params?.slug,
    },
  });

  if (error) {
    console.error(error);
    return {};
  }

  const inspoData: Inspo = data.inspoCollection.items[0] || {};

  return {
    props: {
      inspo: inspoData,
    },
  };
};

export default function InspoDetails({ inspo }: { inspo: Inspo }) {
  if (!inspo) {
    return <Skeleton />;
  }

  const { featuredImage, title, description, tags } = inspo;

  return (
    <Banner>
      <Image
        src={`${featuredImage?.url}`}
        width={featuredImage?.width || "auto"}
        height={featuredImage?.height || 200}
        layout="responsive"
        alt={inspo.title || ""}
      />
      <Title>{title}</Title>
      <Info>{tags && tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</Info>
      <Content>{documentToReactComponents(description?.json)}</Content>
    </Banner>
  );
}

const Banner = tw.div`
  pb-5
`;

const Title = tw.h2`
  text-3xl
`;

const Info = tw.div`
  flex gap-3
`;

const Tag = tw.span`
  py-2 px-5 bg-slate-200 rounded-sm
`;

const Content = tw.div``;
