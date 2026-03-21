import { Container, Title, Text } from "@mantine/core";
import { getNotes } from "@/src/lib/getNotes";
import NotesSearch from "@/src/app/ui/NotesSearch";

export default function Notes() {
  const notes = getNotes();

  return (
    <Container size={"sm"} mt={"xl"}>
      <Title order={2} mb={"md"}>
        Notes
      </Title>
      <Text mb={"xl"}>
        I have one of the worst memories on this planet. To help jog my memory when I need to
        revisit a topic, I write a lot of stuff down as I go through it. The notes here are what I
        always refer back to when I need a refresh. Perhaps you will find them useful, or perhaps
        not.
      </Text>
      <NotesSearch notes={notes} />
    </Container>
  );
}
