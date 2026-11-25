import { useEffect, useMemo, useState } from 'react';

interface CountdownSectionProps {
  recipientName: string;
  targetDateIso: string;
  title: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isArrived: boolean;
}

function calculateRemaining(targetIso: string): TimeRemaining {
  const parsed = new Date(targetIso).getTime();
  if (Number.isNaN(parsed)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isArrived: false };
  }

  const diff = parsed - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isArrived: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isArrived: false };
}

function padTwo(value: number): string {
  return String(value).padStart(2, '0');
}

export function CountdownSection({
  recipientName,
  targetDateIso,
  title,
}: CountdownSectionProps) {
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    calculateRemaining(targetDateIso)
  );

  useEffect(() => {
    setRemaining(calculateRemaining(targetDateIso));
    const interval = window.setInterval(() => {
      setRemaining(calculateRemaining(targetDateIso));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDateIso]);

  const formattedDate = useMemo(() => {
    const date = new Date(targetDateIso);
    if (Number.isNaN(date.getTime())) {
      return '';
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }, [targetDateIso]);

  const units = [
    { label: remaining.days === 1 ? 'day' : 'days', value: String(remaining.days) },
    { label: remaining.hours === 1 ? 'hour' : 'hours', value: padTwo(remaining.hours) },
    { label: remaining.minutes === 1 ? 'minute' : 'minutes', value: padTwo(remaining.minutes) },
    { label: remaining.seconds === 1 ? 'second' : 'seconds', value: padTwo(remaining.seconds) },
  ];

  return (
    <section
      id="countdown"
      aria-labelledby="countdown-heading"
      className="editorial-pastel-ribbon border-y border-[#2b1d19]/12"
    >
      <div className="mx-auto max-w-[1160px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-baseline">
          <h2
            id="countdown-heading"
            className="font-serif-editorial text-2xl font-normal italic text-[#5e4741] md:text-3xl"
          >
            {remaining.isArrived ? `Today is yours, ${recipientName}` : title}
          </h2>
          {formattedDate && (
            <p className="text-xs tracking-[0.12em] text-[#5e4741]">
              {formattedDate}
            </p>
          )}
        </div>

        <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6 sm:gap-x-14 lg:gap-x-20">
          {units.map((unit, index) => (
            <div key={unit.label} className="flex items-baseline gap-3">
              <span className="font-serif-editorial tabular-lining text-[3.5rem] font-normal leading-none tracking-tight text-[#2b1d19] sm:text-[4.5rem] lg:text-[5.5rem]">
                {unit.value}
              </span>
              <span className="font-serif-editorial text-lg italic text-[#5e4741] sm:text-xl">
                {unit.label}
              </span>
              {index < units.length - 1 && (
                <span
                  aria-hidden="true"
                  className="ml-4 hidden text-[#2b1d19]/20 lg:inline"
                >
                  /
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
