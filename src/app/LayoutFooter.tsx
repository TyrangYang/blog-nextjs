import { authorName } from '@/variable/staticParam';
import Link from 'next/link';
import Image from 'next/image';
import React, { FC } from 'react';
import FooterCCLink from '../components/FooterCCLink';

const LayoutFooter: FC = () => {
  return (
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
  );
};
export default LayoutFooter;
