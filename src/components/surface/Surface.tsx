import * as React from "react";

type Props = {
  children: React.ReactNode;
  backgroundColor?: string;
  layoutClass?: string;
};

const Surface: React.FC<Props> = ({
  children,
  backgroundColor = "bg-white",
  layoutClass = "max-w-xl w-full m-auto",
}) => (
  <div className={`w-full py-10 ${backgroundColor}`}>
    <div className={layoutClass}>{children}</div>
  </div>
);

export default Surface;
