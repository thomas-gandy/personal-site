import { Anchor, AnchorProps, Code, CodeProps, List } from "@mantine/core";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";

interface CustomAnchorProps extends AnchorProps {
  href: string;
}

function CustomAnchor(props: CustomAnchorProps) {
  return <Anchor component={Link} {...props} fz={"inherit"} href={props.href} />;
}

function CodeBlock(props: CodeProps) {
  return (
    <Code {...props} block>
      {props.children}
    </Code>
  );
}

const components: MDXComponents = { a: CustomAnchor, code: Code, pre: CodeBlock, ul: List };

export function useMDXComponents(): MDXComponents {
  return components;
}
