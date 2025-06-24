import { ActionIcon, Affix, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { ArrowUp } from "lucide-react";
// import { IconArrowUp } from "@tabler/icons-react";

const ScrollToTop = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 40 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <ActionIcon
            size={"lg"}
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            <ArrowUp size={16} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
};

export default ScrollToTop;
