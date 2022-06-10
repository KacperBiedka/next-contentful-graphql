import Image from "next/image";
import tw from "twin.macro";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { Skeleton } from "components";
import { Inspo } from "schema/generated/schema";

export const getStaticPaths = async () => {
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
                slug
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

export const getStaticProps = async ({ params }: Params) => {
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
          query GetInspo($slug: String!) {
            inspoCollection (where: {
              slug: $slug
            }) {
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
        `,
        variables: {
          slug: params?.slug,
        },
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();
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

const Content = tw.p``;
