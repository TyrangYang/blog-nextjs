import type { Root, Element } from 'hast';
import { visit } from 'unist-util-visit';

export default function rehypeAddCodeHeader() {
  return function transformer(tree: Root) {
    visit(tree, 'element', (node, idx, parent) => {
      if (node.tagName !== 'pre' || parent === undefined || idx === undefined) {
        return;
      }

      // purely font awesome svg
      const copySVGIcon: Element = {
        type: 'element',
        tagName: 'svg',
        properties: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 640 640',
          width: '20',
          height: '20',
          fill: 'currentColor',
        },
        children: [
          {
            type: 'element',
            tagName: 'path',
            properties: {
              d: 'M288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448L480 448C515.3 448 544 419.3 544 384L544 183.4C544 166 536.9 149.3 524.3 137.2L466.6 81.8C454.7 70.4 438.8 64 422.3 64L288 64zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L352 496L352 512L160 512L160 256L176 256L176 192L160 192z',
            },
            children: [],
          },
        ],
      };
      const chevronLeftSVGIcon: Element = {
        type: 'element',
        tagName: 'svg',
        properties: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 640 640',
          width: '20',
          height: '20',
        },
        children: [
          {
            type: 'element',
            tagName: 'path',
            properties: {
              d: 'M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z',
            },
            children: [],
          },
        ],
      };
      // ============================

      // get text for copy button and language type
      let copyText = '';
      let copyHeaderName = '';
      const codeNode = node.children[0];
      if (codeNode.type === 'element') {
        const classNames = (
          Array.isArray(codeNode.properties.className)
            ? codeNode.properties.className
            : [codeNode.properties.className]
        )
          .filter((c) => {
            if (typeof c !== 'string') return false;
            return c.startsWith('language-');
          })
          .map((item) => (item as string).replace(/^language-/, ''));
        copyHeaderName = classNames[0] ?? 'code';

        const textNode = codeNode.children[0];
        if (textNode.type === 'text') {
          copyText = textNode.value;
        }
      }
      // ============================

      // hast for button
      const copyBtnNode: Element = {
        type: 'element',
        tagName: 'button',
        properties: {
          className: ['copy-btn'],
          'data-clipboard-text': copyText,
        },
        children: [copySVGIcon],
      };

      // hast for header = language + copy btn
      const codeHeaderWrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['code-header', 'hljs'],
        },
        children: [
          {
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['code-title'],
            },
            children: [
              chevronLeftSVGIcon,
              { type: 'text', value: copyHeaderName },
            ],
          },
          copyBtnNode,
        ],
      };

      // hast for new code block = header + code
      const newCodeWrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['code-wrapper'] },
        children: [codeHeaderWrapper, node],
      };

      parent.children[idx] = newCodeWrapper;
    });
  };
}
