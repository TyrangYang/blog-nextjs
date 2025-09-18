import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
import GithubSlugger from 'github-slugger';
import { TOCHeadingType } from '@/type';

export default function extractHeading(markdown: string) {
  const slugger = new GithubSlugger(); // same slugger that rehype-slug used. So that I can keep the same id

  const headings: TOCHeadingType[] = [];
  const processor = unified()
    .use(remarkParse)
    .use(() => (tree: Root) => {
      visit(tree, 'heading', (node) => {
        const text = toString(node);
        const elID = slugger.slug(text);
        headings.push({ depth: node.depth, title: text, elID });
      });
    });
  const tree = processor.parse(markdown);

  processor.runSync(tree);
  return headings;
}
