import { Box, Center, Text, Stack, Timeline, TimelineItem, Title, Container, Avatar, Group, Badge, Button, Card, CardSection, ScrollArea, Flex } from "@mantine/core";
import { Image as MantineImage } from "@mantine/core"
import Image from "next/image"
import me from "@/public/images/me.png"
import classes from "./page.module.css"

export default function Home() {
  return (
    <Container size={"sm"} mt={"3em"} mb={"xl"}>
      <Stack w={"100%"}>
        <Center>
          <Box w={"12em"}>
            <Image src={me} alt={"An average image"} draggable={false} priority={true} style={{
              width: "100%",
              height: "auto",
              aspectRatio: 1 / 1,
              borderRadius: "50%",
              objectFit: "cover"
            }} />
          </Box >
        </Center>

        <Box mt={"xl"}>
          <Title order={2} mb={"sm"}>A little bit about me</Title>
          <Text>
            Hey!&nbsp; I&apos;m Tom, a Software Engineer.&nbsp; I currently work at an engineering company in Oxford.
            &nbsp;I take on a wide range of roles and tasks such as general full-stack, cloud & CI/CD management, desktop
            C++ development, and more.&nbsp; I am particularly passionate about containerisation.
          </Text>
        </Box>

        <Box mt={"xl"}>
          <Title order={2} mb={"sm"}>Experience</Title>
          <Timeline classNames={{ itemBullet: classes.itemBullet }} bulletSize={70} lineWidth={2}>
            <TimelineItem bullet={<Avatar size={"lg"} src={"/images/oracle-logo.png"} />}>
              <Group w={"100%"}>
                <Text className={classes.itemBulletTitle}>Oracle - Software Engineering Work Experience</Text>
                <Text ml={"auto"} fw={200} className={classes.itemBulletTitle}>UK, Reading</Text>
              </Group>
              <Text c="dimmed" size="sm">
                My first step into the professional world of software.  A short two-week stint at Oracle
                developing a web and mobile app for Reading Buses to track bus arrival times with a group of
                other college students.
              </Text>
              <Text size="xs" mt={4}>2022 July</Text>
            </TimelineItem>

            <TimelineItem bullet={<Avatar draggable={false} size={"lg"} src={"/images/tripadvisor-logo.svg"} />}>
              <Group w={"100%"}>
                <Text className={classes.itemBulletTitle}>TripAdvisor - Software Engineering Internship</Text>
                <Text ml={"auto"} fw={200} className={classes.itemBulletTitle}>UK, Oxford</Text>
              </Group>
              <Text c="dimmed" size="sm">
                A three-month software engineering internship at TripAdvisor.  I was placed into a team working on
                Tripadvisor&apos;s Viator site; specifically, we were improving search relevancy so that people could
                find experiences relevant to them all around the world.
              </Text>
              <Text size="xs" mt={4}>July 2023 - September 2023</Text>
            </TimelineItem>

            <TimelineItem bullet={
              <>
                <Box lightHidden><Avatar draggable={false} classNames={{ image: classes.logo }} size={"lg"} src={"/images/alloyed-symbol-white.svg"} /></Box>
                <Box darkHidden><Avatar draggable={false} classNames={{ image: classes.logo }} size={"lg"} src={"/images/alloyed-symbol-black.svg"} /></Box>
              </>
            }>
              <Group w={"100%"}>
                <Text className={classes.itemBulletTitle}>Alloyed - Software Engineer</Text>
                <Text ml={"auto"} fw={200} className={classes.itemBulletTitle}>UK, Oxford</Text>
              </Group>
              <Text c="dimmed" size="sm">
                A Series B funded engineering company specialising in 3D printing metal components mainly for the aerospace and
                electronics industries, though we print for other industries too.
                Here, I work on a range of applications from computer graphics apps to data management platforms.
              </Text>
              <Text size="xs" mt={4}>July 2023 - Present</Text>
            </TimelineItem>
          </Timeline>
        </Box>

        <Box mt={"xl"}>
          <Title order={2} mb={"sm"}>Projects</Title>
          <Group justify="space-between">
            <Card w={"21em"} shadow="sm" padding="lg" radius="md" withBorder>
              <CardSection>
                <MantineImage
                  draggable={false}
                  src="/images/terrain.png"
                  height={160}
                  alt="Norway"
                />
              </CardSection>

              <Text mt={"md"} fw={500}>Procedural Terrain Generation</Text>
              <Group mt="md" mb="md">
                <Badge className={classes.badge}>Computer Graphics</Badge>
                <Badge className={classes.badge}>C++</Badge>
                <Badge className={classes.badge}>Vulkan</Badge>
              </Group>

              <Text size="sm" c="dimmed">
                A ray-traced, procedurally generated terrain app.  It was written in C++ using the
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

              <Text mt={"md"} fw={500}>Simulated Network Sandbox</Text>
              <Group mt="md" mb="md">
                <Badge className={classes.badge}>Networking</Badge>
                <Badge className={classes.badge}>Golang</Badge>
              </Group>

              <Text size="sm" c="dimmed">
                An application written in Go, able to simulate any RFC defined protocol for OSI layers 2-7.
                OSI layer 1 is simulated with Go channels.
              </Text>
            </Card>
          </Group>
        </Box>
      </Stack>
    </Container>
  );
}
