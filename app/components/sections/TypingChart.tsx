'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TypingRecord {
  wpm: number;
  accuracy: number;
  language: string;
  duration_seconds: number;
  recorded_at: string;
}

interface Props {
  data: TypingRecord[];
}

export default function TypingChart({ data }: Props) {
  // Urutkan data dari terlama ke terbaru untuk grafik garis
  const chartData = [...data]
    .sort((a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime())
    .map(item => ({
      date: new Date(item.recorded_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
      wpm: item.wpm,
      accuracy: item.accuracy,
    }));

  if (chartData.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="glass-card p-4" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="date" stroke="var(--text-muted)" tick={{ fontSize: 12 }} />
            <YAxis stroke="var(--text-muted)" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'var(--text-primary)' }}
            />
            <Line
              type="monotone"
              dataKey="wpm"
              stroke="var(--accent-start)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="WPM"
            />
            {/* Jika ingin menampilkan accuracy juga, tambahkan line berikut */}
            {/* <Line type="monotone" dataKey="accuracy" stroke="#f59e0b" strokeWidth={2} name="Akurasi" /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}