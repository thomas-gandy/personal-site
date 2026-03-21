import { Container } from "@mantine/core";
import { HeroText } from "./HeroText";

interface NotePageProps {
  title?: string;
  highlight: string;
  after?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}

export default function NotePage({ title, highlight, after, description, children }: NotePageProps) {
  return (
    <>
      <HeroText>
        <HeroText.Title>
          {title && `${title} `}<HeroText.TitleHighlight>{highlight}</HeroText.TitleHighlight>{after && ` ${after}`}
        </HeroText.Title>
        {description && <HeroText.Description>{description}</HeroText.Description>}
      </HeroText>
      <Container size={"sm"} mt={"xl"} mb={"xl"}>
        {children}
      </Container>
    </>
  );
}
