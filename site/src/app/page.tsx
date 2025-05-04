import { Stack } from "@mantine/core";
import Experience from './components/Experience';
import Projects from './components/Projects';
import Articles from "./components/Articles";
import Introduction from "./components/Introduction";

export default function Home() {
  return (
    <Stack mt={"3em"} mb={"xl"}>
      <Introduction />
      <Experience />
      <Projects />
      <Articles />
    </Stack>
  );
}
