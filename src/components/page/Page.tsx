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
  title?: string;
  backgroundColor?: Values<typeof Color>;
  children: React.ReactNode;
};

const Page: React.FC<Props> & StaticProperties = ({
  title,
  backgroundColor = Color.DEFAULT,
  children,
}) => (
  <div className={`flex flex-col w-full ${backgroundColor}`}>
    {title && <h1 className="text-4xl text-center m-12">{title}</h1>}
    {children}
  </div>
);

Page.Color = Color;

export default Page;
