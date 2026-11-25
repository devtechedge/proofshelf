"use client";

import { useState } from "react";
import { GameTable } from "@/components/game-table";
import { ProgressRibbon } from "@/components/progress-ribbon";

export function PlayExperience({ mode }: { mode: "daily" | "review" | "practice" }) {
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <GameTable mode={mode} onComplete={() => setRefreshKey((value) => value + 1)} />
      <ProgressRibbon refreshKey={refreshKey} />
    </div>
  );
}
