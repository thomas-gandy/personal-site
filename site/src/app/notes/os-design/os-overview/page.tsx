import { Container, Stack, Text, Title } from "@mantine/core";

const pageContent = (
  <>
    <Title>Operating System Overview</Title>

    <Title order={2}>Operating System Objectives and Functions</Title>
    <Text></Text>

    <Title order={2}>The Evolution of Operating Systems</Title>
    <Text></Text>

    <Title order={2}>Major Achivements</Title>
    <Text></Text>

    <Title order={2}>Developments Leading to Modern Operating Systems</Title>
    <Text></Text>

    <Title order={2}>Fault Tolerance</Title>
    <Text></Text>

    <Title order={2}></Title>
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
