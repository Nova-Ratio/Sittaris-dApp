export const PeriodData = [
  {
    "default-granularity": "1-hours",
    granularities: [
      "1-minutes",
      "5-minutes",
      "10-minutes",
      "15-minutes",
      "30-minutes",
      "1-hours",
    ],
    key: "last-24-hours",
    label: "Last 24 Hours",
    start_date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    end_date: new Date(),
  },
  {
    "default-granularity": "1-hours",
    granularities: [
      "1-minutes",
      "5-minutes",
      "10-minutes",
      "15-minutes",
      "30-minutes",
      "1-hours",
    ],
    key: "yesterday",
    label: "Yesterday",
    start_date : new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1, 0, 0, 0),

    end_date: //yesterdat 23:59 end
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1, 23, 59, 59),
  },
  {
    "default-granularity": "1-days",
    granularities: ["1-hours", "1-days", "1-weeks", "1-months"],
    key: "last-month",
    label: "Last month",
    start_date: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
    end_date: new Date(),
  },
  {
    "default-granularity": "1-months",
    granularities: [
      "1-hours",
      "1-days",
      "1-weeks",
      "1-months",
      "3-months",
      "1-years",
    ],
    key: "year-to-date",
    label: "Year to date",
    start_date: new Date(new Date().getFullYear(), 0, 1),
    end_date: new Date(),
  }
];
