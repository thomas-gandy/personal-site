import { Center, Box, Container, Title, Text } from "@mantine/core";
import Image from "next/image"
import me from "@/public/images/me.png"

export default function Introduction() {
    return (
        <>
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

            <Container size={"sm"} mt={"xl"}>
                <Title order={2} mb={"sm"}>A little bit about me</Title>
                <Text>
                    Hey!&nbsp; I&apos;m Tom, a Software Engineer.&nbsp; I currently work at an engineering company in Oxford.
                    &nbsp;I take on a wide range of roles and tasks such as general full-stack, cloud & CI/CD management, desktop
                    C++ development, and more.&nbsp; I am particularly passionate about containerisation.
                </Text>
            </Container>
        </>
    );
}