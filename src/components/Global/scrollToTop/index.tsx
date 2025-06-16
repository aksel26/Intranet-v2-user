"use client";
import { ActionIcon, Affix, Button, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";
import React from "react";

const ScrollToTop = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 40 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <ActionIcon size={"lg"} style={transitionStyles} onClick={() => scrollTo({ y: 0 })}>
            <IconArrowUp size={16} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
};

export default ScrollToTop;
