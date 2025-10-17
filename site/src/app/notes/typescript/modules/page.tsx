import { Code, Container, Stack, Text, Title } from "@mantine/core";

const content = (
  <>
    <Title></Title>
    <Text>
      Originally, JS files were included as <Code>&lt;script&gt;</Code> tags in a HTML file. Each script included like
      this shared the same global scope of each other&apos;s functions and variables, which was not ideal. A system that
      gives each script its own scope, also allowing scopes to communicate, is called a module system. Scripts in a
      module system are then known as modules.
    </Text>
    <Text>Annoyingly, many module systems exist. Some of these include ECMAScript Modules (ECMA)</Text>
  </>
);

export default function Notes() {
  return (
    <Container size={"sm"} mt={"xl"} mb={"xl"}>
      <Stack>{content}</Stack>
    </Container>
  );
}
