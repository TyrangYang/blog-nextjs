import Link from 'next/link';
import React, { FC } from 'react';
import MenuButton from './MenuButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faCircleHalfStroke,
  faHouse,
  faLayerGroup,
  faMagnifyingGlass,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { githubLink } from '@/variable/staticParam';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const LayoutHeader: FC = () => {
  return (
    <header
      className={`flex items-center justify-between
                      h-14 bg-gray-100 px-10 
                      hover:shadow-lg transition-shadow duration-300 
                      sm:sticky top-0 sm:w-full`}
    >
      <div className="text-border text-2xl font-bold text-black hover:text-cyan-600">
        <Link href={'/'}>TyrangYang_Blog</Link>
      </div>
      {/* small screen */}
      <MenuButton className="sm:hidden">
        <nav>
          <ul className="flex flex-col space-y-4 items-center">
            <li className="clickable-hover in-progress">
              <FontAwesomeIcon className="mr-1" icon={faMagnifyingGlass} />
            </li>
            <li className="clickable-hover">
              <Link href={'/categories'}>
                <FontAwesomeIcon className="mr-1" icon={faLayerGroup} />
                <span>Categories</span>
              </Link>
            </li>
            <li className="clickable-hover">
              <Link href={'/notes'}>
                <FontAwesomeIcon className="mr-1" icon={faBookOpen} />
                <span>Notes</span>
              </Link>
            </li>
            <li className="clickable-hover">
              <Link href={'/tags'}>
                <FontAwesomeIcon className="mr-1" icon={faTags} />
                <span>Tags</span>
              </Link>
            </li>
            <li className="clickable-hover">
              <Link href={githubLink} target="_blank" rel="external noopener">
                <FontAwesomeIcon className="mr-1" icon={faGithub} />
                <span>Github</span>
              </Link>
            </li>
            <li className="clickable-hover">
              <FontAwesomeIcon className="mr-1" icon={faHouse} />
              <span>Home</span>
            </li>
            <li className="clickable-hover">
              <FontAwesomeIcon
                className="mr-1 rotate-225"
                icon={faCircleHalfStroke}
              />
              <span>Themes</span>
            </li>
          </ul>
        </nav>
      </MenuButton>
      {/* desktop screen */}
      <nav className="hidden sm:flex">
        <ul className="flex">
          <div className="flex space-x-4">
            <li className="clickable-hover">
              <Link href={'/categories'}>
                <FontAwesomeIcon className="mr-1" icon={faLayerGroup} />
                <span>Categories</span>
              </Link>
            </li>
            <li className="clickable-hover">
              <Link href={'/notes'}>
                <FontAwesomeIcon className="mr-1" icon={faBookOpen} />
                <span>Notes</span>
              </Link>
            </li>
            <li className="clickable-hover">
              <Link href={'/tags'}>
                <FontAwesomeIcon className="mr-1" icon={faTags} />
                <span>Tags</span>
              </Link>
            </li>
            <li className="clickable-hover">
              <Link href={githubLink} target="_blank" rel="external noopener">
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
            <li className="clickable-hover">
              <FontAwesomeIcon
                className="rotate-225"
                icon={faCircleHalfStroke}
              />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};
export default LayoutHeader;
