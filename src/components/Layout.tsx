
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import InternalLinkingHub from "./InternalLinkingHub";

interface LayoutProps {
  children: React.ReactNode;
  onScrollToFeatures?: () => void;
}

const Layout = ({ children, onScrollToFeatures }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <Header onScrollToFeatures={onScrollToFeatures} />
      <PageTransition>
        <main className="flex-grow">
          {children}
        </main>
      </PageTransition>
      <Footer />
      <InternalLinkingHub />
    </div>
  );
};

export default Layout;
