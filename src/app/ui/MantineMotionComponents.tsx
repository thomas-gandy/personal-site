import { Paper, PaperProps } from "@mantine/core";
import { motion } from "motion/react";
import { HTMLAttributes } from "react";

const PaperBase = (props: PaperProps & HTMLAttributes<HTMLDivElement>) => <Paper {...props} />;
export const MotionPaper = motion.create(PaperBase);
