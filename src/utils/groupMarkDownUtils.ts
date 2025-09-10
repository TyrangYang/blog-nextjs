import { MetaDataType } from '@/type';
import fuse from 'fuse.js';

export const getGroupMetaByCategory = <T extends MetaDataType>(
  metaList: T[],
) => {
  return metaList.reduce<{
    [category: string]: T[];
  }>((result, metadata) => {
    const { categories } = metadata;
    categories.forEach((category) => {
      const c = category.toUpperCase();
      if (!result[c]) {
        result[c] = [];
      }
      result[c].push(metadata);
    });
    return result;
  }, {});
};
export const getSearchIndex = (allMetaList: MetaDataType[]) => {
  return new fuse(allMetaList, {
    includeScore: true,
    includeMatches: true,
    keys: ['title', 'categories'],
  });
};
