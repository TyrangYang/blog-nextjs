import Link from 'next/link';
import React, { FC, PropsWithChildren } from 'react';

const FooterCCLink: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Link
      href={'https://creativecommons.org/licenses/by-nc-nd/4.0/'}
      target="_blank"
      rel={'license noopener'}
      className="clickable-hover"
    >
      {children}
    </Link>
  );
};
export default FooterCCLink;
