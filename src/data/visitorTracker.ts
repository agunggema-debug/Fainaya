import { supabase } from './supabase';

export type VisitorData = {
  id?: string;
  page: string;
  referrer: string;
  user_agent: string;
  visited_at: string;
};

export type DailyStats = {
  date: string;
  visitors: number;
  pageviews: number;
};

export type PageStats = {
  page: string;
  count: number;
};

// ---------- LOCAL STORAGE (fallback) ---------- //

export function trackVisitorLocally(page: string) {
  try {
    const visits: Array<{ page: string; referrer: string; user_agent: string; visited_at: string }> = JSON.parse(localStorage.getItem('fainaya_visits') || '[]');
    visits.push({
      page,
      referrer: document.referrer || 'direct',
      user_agent: navigator.userAgent,
      visited_at: new Date().toISOString(),
    });
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    const filtered = visits.filter((v) => new Date(v.visited_at) > cutoff);
    localStorage.setItem('fainaya_visits', JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}

export function getLocalDailyStats(): DailyStats[] {
  try {
    const visits = JSON.parse(localStorage.getItem('fainaya_visits') || '[]');
    const dailyMap = new Map<string, { visitors: Set<string>; pageviews: number }>();
    visits.forEach((v: { visited_at: string }) => {
      const date = v.visited_at.split('T')[0];
      if (!dailyMap.has(date)) {
        dailyMap.set(date, { visitors: new Set(), pageviews: 0 });
      }
      const day = dailyMap.get(date)!;
      day.pageviews++;
      const sessionKey = localStorage.getItem('fainaya_session_id') || 'anonymous';
      day.visitors.add(sessionKey);
    });
    return Array.from(dailyMap.entries())
      .map(([date, data]) => ({ date, visitors: data.visitors.size, pageviews: data.pageviews }))
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return [];
  }
}

export function getLocalPageStats(): PageStats[] {
  try {
    const visits = JSON.parse(localStorage.getItem('fainaya_visits') || '[]');
    const pageMap = new Map<string, number>();
    visits.forEach((v: { page: string }) => {
      pageMap.set(v.page, (pageMap.get(v.page) || 0) + 1);
    });
    return Array.from(pageMap.entries())
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count);
  } catch {
    return [];
  }
}

export function getLocalTotalStats() {
  const daily = getLocalDailyStats();
  const pages = getLocalPageStats();
  return {
    totalVisitors: daily.reduce((sum, d) => sum + d.visitors, 0),
    totalPageviews: daily.reduce((sum, d) => sum + d.pageviews, 0),
    totalDays: daily.length,
    avgVisitorsPerDay: daily.length > 0
      ? Math.round(daily.reduce((sum, d) => sum + d.visitors, 0) / daily.length)
      : 0,
    topPages: pages.slice(0, 5),
    dailyStats: daily.slice(-14),
  };
}

export function getSessionId(): string {
  let sessionId = localStorage.getItem('fainaya_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('fainaya_session_id', sessionId);
  }
  return sessionId;
}

// ---------- SUPABASE (primary for dashboard) ---------- //

/** Track visitor — tries Supabase first, falls back to localStorage */
export async function trackVisitor(page: string) {
  // Always save locally as fallback
  trackVisitorLocally(page);

  try {
    const { error } = await supabase.from('visitor_logs').insert({
      page,
      referrer: document.referrer || 'direct',
      user_agent: navigator.userAgent,
      visited_at: new Date().toISOString(),
    });
    if (error) console.warn('Supabase track error:', error.message);
    return !error;
  } catch {
    return false;
  }
}

/** Fetch daily stats from Supabase visitor_logs table */
export async function fetchSupabaseDailyStats(days: number = 14): Promise<DailyStats[]> {
  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString();

    const { data, error } = await supabase
      .from('visitor_logs')
      .select('visited_at, page')
      .gte('visited_at', cutoffStr)
      .order('visited_at', { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return [];

    // Aggregate by date
    const dailyMap = new Map<string, { visitors: Set<string>; pageviews: number }>();

    for (const row of data) {
      const date = row.visited_at?.split('T')[0] || '';
      if (!dailyMap.has(date)) {
        dailyMap.set(date, { visitors: new Set(), pageviews: 0 });
      }
      const day = dailyMap.get(date)!;
      day.pageviews++;
      // Use part of visited_at ms + page as visitor fingerprint (since IP is not available)
      const fp = row.visited_at?.slice(0, 16) + row.page; // minute-level uniqueness
      day.visitors.add(fp);
    }

    return Array.from(dailyMap.entries())
      .map(([date, data]) => ({ date, visitors: data.visitors.size, pageviews: data.pageviews }))
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch (err) {
    console.warn('Failed to fetch Supabase stats, falling back to local:', err);
    return [];
  }
}

/** Fetch top pages from Supabase */
export async function fetchSupabasePageStats(days: number = 30): Promise<PageStats[]> {
  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString();

    const { data, error } = await supabase
      .from('visitor_logs')
      .select('page')
      .gte('visited_at', cutoffStr);

    if (error) throw error;
    if (!data) return [];

    const pageMap = new Map<string, number>();
    for (const row of data) {
      pageMap.set(row.page, (pageMap.get(row.page) || 0) + 1);
    }

    return Array.from(pageMap.entries())
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count);
  } catch {
    return [];
  }
}

/** Fetch summary stats from Supabase */
export async function fetchSupabaseTotalStats() {
  const daily = await fetchSupabaseDailyStats(30);
  const pages = await fetchSupabasePageStats(30);

  return {
    totalVisitors: daily.reduce((sum, d) => sum + d.visitors, 0),
    totalPageviews: daily.reduce((sum, d) => sum + d.pageviews, 0),
    totalDays: daily.length,
    avgVisitorsPerDay: daily.length > 0
      ? Math.round(daily.reduce((sum, d) => sum + d.visitors, 0) / daily.length)
      : 0,
    topPages: pages.slice(0, 5),
    dailyStats: daily.slice(-14),
  };
}