import { Container, Text, Stack, Title } from "@mantine/core";

const intro = (
  <>
    <Title>Azure Shared Access Signatures</Title>
    <Text>
      How Shared Access Signatures (SAS) tokens work for Azure and how to use them in Azure and
      Azurite.
    </Text>

    <Title order={2}>Azure</Title>
    <Text></Text>

    <Title order={2}>Azurite</Title>
    <Text></Text>
  </>
);

export default function Notes() {
  return (
    <Container size={"sm"} mt={"xl"} mb={"xl"}>
      <Stack>{intro}</Stack>
    </Container>
  );
}
