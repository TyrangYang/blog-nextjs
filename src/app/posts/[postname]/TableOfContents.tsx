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
    const handler = () => {
      const TriggerLine = window.innerHeight * 0.3;

      const visibleHeadings = headings
        .map((head) => {
          const el = document.getElementById(head.elID);
          if (!el) return null;
          const top = el.getBoundingClientRect().top;
          return { elID: head.elID, top };
        })
        .filter((h) => h !== null);

      const above = visibleHeadings.filter((h) => h.top <= TriggerLine); // headers above TriggerLine

      if (above.length > 0) {
        const nearest = above.reduce((prev, cur) =>
          cur.top > prev.top ? cur : prev,
        ); // the largest number of top means closest to the Trigger Line
        setActiveId(nearest.elID);
      } else {
        setActiveId(visibleHeadings[0]?.elID || null); // fallback to first
      }
    };

    window.addEventListener('scroll', handler, { passive: true });

    return () => window.removeEventListener('scroll', handler);
  }, [headings]);

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed test-border right-0 w-60 h-screen overflow-scroll">
      <ul>
        {headings.map((head) => (
          <li
            key={head.elID}
            className={clsx(
              activeId === head.elID && 'text-cyan-500 font-bold',
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
