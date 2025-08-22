import clsx from 'clsx';
import React, { FC } from 'react';
interface Props {
  className?: string;
  isClose: boolean;
  toggleBtn: () => void;
}
const HamburgerBtn: FC<Props> = ({ className, isClose, toggleBtn }) => {
  return (
    <button className={className} onClick={toggleBtn}>
      <span
        className={clsx(
          'block bg-black w-4 h-0.5 rounded-sm transition-all duration-300',
          'mb-1',
          isClose && 'rotate-45 translate-y-1.5',
        )}
      ></span>
      <span
        className={clsx(
          'block bg-black w-4 h-0.5 rounded-sm transition-all duration-300',
          isClose && 'opacity-0',
        )}
      ></span>
      <span
        className={clsx(
          'block bg-black w-4 h-0.5 rounded-sm transition-all duration-300',
          'mt-1',
          isClose && 'rotate-135  -translate-y-1.5',
        )}
      ></span>
    </button>
  );
};
export default HamburgerBtn;
