import ListPostByMetaList from '@/components/ListPostByMetaList';
import { allMetaList } from '@/utils/fetchMarkDown';
import React from 'react';
import BottomPagination from './BottomPagination';

// type Props = {};

export default function PostPage() {
  return (
    <div className="grow sm:mx-50 mx-2 flex flex-col">
      <h3 className="self-end my-10 text-3xl font-bold">All Notes</h3>
      <ListPostByMetaList metaDataList={allMetaList}></ListPostByMetaList>
      <BottomPagination baseUrl={'/notes'} currentPageNum={1} />
    </div>
  );
}
