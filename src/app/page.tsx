import { Stack } from "@mantine/core";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Notes from "./components/Notes";
import Introduction from "./components/Introduction";

export default function Home() {
  return (
    <Stack mt={"3em"} mb={"xl"} gap={"3.5em"}>
      <Introduction />
      <Experience />
      <Projects />
      <Notes />
    </Stack>
  );
}
