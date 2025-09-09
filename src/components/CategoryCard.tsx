'use client';
import { MetaDataType } from '@/type';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
  title: string;
  metaDataList: (MetaDataType & { postFilename: string })[];
}
const CategoryCard: FC<Props> = ({ title, metaDataList }) => {
  return (
    <div className="mt-10 sm:w-[45%] w-2xl min-h-30">
      <h3 className="mb-2 font-bold text-2xl clickable-hover">
        <Link href={`/categories/${title.toLowerCase()}`}>
          <FontAwesomeIcon icon={faFolder} className="mr-1" />
          <span>{title}</span>
        </Link>
      </h3>
      {metaDataList.map((meta) => {
        return (
          <div
            key={`category-${title}-post-${meta.title}`}
            className="ml-5 clickable-hover text-lg"
          >
            <Link href={`/posts/${meta.postFilename}`}>{meta.title}</Link>
          </div>
        );
      })}
    </div>
  );
};
export default CategoryCard;
