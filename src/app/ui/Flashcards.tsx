import { Carousel } from "@mantine/carousel";
import Flashcard from "./Flashcard";

export type FlashcardData = {
  front: string;
  back: string;
};

export type FlashcardsProps = {
  data: FlashcardData[];
};

export default function Flashcards({ data }: FlashcardsProps) {
  return (
    <div style={{ display: "flex" }}>
      <Carousel
        slideSize={"50%"}
        height={"100%"}
        withControls={false}
        withIndicators
        pb={"md"}
        flex={1}
        style={{ align: "center", alignItems: "center" }}
      >
        {data.map((d) => (
          <Carousel.Slide key={d.front} p={"md"}>
            <Flashcard front={d.front} back={d.back} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
