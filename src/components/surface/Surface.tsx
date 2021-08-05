import * as React from "react";

const Align = {
  LEFT: "justify-start",
  RIGHT: "justify-end",
  CENTER: "justify-center",
} as const;

type StaticProperties = {
  Align: typeof Align;
};

type Values<T> = T[keyof T];

type Props = {
  children: React.ReactNode;
  layoutClass?: string;
  align?: Values<typeof Align>;
};

const Surface: React.FC<Props> & StaticProperties = ({
  align = Align.LEFT,
  children,
}) => <div className={`flex ${align} w-full py-10 bg-white`}>{children}</div>;

Surface.Align = Align;

export default Surface;
