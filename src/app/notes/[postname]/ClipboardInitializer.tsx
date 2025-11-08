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

  useEffect(() => {
    const headers = document.querySelectorAll<HTMLDivElement>('.code-header');
    const cleanups: (() => void)[] = [];
    headers.forEach((h) => {
      const handleClick = () => {
        const classList = h.classList ?? [];
        const isActive = [...classList].includes('hide-code');
        if (isActive) {
          classList.remove('hide-code');
        } else {
          classList.add('hide-code');
        }
      };

      h.addEventListener('click', handleClick);
      cleanups.push(() => h.removeEventListener('click', handleClick));
    });
    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);
  return null; // no visible DOM
}
