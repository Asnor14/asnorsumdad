"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const COUNT_API_NAMESPACE = "asnorsumdad-portfolio";
const COUNT_API_KEY = "visitors";
const VISITOR_FLAG_STORAGE_KEY = "asnorsumdad-visitor-counted-v1";

interface CountApiResponse {
    value?: number;
}

async function fetchVisitorCount(hit: boolean): Promise<number> {
    const endpoint = hit
        ? `https://api.countapi.xyz/hit/${COUNT_API_NAMESPACE}/${COUNT_API_KEY}`
        : `https://api.countapi.xyz/get/${COUNT_API_NAMESPACE}/${COUNT_API_KEY}`;

    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) {
        throw new Error("Failed to read visitor count.");
    }

    const data = (await response.json()) as CountApiResponse;
    if (typeof data.value !== "number") {
        throw new Error("Visitor count response is invalid.");
    }

    return data.value;
}

export function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isActive = true;

        const loadVisitorCount = async () => {
            try {
                const alreadyCounted = localStorage.getItem(VISITOR_FLAG_STORAGE_KEY) === "1";
                let nextCount: number;

                if (alreadyCounted) {
                    nextCount = await fetchVisitorCount(false);
                } else {
                    nextCount = await fetchVisitorCount(true);
                    localStorage.setItem(VISITOR_FLAG_STORAGE_KEY, "1");
                }

                if (isActive) {
                    setCount(nextCount);
                    setHasError(false);
                }
            } catch {
                if (isActive) {
                    setHasError(true);
                }
            }
        };

        loadVisitorCount();

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <div className="mb-2 flex items-center justify-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            <Users size={14} />
            {hasError ? (
                <span>Visitors unavailable</span>
            ) : (
                <span>{count === null ? "Loading visitors..." : `${count.toLocaleString()} visitors`}</span>
            )}
        </div>
    );
}

