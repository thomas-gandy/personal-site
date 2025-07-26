import { Container, List, ListItem, Stack, Text, Title } from "@mantine/core";

const pageContent = (
  <>
    <Title>Modding Minecraft</Title>
    <Text>
      This walkthrough goes through how to create a Minecraft modification (mod) from scratch with Java, using the
      Fabric mod loader. In particular, I want to place an emphasis on understanding the Java Virtual Machine (JVM) and
      its internals. So, this is more of a walkthrough into the JVM and how you can make modifications to Java programs,
      using Minecraft as a practical example.
    </Text>

    <Title order={2}>Terminology</Title>
    <Text>
      The Fabric docs define some terminology. A mod is a modification to the game. A mod loader loads mods into the
      game; Fabric Loader is an example of a mod loader. A mixin allows you to modify running code. Mappings map
      obfuscated code to human readable code. Remapping is the process of using mappings to convert from obfuscated code
      to human readable code.
    </Text>

    <Title order={2}>What Fabric is</Title>
    <Text>
      Fabric is a modding toolchain. Being a toolchain, it means it actually consists of several different components
      and is not one single project itself. It consists of the following main components
    </Text>
    <List>
      <ListItem>Fabric Loader</ListItem>
      <ListItem>Fabric Loom</ListItem>
      <ListItem>Fabric API</ListItem>
      <ListItem>Yarn</ListItem>
    </List>
    <Title order={5}>Fabric Loom</Title>
    <Text>Gradle plugin to </Text>
    <Title order={5}>Fabric API</Title>
    <Text></Text>
    <Title order={5}>Yarn</Title>
    <Text></Text>
  </>
);

export default function Notes() {
  return (
    <Container size={"sm"} mt={"xl"} mb={"xl"}>
      <Stack>{pageContent}</Stack>
    </Container>
  );
}
