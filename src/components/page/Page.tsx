import * as React from "react";

export const Color = {
  TEAL: "bg-teal-600",
  DEFAULT: "bg-theme-color-background",
} as const;

type StaticProperties = {
  Color: typeof Color;
};

type Values<T> = T[keyof T];

type Props = {
  backgroundColor?: Values<typeof Color>;
  children: React.ReactNode;
};

const Page: React.FC<Props> & StaticProperties = ({
  backgroundColor = Color.DEFAULT,
  children,
}) => (
  <div className={`min-h-full flex w-full ${backgroundColor}`}>{children}</div>
);

Page.Color = Color;

export default Page;
