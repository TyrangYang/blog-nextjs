import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';
import { marked } from 'marked';
import type { Metadata } from 'next';

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

  const meta = contentWithMetaData.data;
  const markdown = contentWithMetaData.content;
  const htmlString = marked(markdown);
  console.log(meta);
  return (
    <>
      <Head>
        <title>{postname}</title>
      </Head>
      <main className="mx-40 flex flex-col rounded-lg">
        <h1>{meta.title}</h1>
        <article
          className="past-article"
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
