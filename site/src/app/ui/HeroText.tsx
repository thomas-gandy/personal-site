import { Container, Text, Title } from "@mantine/core";
import { Dots } from "./Dots";

import classes from "./HeroText.module.css";
import React from "react";

export const Header = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const HeaderHighlight = ({ children }: { children: React.ReactNode }) => (
  <Text component="span" className={classes.highlight} inherit>
    {children}
  </Text>
);
export const Description = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export function HeroText({ children }: { children: React.ReactNode }) {
  const childrenArray = React.Children.toArray(children);

  const header = childrenArray.find((child) => React.isValidElement(child) && child.type === Header);
  const description = childrenArray.find((child) => React.isValidElement(child) && child.type === Description);

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>{header}</Title>
        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            {description}
          </Text>
        </Container>
      </div>
    </Container>
  );
}

HeroText.Title = Header;
HeroText.TitleHighlight = HeaderHighlight;
HeroText.Description = Description;
