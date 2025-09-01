import type { ReactNode } from "react";
import NavigationHeader from "./NavigationHeader";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
}

export default function Layout({
  children,
  title,
  showBackButton = true,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavigationHeader title={title} showBackButton={showBackButton} />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
