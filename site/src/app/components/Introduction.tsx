import { Button, Box, Container, Title, Text, ButtonProps, Stack } from "@mantine/core";
import Image from "next/image";
import me from "@/public/images/me.png";
import { GithubIcon } from "@mantinex/dev-icons";
import classes from "./Introduction.module.css";

function GithubButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button {...props} leftSection={<GithubIcon size={16} />} className={classes.githubButton} />
  );
}

export default function Introduction() {
  return (
    <>
      <Stack align="center">
        <Box w={"12em"}>
          <Image
            src={me}
            alt={"An average image"}
            draggable={false}
            priority={true}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: 1 / 1,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Title order={3}>Tom G</Title>
        <GithubButton>GitHub</GithubButton>
      </Stack>

      <Container size={"sm"}>
        <Title order={2} mb={"xl"}>
          A little bit about me
        </Title>
        <Text>
          Hey!&nbsp; I&apos;m Tom, a Software Engineer.&nbsp; I currently work at an engineering
          company in Oxford. &nbsp;I take on a wide range of roles and tasks such as general
          full-stack, cloud & CI/CD management, desktop C++ development, and more.&nbsp; I am
          particularly passionate about containerisation.
        </Text>
      </Container>
    </>
  );
}
