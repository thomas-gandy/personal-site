import { Anchor, AnchorProps, Container } from "@mantine/core";
import Content from "./content.mdx";
import { HeroText } from "@/src/app/ui/HeroText";
import Link from "next/link";

interface FooProps extends AnchorProps {
  href: string;
}

function Foo(props: FooProps) {
  return <Anchor {...props} component={Link} />;
}

export default function Page() {
  return (
    <>
      <HeroText>
        <HeroText.Title>
          Overview of <HeroText.TitleHighlight>Azure</HeroText.TitleHighlight> Durable Functions
        </HeroText.Title>
        <HeroText.Description>
          Notes on what Azure Durable Functions are, their differences from traditional Azure Functions, as well as
          their use cases.
        </HeroText.Description>
      </HeroText>
      <Container size={"sm"} mt={"xl"} mb={"xl"}>
        <Content components={{ a: Foo }} />
      </Container>
    </>
  );
}
