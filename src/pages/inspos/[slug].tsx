import type { GetStaticProps } from "next";
import { createClient } from "contentful";
import type { EntryCollection, Entry } from "contentful";

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
  console.log(inspo);
  return <div>Inspo Details</div>;
}
