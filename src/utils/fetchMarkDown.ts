import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { nanoid } from 'nanoid';
import { MetaDataType, RawMetaDataType } from '@/type';
import { getGroupMetaByCategory } from './groupMarkDownUtils';

export const readMarkDown = (postname: string) => {
  const postString = fs
    .readFileSync(path.join(postsDirectory, postname + '.md'))
    .toString();
  const contentWithMetaData = matter(postString);
  const rawMeta = contentWithMetaData.data as RawMetaDataType;
  const meta: RawMetaDataType = Object.fromEntries(
    Object.entries(rawMeta).map(([key, value]) => [key.toLowerCase(), value]),
  ) as RawMetaDataType;
  const markdown = contentWithMetaData.content;
  return { meta, markdown };
};

export const postsDirectory = path.join(process.cwd(), 'posts');
const fileDirnames = fs.readdirSync(postsDirectory);

export const fileNames = fileDirnames.map((filename) =>
  filename.replace(/\.md$/, ''),
);

export const allMetaMap = fileNames.reduce((map, postName) => {
  const { meta } = readMarkDown(postName);
  const val = { id: nanoid(8), ...meta, postFilename: postName };
  map.set(val.id, val);
  return map;
}, new Map<string, MetaDataType>());

export const allMetaList = [...allMetaMap.values()];

export const groupAllMetaByCategory = getGroupMetaByCategory(allMetaList);
