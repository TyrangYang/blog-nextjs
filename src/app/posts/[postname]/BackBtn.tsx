'use client';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

const BackBtn: FC = () => {
  const router = useRouter();
  return (
    <button
      className="clickable-hover"
      onClick={() => {
        router.back();
      }}
    >
      {'<< back'}
    </button>
  );
};
export default BackBtn;
