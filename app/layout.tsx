import "./globals.css";
import React, { PropsWithChildren } from "react";

export const metadata = {
  title: "SecondBrain",
};

const RootLayout = (props: PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <title>SecondBrain</title>
      </head>
      <body>{props.children}</body>
    </html>
  );
};

export default RootLayout;
