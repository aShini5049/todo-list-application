import "./globals.css";
import React from "react";

export const metadata = {
  title: "To-Do List App",
  description: "Simple to-do list built with Next.js",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
