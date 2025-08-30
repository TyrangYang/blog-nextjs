import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default async function Home() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => ({
    name: filename.replace(/\.md$/, ''),
    url: `/posts/${filename.replace(/\.md$/, '')}`,
  }));

  // console.log(posts);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <ul>
          {posts.map((post) => (
            <li key={post.name}>
              <Link href={post.url}>{post.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
