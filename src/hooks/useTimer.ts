import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

interface UseTimerOptions {
	interval?: number;
	autoStart?: boolean;
	initialSeconds?: number;
}

function formatTime(totalSeconds: number) {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const pad = (n: number) => n.toString().padStart(2, '0');

	if (hours > 0) {
		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
	}

	return `${pad(minutes)}:${pad(seconds)}`;
}

export function useTimer(options?: UseTimerOptions) {
	const { interval = 1000, autoStart = false, initialSeconds = 0 } = options ?? {};

	const [seconds, setSeconds] = useState(initialSeconds);

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const isRunning = intervalRef.current !== null;

	const formatted = useMemo(() => {
		return formatTime(seconds);
	}, [seconds]);

	const start = useCallback(() => {
		if (intervalRef.current) return;

		intervalRef.current = setInterval(() => {
			setSeconds((prev) => prev + 1);
		}, interval);
	}, [interval]);

	const stop = useCallback(() => {
		if (!intervalRef.current) return;

		clearInterval(intervalRef.current);
		intervalRef.current = null;
	}, []);

	const reset = useCallback(() => {
		stop();
		setSeconds(initialSeconds);
	}, [stop, initialSeconds]);

	const set = useCallback((value: number) => {
		setSeconds(value);
	}, []);

	useEffect(() => {
		if (autoStart) start();
		return stop;
	}, [autoStart, start, stop]);

	return {
		seconds,
		formatted,
		isRunning,
		start,
		stop,
		reset,
		set,
	};
}
