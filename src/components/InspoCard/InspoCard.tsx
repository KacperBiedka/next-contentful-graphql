import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import type { Inspo } from "schema/generated/schema";

import tw from "twin.macro";

export interface InspoCardProps {
  inspo: Inspo;
}

export const InspoCard: FC<InspoCardProps> = ({ inspo }) => {
  const { title, slug, thumbnail } = inspo;
  return (
    <Wrapper>
      <Featured>
        <Image
          src={thumbnail?.url || ""}
          object-fit="cover"
          alt={thumbnail?.title || ""}
          layout="fill"
        />
      </Featured>
      <Content>
        <Title>{title}</Title>
        <Actions>
          <Link href={`/inspos/${slug}`}>
            <a>Details</a>
          </Link>
        </Actions>
      </Content>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  bg-slate-50 inline-flex flex-col w-full shadow-lg translate-y-0 transition-all hover:shadow-2xl
`;

const Featured = tw.div`
  w-full h-32 sm:h-64 relative 
`;

const Content = tw.div``;

const Title = tw.h4`
  m-0 text-2xl p-5 pb-0
`;

const Actions = tw.div`
text-left p-5 pt-3 underline text-slate-600 hover:text-lime-600`;
