'use client';
import React from 'react';
import { Pagination } from 'antd';
import { useRouter } from 'next/navigation';

type Props = {
  baseUrl: string;
  currentPageNum: number;
};

export default function BottomPagination({ baseUrl, currentPageNum }: Props) {
  const router = useRouter();
  console.log({ currentPageNum });
  return (
    <Pagination
      className="test-border"
      align="center"
      onChange={(num) => {
        router.push(baseUrl + `/page/${num}`);
        console.log(Number.isInteger(num));
      }}
      current={currentPageNum}
      total={50} // total number of items
      pageSize={10} // how many items in one page

      // therefore max page is 5 total/pageSize
    />
  );
}
