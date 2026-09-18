import type { MDXComponents } from 'mdx/types';
import Mermaid from './Mermaid';

export const mdxComponents: MDXComponents = {
  'mermaid-diagram': (props: any) => <Mermaid code={props.code ?? ''} />,
};
