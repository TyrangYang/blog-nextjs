import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
import GithubSlugger from 'github-slugger';
import { TOCHeadingType } from '@/type';

export function findHeaderParentList(currentHeader: TOCHeadingType) {
  const resList: TOCHeadingType[] = [];
  let currentRef: TOCHeadingType | undefined = currentHeader;
  while (currentRef !== undefined) {
    resList.push(currentRef);
    currentRef = currentRef.parent;
  }
  return resList;
}

export function findParentHeader(
  currentHeader: TOCHeadingType,
  target: number,
) {
  if (currentHeader.depth < target) return null;
  if (currentHeader.depth === -1 || currentHeader.depth === target)
    return currentHeader;

  if (currentHeader.parent === undefined) return null;

  return findParentHeader(currentHeader.parent, target);
}

export default function extractHeading(markdown: string) {
  const slugger = new GithubSlugger(); // same slugger that rehype-slug used. So that I can keep the same id

  const flatHeadings: TOCHeadingType[] = [];
  const treeHeadings: TOCHeadingType = {
    depth: -1,
    title: 'root',
    elID: '',
    children: [],
  };
  let prevHeadRef = treeHeadings;
  const processor = unified()
    .use(remarkParse)
    .use(() => {
      return function transformer(tree: Root) {
        visit(tree, 'heading', (node) => {
          const text = toString(node);
          const elID = slugger.slug(text);
          const curHead: TOCHeadingType = {
            depth: node.depth,
            title: text,
            elID,
            children: [],
            parent: undefined,
          };
          // for flatten list
          flatHeadings.push(curHead);

          // for tree list
          if (curHead.depth > prevHeadRef.depth) {
            // children
            prevHeadRef.children?.push(curHead);
            curHead.parent = prevHeadRef;
          } else if (curHead.depth === prevHeadRef.depth) {
            // sibling
            prevHeadRef.parent?.children?.push(curHead);
            curHead.parent = prevHeadRef.parent;
          } else {
            // no relation
            // find
            const siblingHeader = findParentHeader(prevHeadRef, curHead.depth);
            if (siblingHeader !== null) {
              siblingHeader.parent?.children?.push(curHead);
              curHead.parent = siblingHeader.parent;
            } else {
              throw new Error(`Header sequence issue: in ${curHead.title}`);
            }
          }
          prevHeadRef = curHead;
        });
      };
    });
  const tree = processor.parse(markdown);

  processor.runSync(tree);

  return flatHeadings;
}
