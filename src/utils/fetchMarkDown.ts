import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { MetaDataType } from '@/type';

export const readMarkDown = (postname: string) => {
  const postString = fs
    .readFileSync(path.join(postsDirectory, postname + '.md'))
    .toString();
  const contentWithMetaData = matter(postString);
  const rawMeta = contentWithMetaData.data as MetaDataType;
  const meta: MetaDataType = Object.fromEntries(
    Object.entries(rawMeta).map(([key, value]) => [key.toLowerCase(), value]),
  ) as MetaDataType;
  const markdown = contentWithMetaData.content;
  return { meta, markdown };
};

export const postsDirectory = path.join(process.cwd(), 'posts');
const filenames = fs.readdirSync(postsDirectory);

export const postNames = filenames.map((filename) =>
  filename.replace(/\.md$/, ''),
);

export const allMeta = postNames.map((postName) => {
  const { meta } = readMarkDown(postName);
  return { ...meta, postname: postName };
});

export const groupMetaByCategory = allMeta.reduce<{
  [category: string]: (MetaDataType & { postname: string })[];
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
