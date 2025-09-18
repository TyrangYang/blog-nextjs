'use client';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

export default function BackToTopBtn() {
  const [displayBtn, setDisplayBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY >= 1000) {
        setDisplayBtn(true);
      } else {
        setDisplayBtn(false);
      }
    };
    onScroll(); // run once on init
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <button
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
      className={clsx(
        'rounded-full bg-neutral-200 w-10 h-10',
        'flex justify-center items-center',
        'cursor-pointer',
        'transition-opacity duration-300',
        'fixed left-5 bottom-10',
        displayBtn ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
    >
      <FontAwesomeIcon className="text-neutral-500" icon={faArrowUp} />
    </button>
  );
}
