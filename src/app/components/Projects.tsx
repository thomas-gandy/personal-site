"use client";

import { Badge, Card, Text, CardSection, Container, Group, Title, Box } from "@mantine/core";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Image as MantineImage } from "@mantine/core";
import { useEffect, useRef } from "react";
import { useMouse } from "@mantine/hooks";
import classes from "./Projects.module.css";

export default function Projects() {
  const { ref, x, y } = useMouse<HTMLDivElement>();
  const canvasBoundingBox = useRef({ width: 0, height: 0 });
  const meshRef = useRef<THREE.Mesh>(undefined);

  useEffect(() => {
    if (!!ref) {
      const { width, height } = ref.current!.getBoundingClientRect();
      canvasBoundingBox.current = { width: width, height: height };
    }
  });

  useEffect(() => {
    if (!!meshRef.current) {
      const nx = 8 * (x / canvasBoundingBox.current.width - 0.5);
      const ny = -5 * (y / canvasBoundingBox.current.height - 0.5);
      meshRef.current!.position.x = nx;
      meshRef.current!.position.y = ny;
    }
  }, [x, y]);

  return (
    <Box>
      <Container w={"100%"} size={"sm"} mt={"xl"}>
        <Title order={2} mb={"xl"}>
          Projects
        </Title>
        <Text>Below are some of my most recent projects across a variety of different topics.</Text>
      </Container>
      <Container w={"100%"} size={"lg"} mt={"xl"}>
        <Group justify="space-between">
          <Card w={"21em"} shadow="sm" padding="lg" radius="md" withBorder>
            <CardSection ref={ref}>
              <Canvas>
                <ambientLight intensity={0.1} />
                <directionalLight color={"white"} position={[0, 0, 5]} />
                <mesh ref={meshRef}>
                  <boxGeometry args={[2, 2, 1]} />
                  <meshStandardMaterial color={"white"} />
                </mesh>
              </Canvas>
            </CardSection>

            <Text mt={"md"} fw={500}>
              Procedural Terrain Generation
            </Text>
            <Group mt="md" mb="md">
              <Badge className={classes.badge}>Computer Graphics</Badge>
              <Badge className={classes.badge}>C++</Badge>
              <Badge className={classes.badge}>Vulkan</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              A ray-traced, procedurally generated terrain app. It was written in C++ using the
              Vulkan Graphics and Compute API.
            </Text>
          </Card>

          <Card w={"21em"} shadow="sm" padding="lg" radius="md" withBorder>
            <CardSection>
              <MantineImage
                draggable={false}
                src="/images/network-diagram.png"
                height={160}
                alt="Norway"
              />
            </CardSection>

            <Text mt={"md"} fw={500}>
              Simulated Network Sandbox
            </Text>
            <Group mt="md" mb="md">
              <Badge className={classes.badge}>Networking</Badge>
              <Badge className={classes.badge}>Golang</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              An application written in Go, able to simulate any RFC defined protocol for OSI layers
              2-7. OSI layer 1 is simulated with Go channels.
            </Text>
          </Card>

          <Card w={"21em"} shadow="sm" padding="lg" radius="md" withBorder>
            <CardSection>
              <MantineImage draggable={false} src="/images/site.png" height={160} alt="Norway" />
            </CardSection>

            <Text mt={"md"} fw={500}>
              Personal Site
            </Text>
            <Group mt="md" mb="md">
              <Badge className={classes.badge}>Web</Badge>
              <Badge className={classes.badge}>React</Badge>
              <Badge className={classes.badge}>TS</Badge>
              <Badge className={classes.badge}>Mantine UI</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              The site you are on right now! Made with React, NextJS, TypeScript and Mantine.
            </Text>
          </Card>
        </Group>
      </Container>
    </Box>
  );
}
