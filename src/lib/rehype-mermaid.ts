import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';

function getText(node: any): string {
  if (node.type === 'text') return node.value;
  if (Array.isArray(node.children)) {
    return node.children.map(getText).join('');
  }
  return '';
}

/**
 * ```mermaid 코드블록을 shiki가 하이라이트하기 전에 가로채서
 * <mermaid-diagram code="..."> 커스텀 엘리먼트로 치환한다.
 * mdxComponents 에서 이 태그를 클라이언트 <Mermaid /> 컴포넌트로 매핑한다.
 */
export function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'pre' || !parent || index === undefined) return;
      const code = node.children.find(
        (c): c is Element => c.type === 'element' && c.tagName === 'code'
      );
      if (!code) return;
      const className = (code.properties?.className ?? []) as string[];
      if (!className.some((c) => String(c).includes('language-mermaid'))) return;

      const codeText = getText(code);
      const replacement: Element = {
        type: 'element',
        tagName: 'mermaid-diagram',
        properties: { code: codeText },
        children: [],
      };
      (parent as any).children[index] = replacement;
    });
  };
}
