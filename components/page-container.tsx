import React from "react";
import { cn } from "@/lib/utils";

type pageContainerTypes = {
  title: string;
  children: React.ReactNode;
  classNames?: string;
};
export default function PageContainer({
  title,
  classNames,
  children,
}: pageContainerTypes) {
  return (
    <main className={cn("p-8", classNames)}>
      <h1 className="text-2xl text-center">{title}</h1>
      {children}
    </main>
  );
}
