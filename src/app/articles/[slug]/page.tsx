import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type ArticleRecord = {
  id: string | number;
  slug?: string;
  title: string;
  date: string;
  content: ReactNode;
};

const ARTICLES: ArticleRecord[] = [
  {
    id: 1,
    slug: "kirk-cousins-is-back-in-minnesota-cousins-wins-first-game-back",
    title: "Kirk Cousins is Back in Minnesota: Cousins Wins First Game Back",
    date: "11/15/2026",
    content: (
      <p>
        Vikings got Kirk Cousins back in Minnesota for a second time to help
        their QB performance.
      </p>
    ),
  },
  // Add your other articles here...
];