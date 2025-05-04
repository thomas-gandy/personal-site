import { Container, Title, Text } from "@mantine/core";

export default function Articles() {
    return (
        <Container size={"sm"} mt={"xl"}>
        <Title order={2} mb={"sm"}>Articles</Title>
        <Text>
          I have one of the worst memories on this planet.
          To help jog my memory when I need to revisit a topic, I write a lot of stuff down as I go through it.
          The articles here are what I always refer back to when I need a refresh.
          Perhaps you will find them useful, or perhaps not.
        </Text>
      </Container>
    );
}
