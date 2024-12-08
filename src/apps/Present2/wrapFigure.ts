import {whitespace} from 'hast-util-whitespace'
import { Element, ElementContent, Root } from 'react-markdown/lib'
import {SKIP, visit} from 'unist-util-visit'

const unknown = 1
const containsImage = 2
const containsOther = 3

/**
 * Remove the wrapping paragraph for images.
 *
 * @returns
 *   Transform.
 */
export default function rehypeUnwrapImages() {
  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree: Root) {
    visit(tree, 'element', function (node, index, parent) {
      if (
        node.tagName === 'p' &&
        parent &&
        typeof index === 'number' &&
        applicable(node, false) === containsImage
      ) {

        // create figure element
        let figure: ElementContent = {
          type: 'element',
          tagName: 'figure',
          properties: {},
          children: node.children
        }

        // find image alt
        let alt = ''
        for (let i = 0; i < figure.children.length; i++) {
          let child = figure.children[i]
          if (child.type === 'element' && child.tagName === 'img') {
            alt = child.properties.alt ? "" + child.properties.alt : '';
            break
          }
        }

        let figcaption: ElementContent = {
            type: 'element',
            tagName: 'figcaption',
            properties: {},
            children: [
                {
                    type: 'text',
                    value: alt
                }
            ]
        }

        figure.children.push(figcaption);

        parent.children.splice(index, 1, figure)
        return [SKIP, index]
      }
    })
  }
}

/**
 * Check if a node can be unraveled.
 *
 * @param {Element} node
 *   Node.
 * @param {boolean} inLink
 *   Whether the node is in a link.
 * @returns {1 | 2 | 3}
 *   Info.
 */
function applicable(node: Element, inLink: boolean) {
  /** @type {1 | 2 | 3} */
  let image = unknown
  let index = -1

  while (++index < node.children.length) {
    const child = node.children[index]

    if (child.type === 'text' && whitespace(child.value)) {
      // Whitespace is fine.
    } else if (child.type === 'element' && child.tagName === 'img') {
      image = containsImage
    } else {
      return containsOther
    }
  }

  return image
}