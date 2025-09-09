import ListPostByMetaList from '@/components/ListPostByMetaList';
import { allMeta } from '@/utils/fetchMarkDown';
import React from 'react';

// type Props = {};

export default function PostPage() {
  return (
    <div className="grow sm:mx-50 mx-2 flex flex-col">
      <h3 className="self-end my-10 text-3xl font-bold">POSTS</h3>
      <ListPostByMetaList metaDataList={allMeta}></ListPostByMetaList>
    </div>
  );
}
