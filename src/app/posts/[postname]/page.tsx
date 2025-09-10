import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import remarkToc from 'remark-toc';
import rehypeStringify from 'rehype-stringify';
import slug from 'rehype-slug';
import type { Root } from 'mdast';
import { h } from 'hastscript';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import 'highlight.js/styles/atom-one-light.min.css';

import BackBtn from './BackBtn';
import { authorName } from '@/variable/staticParam';
import { fileNames, readMarkDown } from '@/utils/fetchMarkDown';

interface PageProps {
  params: Promise<{
    postname: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { postname } = await params;
  const { meta } = readMarkDown(postname);
  return {
    title: meta.title,
    // description: post.body.slice(0, 100),
  };
}

export default async function OnePostPage({ params }: PageProps) {
  const { postname } = await params;

  const { meta, markdown } = readMarkDown(postname);

  const isToc = !!meta.toc?.enable;

  // function directivePlugin() {
  //   return function (tree: Root) {
  //     visit(tree, function (node) {
  //       if (node.type === 'image') {
  //         console.log(JSON.parse(JSON.stringify(node)));
  //       }
  //       if (
  //         node.type === 'containerDirective' ||
  //         node.type === 'leafDirective' ||
  //         node.type === 'textDirective'
  //       ) {
  //         const data = node.data || (node.data = {});
  //         const hast = h(node.name, node.attributes || {});

  //         // console.log(data, hast);

  //         data.hName = hast.tagName;
  //         data.hProperties = hast.properties;
  //         console.log(JSON.parse(JSON.stringify(node)));
  //       }
  //     });
  //   };
  // }

  function remarkImageAttributes() {
    return (tree: Root) => {
      visit(tree, 'image', (node, index, parent) => {
        console.log(index);
        if (!parent || index === undefined) return;
        const next = parent.children[index + 1];
        console.log(JSON.parse(JSON.stringify(parent)));

        // Make {width="50%"} work
        if (next && next.type === 'text') {
          const match = next.value.match(/^\{([^}]+)\}/);
          if (match) {
            const attrString = match[1];

            attrString.split(/\s+/).forEach((pair) => {
              const m = pair.match(/^([a-zA-Z0-9_-]+)=(["']?)(.+?)\2$/);
              if (m) {
                const [, key, , value] = m;
                node.data = node.data || {};
                node.data.hProperties = node.data.hProperties || {};
                node.data.hProperties[key] = value;
              }
            });

            // remove { }
            next.value = next.value.replace(/^\{[^}]+\}/, '');
            if (next.value.trim() === '') {
              parent.children.splice(index + 1, 1);
            }
          }
        }
      });
    };
  }

  // processing markdown
  const process = await unified()
    .use(remarkParse) // md -> MDAST
    .use(remarkImageAttributes)
    // .use(remarkDirective) // analysis directive
    // .use(directivePlugin) // customize what should be the output
    .use(remarkGfm) // support GFM
    .use(isToc ? [[remarkToc, { minDepth: 2 }]] : []) // conditionally add remarkToc
    .use(remarkRehype) //  MDAST → HAST
    .use(slug) //add header id
    .use(rehypeHighlight) // highlight code
    .use(rehypeStringify) // html
    .process(markdown);

  const htmlString = process.toString();

  console.log(htmlString);

  const dateString = meta.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
  return (
    <>
      <main className="mx-10 sm:mx-80 flex flex-col">
        <h1 className="text-2xl font-bold mt-10 mb-4"> {meta.title}</h1>
        <div className="flex space-x-4 mb-2">
          <div className="flex items-center space-x-1 link-hover">
            <FontAwesomeIcon icon={faCircleUser} />
            <Link href={'/'}>
              <p>{meta.author ?? authorName}</p>
            </Link>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <FontAwesomeIcon icon={faCalendarDays} />
            <time>{dateString}</time>
          </div>
        </div>
        <article
          className="post-article"
          dangerouslySetInnerHTML={{ __html: htmlString }}
        ></article>
        <div className="flex flex-row-reverse">
          <BackBtn />
        </div>
      </main>
    </>
  );
}

// next js
export async function generateStaticParams() {
  return fileNames.map((postname) => {
    return { postname };
  });
}
