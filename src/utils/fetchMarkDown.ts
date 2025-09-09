import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import lunr from 'lunr';
import { nanoid } from 'nanoid';
import { MetaDataType, RawMetaDataType } from '@/type';

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

export const allMeta = fileNames.map((postName) => {
  const { meta } = readMarkDown(postName);
  return { id: nanoid(8), ...meta, postFilename: postName };
});

export const groupMetaByCategory = allMeta.reduce<{
  [category: string]: MetaDataType[];
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

export const lunrIndex = lunr(function () {
  this.ref('id');
  this.field('title');
  this.field('categories');

  allMeta.forEach((meta) => {
    this.add(meta);
  });
});
