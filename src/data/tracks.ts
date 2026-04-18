export type Module = { title: string; description: string };

export type Track = {
  slug: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  description: string;
  modules: Module[];
  tools: string[];
  outcomes: string[];
  accent: string;
};

export const tracks: Track[] = [
  {
    slug: "ai-excel",
    name: "AI with Excel",
    level: "Intermediate",
    duration: "6 weeks",
    description:
      "Blend Excel mastery with AI copilots to automate, explain, and accelerate your analysis workflow.",
    accent: "from-emerald-500 to-green-500",
    tools: ["ChatGPT", "Power Query", "Office Scripts", "Azure ML", "Copilot"],
    outcomes: [
      "Design AI-powered dashboards and insights",
      "Generate formulas and VBA snippets with natural language",
      "Automate repetitive reporting with Office Scripts",
      "Ship explainable models inside Excel",
    ],
    modules: [
      {
        title: "Introduction to AI in Excel – Ideas & Add-ins",
        description:
          "Enable Copilot, explore AI add-ins, and set up your automation toolbox.",
      },
      {
        title: "Using ChatGPT to Write & Explain Formulas",
        description:
          "Prompt patterns for SUMIFS, XLOOKUP, INDEX-MATCH, and complex array formulas.",
      },
      {
        title: "Automating Repetitive Tasks with Office Scripts & AI",
        description:
          "Record, refine, and deploy scripts to refresh workbooks and clean data.",
      },
      {
        title: "Machine Learning Models inside Excel (Azure ML Add-in)",
        description:
          "Connect to hosted models, run predictions, and evaluate performance in-sheet.",
      },
      {
        title: "Natural Language Queries with Excel’s Ideas Tool",
        description:
          "Ask questions of your data and translate answers into reusable formulas.",
      },
      {
        title: "Building an AI-Powered Dashboard",
        description:
          "Blend AI outputs with KPI visuals, alerts, and narrative explanations.",
      },
    ],
  },
  {
    slug: "original-excel",
    name: "Original Excel",
    level: "Beginner",
    duration: "5 weeks",
    description:
      "Master classic Excel foundations—from formulas to pivots to macros—with modern best practices.",
    accent: "from-emerald-500 to-emerald-500",
    tools: ["XLOOKUP", "Power Pivot", "VBA", "Dynamic Arrays", "Power Query"],
    outcomes: [
      "Confidently model scenarios with structured references",
      "Automate repetitive steps with recorded and authored VBA",
      "Design dashboards with clean data validation",
      "Ship pivot-heavy reports that refresh in seconds",
    ],
    modules: [
      {
        title: "Master Formulas & Functions (XLOOKUP, INDEX-MATCH, SUMIFS)",
        description:
          "Construct resilient lookup and aggregation formulas for real data.",
      },
      {
        title: "Advanced PivotTables & Power Pivot",
        description:
          "Model relationships, build measures, and design pivot-based dashboards.",
      },
      {
        title: "Dynamic Arrays & LAMBDA Functions",
        description:
          "Spill-aware formulas, reusable lambdas, and composing advanced logic.",
      },
      {
        title: "Macros & VBA Basics",
        description:
          "Record macros, edit VBA, and manage modules responsibly.",
      },
      {
        title: "Data Validation & Conditional Formatting for Dashboards",
        description:
          "Guardrails for data quality plus expressive, performance-safe formatting.",
      },
      {
        title: "Financial Modelling Best Practices",
        description:
          "3-statement flow, assumptions, audit trails, and scenario toggles.",
      },
    ],
  },
  {
    slug: "data-analysis",
    name: "Data Analysis",
    level: "Advanced",
    duration: "6 weeks",
    description:
      "Use Excel as a serious analytics canvas: data cleaning, statistics, SQL connectivity, and interactive storytelling.",
    accent: "from-amber-400 to-pink-500",
    tools: ["Power Query", "Power Pivot", "Solver", "SQL connectors", "Charts"],
    outcomes: [
      "Clean, reshape, and document data pipelines in Excel",
      "Run statistical analysis with confidence intervals and ANOVA",
      "Publish interactive dashboards for business stakeholders",
      "Integrate SQL and APIs directly into workbooks",
    ],
    modules: [
      {
        title: "Data Cleaning with Power Query",
        description:
          "Build reproducible cleaning steps with M language under the hood.",
      },
      {
        title: "Statistical Analysis (Descriptive stats, regression, ANOVA)",
        description:
          "Hypothesis testing, regression fits, and interpreting outputs responsibly.",
      },
      {
        title: "Data Visualisation (Advanced charts, sparklines)",
        description:
          "Tell stories with custom chart combos, small multiples, and sparklines.",
      },
      {
        title: "What‑If Analysis & Solver",
        description:
          "Scenario Manager, Goal Seek, and Solver models for optimisation.",
      },
      {
        title: "Connecting Excel to SQL Databases & APIs",
        description:
          "Secure connections, parameterised queries, and refresh strategies.",
      },
      {
        title: "Creating Interactive Dashboards",
        description:
          "Slicers, timelines, and UX patterns for guided exploration.",
      },
    ],
  },
];
