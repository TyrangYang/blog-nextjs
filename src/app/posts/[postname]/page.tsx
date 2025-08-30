import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import remarkToc from 'remark-toc';
import rehypeStringify from 'rehype-stringify';
import slug from 'rehype-slug';

import Link from 'next/link';
import type { Metadata } from 'next';
import { MetaDataType } from '@/type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import 'highlight.js/styles/atom-one-light.min.css';

import BackBtn from './BackBtn';
import { authorName } from '@/variable/staticParam';

interface PageProps {
  params: Promise<{
    postname: string;
  }>;
}

const postsDirectory = path.join(process.cwd(), 'posts');

const readMarkDown = (postname: string) => {
  const postString = fs
    .readFileSync(path.join(postsDirectory, postname + '.md'))
    .toString();
  const contentWithMetaData = matter(postString);
  const meta = contentWithMetaData.data as MetaDataType;
  const markdown = contentWithMetaData.content;
  return { meta, markdown };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { postname } = await params;
  const { meta } = readMarkDown(postname);
  return {
    title: meta.title,
    // description: post.body.slice(0, 100),
  };
}

export default async function PostPage({ params }: PageProps) {
  const { postname } = await params;

  const { meta, markdown } = readMarkDown(postname);

  const isToc = !!meta.toc?.enable;

  // processing markdown
  const process = await unified()
    .use(remarkParse) // md -> MDAST
    .use(remarkGfm) // support GFM
    .use(isToc ? [[remarkToc, { minDepth: 2 }]] : []) // conditionally add remarkToc
    .use(remarkRehype) //  MDAST → HAST
    .use(slug) //add header id
    .use(rehypeHighlight) // highlight code
    .use(rehypeStringify) // html
    .process(markdown);

  const htmlString = process.toString();

  const dateString = meta.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  return (
    <>
      <main className="sm:mx-80 flex flex-col rounded-lg">
        <h1 className="text-2xl font-bold mt-10 mb-4"> {meta.title}</h1>
        <div className="flex space-x-4 mb-2">
          <div className="flex items-center space-x-1 link-hover">
            <FontAwesomeIcon icon={faCircleUser} />
            <Link href={'/'}>
              <p>{meta.author ?? authorName}</p>
            </Link>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <FontAwesomeIcon icon={faCalendarDays} />
            <time>{dateString}</time>
          </div>
        </div>
        <article
          className="post-article"
          dangerouslySetInnerHTML={{ __html: htmlString }}
        ></article>
        <div className="flex flex-row-reverse">
          <BackBtn />
        </div>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const filenames = fs.readdirSync(postsDirectory);

  const res = filenames.map((filename) => {
    return {
      postname: filename.replace('.md', ''),
    };
  });

  return res;
}
