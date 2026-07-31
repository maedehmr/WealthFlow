import React from "react";

interface FullLayoutProps {
  children: React.ReactNode;
}

export default function FullLayout({ children }: FullLayoutProps) {
  return <main>{children}</main>;
}
