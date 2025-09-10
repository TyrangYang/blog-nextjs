'use client';
import React, { useMemo, useState } from 'react';
import { Input } from 'antd';
import CategoryCard from '@/components/CategoryCard';
import { MetaDataType } from '@/type';
import {
  getGroupMetaByCategory,
  getSearchIndex,
} from '@/utils/groupMarkDownUtils';

type Props = {
  allMetaList: MetaDataType[];
};

export default function SearchableCategoryCardList({ allMetaList }: Props) {
  const [inputVal, setInputVal] = useState('');
  const searchIndex = useMemo(() => {
    return getSearchIndex(allMetaList);
  }, [allMetaList]);

  const filterMetaList =
    inputVal === ''
      ? allMetaList
      : searchIndex.search(inputVal).map((e) => e.item);

  console.log(searchIndex.search(inputVal));
  const groupAllMetaByCategory = getGroupMetaByCategory(filterMetaList);
  return (
    <>
      <div className="mt-10">
        <Input
          value={inputVal}
          placeholder="Search"
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-wrap justify-between">
        {Object.entries(groupAllMetaByCategory).map(([category, metaList]) => {
          return (
            <CategoryCard
              key={`category-card-${category}`}
              title={category}
              metaDataList={metaList}
            />
          );
        })}
      </div>
    </>
  );
}
