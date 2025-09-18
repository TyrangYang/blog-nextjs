import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

// support {.<className>}
export default function remarkImageAttributes() {
  return (tree: Root) => {
    visit(tree, 'image', (node, index, parent) => {
      if (!parent || index === undefined) return;
      const nextAttrNode = parent.children[index + 1]; // get adjacent text node: {.<className>}

      const matchAttrRegExp = new RegExp(/^\{([^}]+)\}/); // {<key>="<val>" .<className>} => '<key>="<val>" .<className>'

      if (nextAttrNode && nextAttrNode.type === 'text') {
        const matchAttrString = nextAttrNode.value.match(matchAttrRegExp);

        if (matchAttrString) {
          const attrString = matchAttrString[1];

          const matchPairRegExp = new RegExp(
            /^([a-zA-Z0-9_-]+)=["']?(.+?)["']?$/,
          ); // <key>="<val>" => ['<key>="<val>"', '<key>', '<val>']

          const matchClassNameRegExp = new RegExp(/\.([a-zA-Z_][\w_-]*)/); //.<className> => ['.<className>', '<className>']

          attrString.split(/\s+/).forEach((attr) => {
            const matchPair = attr.match(matchPairRegExp); // match width="50%"
            const matchClassName = attr.match(matchClassNameRegExp); // match .<className>

            if (matchPair) {
              console.log(matchPair);
              const [, key, value] = matchPair;
              node.data = node.data || {};
              node.data.hProperties = node.data.hProperties || {};
              node.data.hProperties[key] = value;
              console.log(node.data);
            } else if (matchClassName) {
              const [, classname] = matchClassName;
              node.data = node.data || {};
              node.data.hProperties = node.data.hProperties || {};
              if (Array.isArray(node.data.hProperties.className)) {
                const classes = new Set(node.data.hProperties.className);
                classes.add(classname);
                node.data.hProperties.className = Array.from(classes);
              } else {
                node.data.hProperties.className = [classname];
              }
            }
          });
        }

        // remove nextAttrNode in parent.children
        parent.children.splice(index + 1, 1);
      }
    });
  };
}
