import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { authorName, githubLink } from '@/staticParam';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBookOpen,
  faCircleHalfStroke,
  faHouse,
  faLayerGroup,
  faMagnifyingGlass,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import FooterCCLink from '@/components/FooterCCLink';
config.autoAddCss = false;

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'TyrangYangBlog',
  description: 'Tyrang Yang blog',
};

export const dynamic = 'error'; // disable any dynamic function
export const revalidate = false; // stop ISR

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > */}
      <body>
        <header
          className={`flex items-center justify-between
                      h-14 bg-gray-100 px-10 
                      hover:shadow-lg transition-shadow duration-300 
                      sm:fixed sm:w-full`}
        >
          <div className="text-border text-2xl font-bold text-black hover:text-cyan-600">
            <Link href={'/'}>TyrangYang_Blog</Link>
          </div>
          {/* small screen */}
          <nav className="sm:hidden">
            <FontAwesomeIcon icon={faBars} />
          </nav>
          {/* desktop screen */}
          <nav className="hidden sm:flex">
            <ul className="flex">
              <div className="flex space-x-4">
                <li className="clickable-hover flex">
                  <Link href={'/categories'}>
                    <FontAwesomeIcon className="mr-1" icon={faLayerGroup} />
                    <span>Categories</span>
                  </Link>
                </li>
                <li className="clickable-hover">
                  <Link href={'/posts'}>
                    <FontAwesomeIcon className="mr-1" icon={faBookOpen} />
                    <span>Posts</span>
                  </Link>
                </li>
                <li className="clickable-hover">
                  <Link href={'/tags'}>
                    <FontAwesomeIcon className="mr-1" icon={faTags} />
                    <span>Tags</span>
                  </Link>
                </li>
                <li className="clickable-hover">
                  <Link
                    href={githubLink}
                    target="_blank"
                    rel="external noopener"
                  >
                    <FontAwesomeIcon className="mr-1" icon={faGithub} />
                  </Link>
                </li>
                <li className="clickable-hover">
                  <FontAwesomeIcon className="mr-1" icon={faHouse} />
                </li>
              </div>
              <span className="mx-4 delimiter" />
              <div className="flex items-center justify-center space-x-4">
                <li className="clickable-hover in-progress">
                  <FontAwesomeIcon className="mr-1" icon={faMagnifyingGlass} />
                </li>
                <li className="clickable-hover rotate-225">
                  <FontAwesomeIcon icon={faCircleHalfStroke} />
                </li>
              </div>
            </ul>
          </nav>
        </header>
        {children}
        <footer className="text-sm py-1">
          <div className="flex justify-center items-center whitespace-pre">
            <p>© 2025</p>
            <span> | </span>
            <Link
              href={'/'}
              rel="author"
              className="clickable-hover"
            >{`${authorName}`}</Link>
            <span> | </span>
            <FooterCCLink>
              <Image
                src={
                  'https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-nd.eu.svg'
                }
                alt="Creative Commons License"
                width={70}
                height={25}
              />
            </FooterCCLink>
          </div>
          <p className="text-center">
            This content is licensed under a{' '}
            <FooterCCLink>
              Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
              International License
            </FooterCCLink>
            .
          </p>
        </footer>
      </body>
    </html>
  );
}
