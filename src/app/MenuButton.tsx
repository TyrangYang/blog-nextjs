'use client';
import React, { FC, useState, PropsWithChildren, useEffect } from 'react';
import clsx from 'clsx';
import HamburgerBtn from '../components/HamburgerBtn';
import { usePathname } from 'next/navigation';

interface Props extends PropsWithChildren {
  className?: string;
}
const MenuButton: FC<Props> = ({ className, children }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const pathname = usePathname();
  // const searchParams = useSearchParams();

  useEffect(() => {
    const closeMenu = () => {
      setOpenMenu(false);
    };
    closeMenu();
  }, [pathname]);

  const toggleMenu = () => {
    setOpenMenu((bool) => !bool);
  };
  return (
    <div className={className}>
      <HamburgerBtn isClose={openMenu} toggleBtn={toggleMenu} />
      <div
        className={clsx(
          'panel opacity-0 transition-all duration-200',
          openMenu && 'opacity-100',
        )}
      >
        {openMenu && (
          <>
            <div className="mask"></div>
            <div className="absolute top-0 left-0 w-full mt-14 bg-white">
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default MenuButton;
