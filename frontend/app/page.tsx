"use client";

import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const equitySeries = [
  { day: "Mon", equity: 102500 },
  { day: "Tue", equity: 103200 },
  { day: "Wed", equity: 102900 },
  { day: "Thu", equity: 104400 },
  { day: "Fri", equity: 105250 },
  { day: "Mon+1", equity: 106400 },
  { day: "Tue+1", equity: 107050 }
];

const activePositions = [
  {
    symbol: "NVDA",
    shares: 120,
    entry: 124.6,
    last: 128.9,
    stop: 123.2,
    type: "RISKY",
    ai: "Strong trend continuation."
  },
  {
    symbol: "AAPL",
    shares: 90,
    entry: 215.4,
    last: 218.2,
    stop: 215.4,
    type: "SAFE",
    ai: "Free roll with trail stop."
  }
];

const ladder = [
  { level: "Level 1", rote: 0.12 },
  { level: "Level 2", rote: 0.25 },
  { level: "Level 3", rote: 0.5 },
  { level: "Level 4", rote: 1.0 }
];

const closedTrades = [
  {
    symbol: "META",
    result: "+2.1R",
    grade: "A",
    exits: "1/2 + 1/2",
    date: "2024-07-08"
  },
  {
    symbol: "TSLA",
    result: "-1R",
    grade: "C",
    exits: "Full",
    date: "2024-07-05"
  }
];

export default function DashboardPage() {
  const [equity, setEquity] = useState("105250");
  const [entry, setEntry] = useState("124.6");
  const [stop, setStop] = useState("123.2");

  const riskAmount = useMemo(() => {
    const equityValue = Number(equity || 0);
    const rote = 0.25 / 100;
    return equityValue * rote;
  }, [equity]);

  const shareCount = useMemo(() => {
    const entryValue = Number(entry || 0);
    const stopValue = Number(stop || 0);
    const perShare = Math.max(entryValue - stopValue, 0.01);
    return Math.floor(riskAmount / perShare);
  }, [entry, stop, riskAmount]);

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">
              Progressive Exposure Dashboard
            </p>
            <h1 className="text-3xl font-semibold">TradeOS Control Center</h1>
          </div>
          <div className="flex flex-wrap gap-4">
            <Badge variant="accent">ROTE Level 2 • 0.25%</Badge>
            <Badge variant="success">Can open new position: Yes</Badge>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
              <p className="text-sm text-white/60">
                Today&apos;s P&amp;L +$1,250 • Drawdown -2.1% from peak
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={equitySeries}>
                    <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                    <YAxis
                      stroke="#64748b"
                      fontSize={12}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#0f172a",
                        border: "1px solid rgba(148, 163, 184, 0.2)"
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="equity"
                      stroke="#22d3ee"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Ladder</CardTitle>
              <p className="text-sm text-white/60">
                1 win away from Level 3
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {ladder.map((item, index) => (
                <div
                  key={item.level}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{item.level}</p>
                    <p className="text-xs text-white/50">
                      {item.rote.toFixed(2)}% ROTE
                    </p>
                  </div>
                  {index === 1 ? (
                    <Badge variant="accent">Current</Badge>
                  ) : (
                    <Badge>Locked</Badge>
                  )}
                </div>
              ))}
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                Consecutive Wins: 1 • Consecutive Losses: 0
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Active Positions</CardTitle>
              <p className="text-sm text-white/60">
                Real-time P&amp;L and AI insights
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {activePositions.map((position) => {
                const pnl = ((position.last - position.entry) * position.shares).toFixed(2);
                return (
                  <div
                    key={position.symbol}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold">{position.symbol}</p>
                        <p className="text-xs text-white/50">
                          {position.shares} shares • Entry ${position.entry}
                        </p>
                      </div>
                      <Badge variant={position.type === "RISKY" ? "danger" : "success"}>
                        {position.type}
                      </Badge>
                    </div>
                    <div className="mt-3 grid gap-3 text-sm text-white/70 md:grid-cols-3">
                      <p>Last: ${position.last}</p>
                      <p>Stop: ${position.stop}</p>
                      <p className="text-white">Unrealized P&amp;L ${pnl}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button variant="ghost">Adjust Stop</Button>
                      <Button variant="ghost">Add Exit</Button>
                      <Badge variant="accent">AI: {position.ai}</Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Position Size Calculator</CardTitle>
              <p className="text-sm text-white/60">
                ROTE Level 2 (0.25%)
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <label className="block text-sm text-white/60">
                  Total Equity
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                    value={equity}
                    onChange={(event) => setEquity(event.target.value)}
                  />
                </label>
                <label className="block text-sm text-white/60">
                  Entry Price
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                    value={entry}
                    onChange={(event) => setEntry(event.target.value)}
                  />
                </label>
                <label className="block text-sm text-white/60">
                  Stop Loss Price
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                    value={stop}
                    onChange={(event) => setStop(event.target.value)}
                  />
                </label>
                <div className="rounded-xl bg-white/5 p-4 text-sm">
                  <p className="text-white/60">Risk Amount</p>
                  <p className="text-xl font-semibold">
                    ${riskAmount.toFixed(2)}
                  </p>
                  <p className="mt-2 text-white/60">Calculated Shares</p>
                  <p className="text-xl font-semibold">{shareCount}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  Max risky positions: 2 • Current risky: 1 • Exposure 32%
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Trade History</CardTitle>
              <p className="text-sm text-white/60">
                Closed positions and performance metrics
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {closedTrades.map((trade) => (
                <div
                  key={trade.symbol}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{trade.symbol}</p>
                    <p className="text-xs text-white/50">
                      {trade.date} • Exits: {trade.exits}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="accent">Grade {trade.grade}</Badge>
                    <span className="text-sm text-white">{trade.result}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <p className="text-sm text-white/60">
                Claude-powered analysis from trade history
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  Strength: Your best trades occur when the 20-day trend aligns
                  with volume expansion.
                </li>
                <li>
                  Risk: You exit winners 18% early on average. Consider trailing
                  stops after 1.5R.
                </li>
                <li>
                  Focus: Maintain two wins before ladder upgrades to protect
                  equity curve.
                </li>
              </ul>
              <Button className="mt-4 w-full">Request Fresh Analysis</Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
