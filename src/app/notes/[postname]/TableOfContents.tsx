'use client';
import { TOCHeadingType } from '@/type';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { findHeaderParentList } from './utils/extractHeading';

export default function TableOfContents({
  headings,
  enableAutoCollapse,
}: {
  headings: TOCHeadingType[];
  enableAutoCollapse: boolean;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

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

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [headings]);

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // if auto collapse enabled, find the path of parent node of
  const displayTOCHeader = useMemo(() => {
    const enableCollapse = enableAutoCollapse && headings.length > 15;
    if (!enableCollapse) return headings;

    const activeHeading = headings.find((h) => h.elID === activeId);

    if (!activeHeading) return headings;

    const displayIdsSet = new Set(
      findHeaderParentList(activeHeading)
        .flatMap((h) => {
          return h.children;
        })
        .map((h) => h?.elID),
    );

    return headings.filter((h) => displayIdsSet.has(h.elID));
  }, [headings, enableAutoCollapse, activeId]);

  const depthMargin = ['', '', 'ml-4', 'ml-8', 'ml-12', 'ml-16'];

  return (
    <aside className="sm:fixed sm:right-0 sm:w-70 sm:h-full sm:block hidden">
      <nav className="relative top-10 border-l-zinc-200 border-l-4 max-h-10/12">
        <div className="text-xl font-bold mx-4">CONTENTS</div>
        <ul>
          {displayTOCHeader.map((head) => (
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
    </aside>
  );
}
