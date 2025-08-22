'use client';
import React, { FC, useState, PropsWithChildren, useEffect } from 'react';
import clsx from 'clsx';
import HamburgerBtn from './HamburgerBtn';
import { usePathname, useSearchParams } from 'next/navigation';

interface Props extends PropsWithChildren {
  className?: string;
}
const MenuButton: FC<Props> = ({ className, children }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const closeMenu = () => {
      setOpenMenu(false);
    };
    closeMenu();
  }, [pathname, searchParams]);

  const toggleMenu = () => {
    setOpenMenu((bool) => !bool);
  };
  return (
    <div className={className}>
      <HamburgerBtn isClose={openMenu} toggleBtn={toggleMenu} />
      <div
        className={clsx(
          'panel opacity-0 transition-all duration-100',
          openMenu && 'opacity-100',
        )}
      >
        <div className="mask"></div>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default MenuButton;
