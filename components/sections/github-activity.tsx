"use client";

import { motion, useInView } from "framer-motion";
import { Github } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PixelScatter } from "@/components/sections/pixel-scatter";

interface ContributionDay {
    date: string;
    contributionCount: number;
    contributionLevel: string;
    weekday: number;
}

interface ContributionWeek {
    firstDay: string;
    contributionDays: ContributionDay[];
}

interface ContributionResponse {
    configured: boolean;
    username: string | null;
    totalContributions: number;
    weeks: ContributionWeek[];
    message?: string;
}

interface ActivityStats {
    longestStreak: number;
    bestMonth: string;
    activeDays: number;
}

const weekdayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

function getContributionClass(day?: ContributionDay) {
    if (!day || day.contributionCount === 0) {
        return "border-neutral-200 bg-neutral-50";
    }

    switch (day.contributionLevel) {
        case "FIRST_QUARTILE":
            return "border-neutral-300 bg-neutral-300";
        case "SECOND_QUARTILE":
            return "border-neutral-500 bg-neutral-500";
        case "THIRD_QUARTILE":
            return "border-neutral-700 bg-neutral-700";
        case "FOURTH_QUARTILE":
            return "border-black bg-black";
        default:
            return "border-neutral-400 bg-neutral-400";
    }
}

function formatDateLabel(date: string) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}

function getMonthMarkers(weeks: ContributionWeek[]) {
    return weeks.map((week, index) => {
        const currentMonth = new Date(week.firstDay).getMonth();
        const previousMonth = index > 0 ? new Date(weeks[index - 1].firstDay).getMonth() : -1;

        if (index === 0 || currentMonth !== previousMonth) {
            return new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(week.firstDay));
        }

        return "";
    });
}

function getActivityStats(weeks: ContributionWeek[]): ActivityStats {
    const days = weeks
        .flatMap((week) => week.contributionDays)
        .sort((first, second) => new Date(first.date).getTime() - new Date(second.date).getTime());
    const monthTotals = new Map<string, { label: string; total: number }>();
    let activeDays = 0;
    let longestStreak = 0;
    let currentStreak = 0;
    let previousActiveDate: Date | null = null;

    days.forEach((day) => {
        const date = new Date(day.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
        const monthLabel = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
        const monthTotal = monthTotals.get(monthKey) ?? { label: monthLabel, total: 0 };
        monthTotal.total += day.contributionCount;
        monthTotals.set(monthKey, monthTotal);

        if (day.contributionCount > 0) {
            activeDays += 1;

            if (previousActiveDate) {
                const dayDifference = Math.round(
                    (date.getTime() - previousActiveDate.getTime()) / (1000 * 60 * 60 * 24)
                );
                currentStreak = dayDifference === 1 ? currentStreak + 1 : 1;
            } else {
                currentStreak = 1;
            }

            longestStreak = Math.max(longestStreak, currentStreak);
            previousActiveDate = date;
        } else {
            currentStreak = 0;
            previousActiveDate = null;
        }
    });

    const bestMonth =
        Array.from(monthTotals.values()).sort((first, second) => second.total - first.total)[0]?.label ?? "--";

    return {
        longestStreak,
        bestMonth,
        activeDays,
    };
}

function ContributionSkeleton() {
    return (
        <div className="min-w-[42rem]">
            <div className="mb-2 ml-10 grid grid-cols-[repeat(53,0.75rem)] gap-1">
                {Array.from({ length: 53 }, (_, index) => (
                    <span key={index} className="h-3 bg-neutral-100" />
                ))}
            </div>
            <div className="grid grid-cols-[2rem_1fr] gap-2">
                <div className="grid grid-rows-7 gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                    {weekdayLabels.map((label, index) => (
                        <span key={`${label}-${index}`} className="h-3 leading-3">
                            {label}
                        </span>
                    ))}
                </div>
                <div className="grid grid-cols-[repeat(53,0.75rem)] gap-1">
                    {Array.from({ length: 53 }, (_, week) => (
                        <div key={week} className="grid grid-rows-7 gap-1">
                            {Array.from({ length: 7 }, (_, day) => (
                                <span key={`${week}-${day}`} className="h-3 w-3 border border-neutral-200 bg-neutral-50" />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function GitHubActivity() {
    const ref = useRef(null);
    const isActive = useInView(ref, { once: false, margin: "-50px" });
    const [activity, setActivity] = useState<ContributionResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadActivity() {
            try {
                const response = await fetch("/api/github-contributions");
                const payload = (await response.json()) as ContributionResponse;

                if (!isMounted) return;

                setActivity(payload);
                setError(response.ok ? null : payload.message ?? "Unable to load GitHub activity.");
            } catch {
                if (isMounted) {
                    setError("Unable to load GitHub activity.");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadActivity();

        return () => {
            isMounted = false;
        };
    }, []);

    const monthMarkers = useMemo(() => getMonthMarkers(activity?.weeks ?? []), [activity?.weeks]);
    const activityStats = useMemo(() => getActivityStats(activity?.weeks ?? []), [activity?.weeks]);
    const username = activity?.username ?? "GitHub";

    return (
        <motion.section
            id="github-activity"
            ref={ref}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative isolate scroll-mt-28 border-t border-black py-12 md:py-24"
            aria-labelledby="github-activity-heading"
        >
            <PixelScatter active={isActive} />

            <div className="mb-10 grid gap-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                        GitHub Activity
                    </p>
                    <span className="inline-flex border border-neutral-200 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                        @{username}
                    </span>
                </div>

                <div className="grid gap-3">
                    <h2
                        id="github-activity-heading"
                        className="font-display text-5xl font-semibold leading-none text-black sm:text-7xl"
                    >
                        {isLoading ? "--" : activity?.totalContributions ?? 0}
                    </h2>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
                        Contributions in the last year
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <span className="inline-flex border border-neutral-200 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                        Longest streak · {activityStats.longestStreak} days
                    </span>
                    <span className="inline-flex border border-neutral-200 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                        Best month · {activityStats.bestMonth}
                    </span>
                    <span className="inline-flex border border-neutral-200 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                        Active days · {activityStats.activeDays}
                    </span>
                </div>
            </div>

            <div className="overflow-hidden border border-black bg-white">
                <div className="flex items-center justify-between gap-4 border-b border-black px-4 py-3">
                    <div className="flex min-w-0 items-center gap-2">
                        <Github size={17} />
                        <p className="truncate font-mono text-xs uppercase tracking-[0.16em] text-black">
                            {activity?.username ?? "GitHub"}
                        </p>
                    </div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
                        @{username} · updated hourly
                    </p>
                </div>

                <div className="relative overflow-hidden">
                    <div className="overflow-x-auto p-4">
                        {isLoading ? (
                            <ContributionSkeleton />
                        ) : activity?.configured === false ? (
                            <div className="border border-neutral-200 bg-neutral-50 p-5 text-sm leading-6 text-neutral-700">
                                Add `GITHUB_TOKEN` to `.env.local`, then restart the dev server to show your contribution graph.
                            </div>
                        ) : error ? (
                            <div className="border border-neutral-200 bg-neutral-50 p-5 text-sm leading-6 text-neutral-700">
                                {error}
                            </div>
                        ) : (
                            <div className="min-w-[42rem]">
                                <div
                                    className="mb-2 ml-10 grid gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500"
                                    style={{ gridTemplateColumns: `repeat(${activity?.weeks.length ?? 0}, 0.75rem)` }}
                                >
                                    {monthMarkers.map((month, index) => (
                                        <span key={`${month}-${index}`} className="h-3 leading-3">
                                            {month}
                                        </span>
                                    ))}
                                </div>

                                <div className="grid grid-cols-[2rem_1fr] gap-2">
                                    <div className="grid grid-rows-7 gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                                        {weekdayLabels.map((label, index) => (
                                            <span key={`${label}-${index}`} className="h-3 leading-3">
                                                {label}
                                            </span>
                                        ))}
                                    </div>

                                    <div
                                        className="grid gap-1"
                                        style={{ gridTemplateColumns: `repeat(${activity?.weeks.length ?? 0}, 0.75rem)` }}
                                    >
                                        {activity?.weeks.map((week) => (
                                            <div key={week.firstDay} className="grid grid-rows-7 gap-1">
                                                {Array.from({ length: 7 }, (_, weekday) => {
                                                    const day = week.contributionDays.find(
                                                        (contributionDay) => contributionDay.weekday === weekday
                                                    );

                                                    return (
                                                        <span
                                                            key={`${week.firstDay}-${weekday}`}
                                                            className={`h-3 w-3 border ${getContributionClass(day)}`}
                                                            title={
                                                                day
                                                                    ? `${formatDateLabel(day.date)}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`
                                                                    : "No contribution data"
                                                            }
                                                            aria-label={
                                                                day
                                                                    ? `${formatDateLabel(day.date)}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`
                                                                    : "No contribution data"
                                                            }
                                                        />
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div
                        className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent md:hidden"
                        aria-hidden="true"
                    />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 px-4 py-3">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
                        Less
                    </p>
                    <div className="flex items-center gap-1">
                        {["bg-neutral-50", "bg-neutral-300", "bg-neutral-500", "bg-neutral-700", "bg-black"].map(
                            (tone) => (
                                <span key={tone} className={`h-3 w-3 border border-neutral-200 ${tone}`} />
                            )
                        )}
                    </div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
                        More
                    </p>
                </div>
            </div>
        </motion.section>
    );
}
