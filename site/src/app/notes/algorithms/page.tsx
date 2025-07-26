import { Anchor, Code, Container, List, ListItem, Paper, SegmentedControl, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { motion } from "motion/react";

const pageContent = (
  <>
    <Title>Containers</Title>
    <Text>
      
    </Text>
  </>
);

export default function Notes() {
  return (
    <Container size={"sm"} mt={"xl"} mb={"xl"}>
      <Stack>{pageContent}</Stack>
    </Container>
  );
}
