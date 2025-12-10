export type JobRaw = {
  title: string;
  link?: string;
  location?: string;
  postedAt?: string;
  snippet?: string;
};

export type JobAnalysis = {
  job: JobRaw;
  issues: { code: string; severity: "low" | "medium" | "high"; message: string }[];
};
