import { useState } from "react";
import classes from "./Flashcard.module.css";
import { MotionPaper } from "./MantineMotionComponents";
import { Box, BoxProps } from "@mantine/core";

export type FlashcardProps = {
  front: string;
  back: string;
} & BoxProps;

const faceProps: React.CSSProperties = {
  gridArea: "stack",
  width: "100%",
  backfaceVisibility: "hidden",
};

export default function Flashcard({ front, back, ...boxProps }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);
  const flipDurationSecs = 0.85;

  return (
    <Box style={{ perspective: "1000px" }} {...boxProps}>
      <MotionPaper
        style={{
          userSelect: "none",
          transformStyle: "preserve-3d",
          display: "grid",
          gridTemplateAreas: "stack",
          cursor: "pointer",
        }}
        classNames={classes}
        shadow="sm"
        p="lg"
        pos="relative"
        withBorder
        onClick={() => setFlipped(!flipped)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: flipDurationSecs, type: "spring" }}
      >
        <div
          style={{
            ...faceProps,
            transform: "rotateY(0deg)",
          }}
        >
          {front}
        </div>
        <div
          style={{
            ...faceProps,
            transform: "rotateY(180deg)",
          }}
        >
          {back}
        </div>
      </MotionPaper>
    </Box>
  );
}
