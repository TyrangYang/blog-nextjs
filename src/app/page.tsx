import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => ({
    name: filename.replace(/\.md$/, ''),
    url: `/blog/${filename.replace(/\.md$/, '')}`,
  }));

  // console.log(posts);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ul>
          {posts.map((post) => (
            <li key={post.name}>
              <Link href={post.url}>{post.name}</Link>
            </li>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Haolin Yang
      </footer>
    </div>
  );
}
