export const BIRTHDAY_MONTH = 3;
export const BIRTHDAY_DAY = 14;
export const BIRTHDAY_TIME_ZONE = "Asia/Manila";

export function isBirthdayInTimeZone(
    date: Date = new Date(),
    timeZone: string = BIRTHDAY_TIME_ZONE
): boolean {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone,
        month: "numeric",
        day: "numeric",
    }).formatToParts(date);

    const month = Number(parts.find((part) => part.type === "month")?.value ?? "0");
    const day = Number(parts.find((part) => part.type === "day")?.value ?? "0");

    return month === BIRTHDAY_MONTH && day === BIRTHDAY_DAY;
}

