'use client';
import { useEffect } from 'react';

export default function ClipboardInitializer() {
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLButtonElement>('.copy-btn');
    const cleanups: (() => void)[] = [];

    buttons.forEach((btn) => {
      const handleClick = () => {
        const copyText = btn.dataset.clipboardText || '';
        navigator.clipboard
          .writeText(copyText)
          // .then(() => {
          //   btn.title = 'Copied!';
          // setTimeout(() => (btn.title = 'Copy copyText'), 1000);
          // })
          .catch(console.error);
      };

      btn.addEventListener('click', handleClick);

      // Clean up if component unmounts
      cleanups.push(() => btn.removeEventListener('click', handleClick));
    });
    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null; // no visible DOM
}
