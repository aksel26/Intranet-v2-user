import { Anchor, AnchorProps } from "@mantine/core";
import Link from "next/link";

type LinkComponentProps = AnchorProps & {
  href: string;
  children: React.ReactNode;
};

export function LinkComponent({ href, children, ...others }: LinkComponentProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <Anchor {...others}>{children}</Anchor>
    </Link>
  );
}
