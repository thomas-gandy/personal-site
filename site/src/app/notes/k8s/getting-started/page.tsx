"use client";

import { HeroText } from "@/src/app/ui/HeroText";
import { Container } from "@mantine/core";
import Content from "./content.mdx";
import Flashcards, { FlashcardData } from "@/src/app/ui/Flashcards";

const flashcardData: FlashcardData[] = [
  {
    front: "What software should every node contain?",
    back: "A kubelet agent and container management tools",
  },
  {
    front: "What is the name of containers when they belong in the same pod?",
    back: "Co-located",
  },
  {
    front: "What is the name of the k8s resource that is the smallest deployable unit of computing?",
    back: "Pod",
  },
  {
    front: "What is the difference between co-located and non-co-located containers?",
    back: "Co-located containers share storage and network resources",
  },
  {
    front: "Difference between init, ephemeral, and sidecar containers?",
    back: "",
  },
  {
    front: "Difference between kubectl get and describe subcommands?",
    back: "get lists resources of a certain type, describe provides detailed information about the resource such as events, containers in the pod, state, selectors, etc.",
  },
];

export default function Page() {
  return (
    <>
      <HeroText>
        <HeroText.Title>
          Getting started with <HeroText.TitleHighlight>Kubernetes</HeroText.TitleHighlight>
        </HeroText.Title>
      </HeroText>
      <Container size={"sm"} mt={"xl"} mb={"xl"}>
        <Content />
        {/* <Flashcards data={flashcardData} /> */}
      </Container>
    </>
  );
}
