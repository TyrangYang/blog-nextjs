import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';
import { marked, Tokens } from 'marked';
import type { Metadata } from 'next';
import { MetaDataType } from '@/type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';

interface PageProps {
  params: Promise<{
    postname: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { postname } = await params;
  return {
    title: postname,
    // description: post.body.slice(0, 100),
  };
}

const postsDirectory = path.join(process.cwd(), 'posts');

export default async function PostPage({ params }: PageProps) {
  const { postname } = await params;

  const postString = fs
    .readFileSync(path.join(postsDirectory, postname + '.md'))
    .toString();
  const contentWithMetaData = matter(postString);

  const meta = contentWithMetaData.data as MetaDataType;
  const markdown = contentWithMetaData.content;

  const codeRenderer = {
    code({ text }: Tokens.Code) {
      const hl = hljs.highlightAuto(text);

      return `<pre><code class="hljs">${hl.value}</code></pre>`;
    },
  };
  marked.use({ renderer: codeRenderer });
  const htmlString = marked(markdown);

  const dateString = meta.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
  return (
    <>
      <Head>
        <title>{postname}</title>
      </Head>
      <main className="sm:mx-40 flex flex-col rounded-lg">
        <h1 className="text-2xl font-bold mt-10 mb-4"> {meta.title}</h1>
        <div className="flex space-x-4 mb-2">
          <div className="flex items-center space-x-1 clickable-hover">
            <FontAwesomeIcon icon={faCircleUser} />
            <Link href={'/'}>
              <p>{meta.author}</p>
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
        <Link href={'/'}>back</Link>
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
