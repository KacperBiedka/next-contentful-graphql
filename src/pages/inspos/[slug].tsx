import type { GetStaticProps } from "next";
import Image from "next/image";
import { createClient } from "contentful";
import type { EntryCollection, Entry } from "contentful";
import tw from "twin.macro";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { IInspoFields } from "schema/generated/contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

export const getStaticPaths = async () => {
  const res: EntryCollection<IInspoFields> = await client.getEntries({
    content_type: "inspo",
  });

  const paths = res.items.map((item) => {
    return { params: { slug: item.fields.slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "inspo",
    "fields.slug": params?.slug,
  });

  return {
    props: {
      inspo: items[0],
    },
  };
};

export default function InspoDetails({
  inspo,
}: {
  inspo: Entry<IInspoFields>;
}) {
  const { featuredImage, title, description, tags } = inspo.fields;

  return (
    <Banner>
      <Image
        src={`https:${featuredImage.fields.file.url}`}
        width={featuredImage.fields.file.details.image?.width || "auto"}
        height={featuredImage.fields.file.details.image?.height || 200}
        layout="responsive"
        alt={inspo.fields.title}
      />
      <Title>{title}</Title>
      <Info>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Info>
      <Content>{documentToReactComponents(description)}</Content>
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
