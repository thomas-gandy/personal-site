import {
  Container,
  Group,
  Title,
  Text,
  Timeline,
  TimelineItem,
  Avatar,
  Box,
} from "@mantine/core";
import classes from "./Experience.module.css";

export default function Experience() {
  return (
    <Container size={"sm"} mt={"xl"}>
      <Title order={2} mb={"xl"}>
        Experience
      </Title>
      <Timeline
        classNames={{ itemBullet: classes.itemBullet }}
        bulletSize={70}
        lineWidth={2}
      >
        <TimelineItem
          bullet={<Avatar size={"lg"} src={"/images/oracle-logo.png"} />}
        >
          <Group w={"100%"}>
            <Text className={classes.itemBulletTitle}>
              Oracle - Software Engineering Work Experience
            </Text>
            <Text ml={"auto"} fw={200} className={classes.itemBulletTitle}>
              UK, Reading
            </Text>
          </Group>
          <Text c="dimmed" size="sm">
            My first experience of the software &apos;industry&apos;. A short
            two-week stint at Oracle developing a web and mobile app for Reading
            Buses to track bus arrival times with a group of other college
            students.
          </Text>
          <Text size="xs" mt={4}>
            July 2019
          </Text>
        </TimelineItem>

        <TimelineItem
          bullet={
            <Avatar
              draggable={false}
              size={"lg"}
              src={"/images/tripadvisor-logo.svg"}
            />
          }
        >
          <Group w={"100%"}>
            <Text className={classes.itemBulletTitle}>
              TripAdvisor - Software Engineering Internship
            </Text>
            <Text ml={"auto"} fw={200} className={classes.itemBulletTitle}>
              UK, Oxford
            </Text>
          </Group>
          <Text c="dimmed" size="sm">
            A three-month software engineering internship at TripAdvisor. I was
            placed into a team working on Tripadvisor&apos;s Viator site;
            specifically, we were improving search relevancy so that people
            could find more relevant experiences to them all around the world.
          </Text>
          <Text size="xs" mt={4}>
            July 2022 - September 2022
          </Text>
        </TimelineItem>

        <TimelineItem
          bullet={
            <>
              <Box lightHidden>
                <Avatar
                  draggable={false}
                  classNames={{ image: classes.logo }}
                  size={"lg"}
                  src={"/images/alloyed-symbol-white.svg"}
                />
              </Box>
              <Box darkHidden>
                <Avatar
                  draggable={false}
                  classNames={{ image: classes.logo }}
                  size={"lg"}
                  src={"/images/alloyed-symbol-black.svg"}
                />
              </Box>
            </>
          }
        >
          <Group w={"100%"}>
            <Text className={classes.itemBulletTitle}>
              Alloyed - Software Engineer
            </Text>
            <Text ml={"auto"} fw={200} className={classes.itemBulletTitle}>
              UK, Oxford
            </Text>
          </Group>
          <Text c="dimmed" size="sm">
            A Series B funded engineering company specialising in 3D printing
            metal components mainly for the aerospace and electronics
            industries, though we print for other industries too. Here, I work
            on a range of applications from desktop computer graphics apps to
            cloud-based data management platforms.
          </Text>
          <Text size="xs" mt={4}>
            July 2023 - Present
          </Text>
        </TimelineItem>
      </Timeline>
    </Container>
  );
}
