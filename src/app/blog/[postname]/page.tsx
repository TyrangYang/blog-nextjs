import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';
import { marked } from 'marked';

interface PageProps {
  params: Promise<{
    postname: string;
  }>;
}

export default async function PostPage({ params }: PageProps) {
  const { postname } = await params;

  const postsDirectory = path.join(process.cwd(), 'posts');

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
      <main>
        <h1>{meta.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
        <Link href={'/'}>back</Link>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const res = filenames.map((filename) => {
    return {
      postname: filename.replace('.md', ''),
    };
  });

  return res;
}
