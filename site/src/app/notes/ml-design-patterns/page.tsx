"use client";

import { HeroText } from "@/src/app/ui/HeroText";
import { Container } from "@mantine/core";
import Content from "./content.mdx";

export default function Page() {
  return (
    <>
      <HeroText>
        <HeroText.Title>
          The need for <HeroText.TitleHighlight>ML</HeroText.TitleHighlight> design patterns
        </HeroText.Title>
      </HeroText>
      <Container size={"sm"} mt={"xl"} mb={"xl"}>
        <Content />
      </Container>
    </>
  );
}
