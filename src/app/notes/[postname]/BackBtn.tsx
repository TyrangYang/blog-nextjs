'use client'; // useRouter only in client component
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

const BackBtn: FC = () => {
  const router = useRouter();
  return (
    <button
      className="clickable-hover"
      onClick={() => {
        // console.log(window.location.pathname);
        router.back();
      }}
    >
      {'<< back'}
    </button>
  );
};
export default BackBtn;
