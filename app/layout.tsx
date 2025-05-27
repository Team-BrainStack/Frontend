
import "./globals.css";
<<<<<<< HEAD
import React, { PropsWithChildren } from 'react'

 const RootLayout = (props:PropsWithChildren) => {
  return (
    <html>
    <body>
      {props.children}
    </body>
  </html>
  );
};

 export default RootLayout;
=======
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
>>>>>>> sharadamani
