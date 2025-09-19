import React from 'react';
import BottomPagination from '../../BottomPagination';

type Props = {
  params: Promise<{
    pageNum: string;
  }>;
};

export default async function page({ params }: Props) {
  const { pageNum } = await params;
  return (
    <div className="grow">
      <div>{pageNum}</div>
      <BottomPagination baseUrl="/notes" currentPageNum={+pageNum} />
    </div>
  );
}

// next js
export async function generateStaticParams() {
  return new Array(20).fill(1).map((_, idx) => {
    // todo: decide how many page
    return { pageNum: (idx + 1).toString() };
  });
}
