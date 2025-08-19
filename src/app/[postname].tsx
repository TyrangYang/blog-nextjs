import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface PostProps {
  post: {
    title: string;
    content: string;
  } | null;
}

export default function PostPage({ post }: PostProps) {
  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <main>
      hello
      <h1>{post.title}</h1>
      <h2>{post.content}</h2>
      {/* <article dangerouslySetInnerHTML={{ __html: post.content }} /> */}
    </main>
  );
}

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getStaticPaths() {
  const filenames = fs.readdirSync(postsDirectory);
  console.log(filenames);
  const paths = filenames.map((filename) => ({
    params: { postname: filename.replace('.md', '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({
  params: { postname },
}: {
  params: { postname: string };
}) {
  return {
    props: {
      post: {
        title: postname,
        content: postname,
      },
    },
    // revalidate: 10,
  };
}
