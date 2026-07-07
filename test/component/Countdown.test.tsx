import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Countdown } from "../../src/components/content/countdown/Countdown.tsx";

const advanceSeconds = async (seconds: number): Promise<void> => {
    await act(async () => {
        vi.advanceTimersByTime(seconds * 1000);
    });
};

describe("Countdown", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-01-27T12:00:00Z"));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("renders without crashing and shows time initially", () => {
        const end = new Date("2026-01-27T12:00:10Z");
        render(<Countdown end={end} />);
        expect(screen.getByText(/seconds/i)).toBeInTheDocument();
    });

    it("counts down correctly over time", async () => {
        const end = new Date("2026-01-27T12:00:05Z");
        render(<Countdown end={end} />);
        await advanceSeconds(2);
        expect(screen.getByText("03")).toBeInTheDocument();
    });

    it("calls onEnd callback when countdown finishes", async () => {
        const onEnd = vi.fn();
        const end = new Date("2026-01-27T12:00:02Z");
        render(<Countdown end={end} onEnd={onEnd} />);
        await advanceSeconds(3);
        expect(onEnd).toHaveBeenCalledOnce();
    });

    it("clears interval when component unmounts", () => {
        const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");
        const end = new Date("2026-01-27T12:00:10Z");
        const { unmount } = render(<Countdown end={end} />);
        unmount();
        expect(clearIntervalSpy).toHaveBeenCalled();
    });

    it("renders days when showDays is true", () => {
        const end = new Date("2026-01-29T12:00:00Z");
        render(<Countdown end={end} showDays />);
        expect(screen.getByText(/days/i)).toBeInTheDocument();
    });
});
