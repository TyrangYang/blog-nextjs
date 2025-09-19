'use client';
import { MetaDataType } from '@/type';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';

type Props = {
  metaDataList: MetaDataType[];
};

export default function ListPostByMetaList({ metaDataList }: Props) {
  return (
    <div className="flex grow flex-col space-y-2">
      {metaDataList.map((meta) => {
        return (
          <div className="flex justify-between" key={`post-${meta.title}`}>
            <Link
              href={`/notes/${meta.postFilename}`}
              className="clickable-hover text-xl"
            >
              {meta.title}
            </Link>
            <div>{dayjs(meta.date).format('YYYY-MM-DD')}</div>
          </div>
        );
      })}
    </div>
  );
}
