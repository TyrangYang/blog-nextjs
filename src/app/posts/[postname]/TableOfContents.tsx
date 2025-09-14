'use client';
import { TOCHeadingType } from '@/type';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export default function TableOfContents({
  headings,
}: {
  headings: TOCHeadingType[];
}) {
  const [activeId, setActiveId] = useState<string | null>(headings[0].elID);

  useEffect(() => {
    const onScroll = () => {
      const TriggerLine = window.innerHeight * 0.3;

      const onScreenHeadings = headings
        .map((head) => {
          const el = document.getElementById(head.elID);
          if (!el) return null;
          const top = el.getBoundingClientRect().top;
          return { elID: head.elID, top };
        })
        .filter((h) => h !== null);

      const above = onScreenHeadings.filter((h) => h.top <= TriggerLine); // headers above TriggerLine

      if (above.length > 0) {
        const nearest = above.reduce((prev, cur) =>
          cur.top > prev.top ? cur : prev,
        ); // the largest number of top means closest to the Trigger Line
        setActiveId(nearest.elID);
      } else {
        setActiveId(onScreenHeadings[0]?.elID || null); // fallback to first
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [headings]);

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const depthMargin = ['', '', 'ml-4', 'ml-8', 'ml-12', 'ml-16'];

  return (
    <nav className="fixed test-border right-0 w-60 h-screen overflow-scroll">
      <ul>
        {headings.map((head) => (
          <li
            key={head.elID}
            className={clsx(
              "before:content-['|'] before:mr-3 before:text-cyan-600 before:font-bold",
              depthMargin[head.depth] || '',
              activeId === head.elID &&
                'text-cyan-500 font-bold before:text-red-400',
            )}
          >
            <a
              href={`#${head.elID}`}
              onClick={(e) => {
                e.preventDefault(); // prevent anchor navigate to head
                smoothScrollTo(head.elID); //
                window.history.pushState(null, '', `#${head.elID}`);
              }}
            >
              {head.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
