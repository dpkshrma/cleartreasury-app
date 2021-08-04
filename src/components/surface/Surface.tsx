import * as React from "react";

export const Align = {
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
  children,
  align = Align.CENTER,
}) => (
  <div className="w-full py-10 bg-white">
    <div className={`flex ${align}`}>
      <div className="max-w-xl w-full">{children}</div>
    </div>
  </div>
);

Surface.Align = Align;

export default Surface;
