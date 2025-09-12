import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import slug from 'rehype-slug';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import 'highlight.js/styles/atom-one-light.min.css';

import BackBtn from './BackBtn';
import { authorName } from '@/variable/staticParam';
import { fileNames, readMarkDown } from '@/utils/fetchMarkDown';
import remarkImageAttributes from './utils/remarkImageAttributes';
import extractHeading from './utils/extractHeading';
import TableOfContents from './TableOfContents';

interface PageProps {
  params: Promise<{
    postname: string;
  }>;
}

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

export default async function OnePostPage({ params }: PageProps) {
  const { postname } = await params;

  const { meta, markdown } = readMarkDown(postname);

  // processing markdown
  const process = await unified()
    .use(remarkParse) // md -> MDAST
    .use(remarkImageAttributes) // add image attribute
    .use(remarkGfm) // support GFM
    .use(remarkRehype) //  MDAST → HAST
    .use(slug) //add header id // for TOC
    .use(rehypeHighlight) // highlight code
    .use(rehypeStringify) // html
    .process(markdown);

  const htmlString = process.toString();

  const isToc = !!meta.toc?.enable;
  const TOCHeaders = isToc ? extractHeading(markdown) : [];

  const dateString = meta.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
  return (
    <>
      <main className="mx-10 sm:mx-80 flex flex-col grow">
        {isToc && <TableOfContents headings={TOCHeaders} />}
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
        <div className="flex flex-row-reverse mt-5 border-t-2 border-t-gray-200">
          <BackBtn />
        </div>
      </main>
    </>
  );
}

// next js
export async function generateStaticParams() {
  return fileNames.map((postname) => {
    return { postname };
  });
}
