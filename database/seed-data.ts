interface SeedDate {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedDate: SeedDate = {
  entries: [
    {
      description: "Learn Next Js",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      description: "Learn Node",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "Learn Docker",
      status: "in-progress",
      createdAt: Date.now(),
    },
  ],
};
