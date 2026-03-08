// WakaTime-compatible stats response from Hackatime API
export interface HackatimeStats {
  data: {
    total_seconds: number;
    total_seconds_including_other_language: number;
    human_readable_total: string;
    human_readable_total_including_other_language: string;
    daily_average: number;
    daily_average_including_other_language: number;
    human_readable_daily_average: string;
    human_readable_daily_average_including_other_language: string;
    categories: StatItem[];
    projects: StatItem[];
    languages: StatItem[];
    editors: StatItem[];
    operating_systems: StatItem[];
    machines: StatItem[];
    best_day?: {
      date: string;
      total_seconds: number;
      text: string;
    };
    range: {
      range: string;
      start: string;
      end: string;
      text: string;
    };
    human_readable_range: string;
    status: string;
    is_already_updating: boolean;
    is_coding_activity_visible: boolean;
    is_other_usage_visible: boolean;
    is_stuck: boolean;
    is_up_to_date: boolean;
    username: string;
  };
}

export interface StatItem {
  name: string;
  total_seconds: number;
  percent: number;
  digital: string;
  decimal: string;
  text: string;
  hours: number;
  minutes: number;
  seconds?: number;
}

export async function fetchHackatimeStats(
  range: string = 'last_7_days'
): Promise<HackatimeStats> {
  const res = await fetch(`/api/tracker?range=${range}`);
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to fetch stats (${res.status})`);
  }
  return res.json();
}