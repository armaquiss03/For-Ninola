import { useMemo } from 'react';

interface DigitalLetterSectionProps {
  senderName: string;
  salutation: string;
  body: string;
  closing: string;
}

export function DigitalLetterSection({
  senderName,
  salutation,
  body,
  closing,
}: DigitalLetterSectionProps) {
  const paragraphs = useMemo(() => {
    return body
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }, [body]);

  return (
    <section
      id="letter"
      aria-labelledby="letter-heading"
      className="editorial-letter-wash border-t border-[#2b1d19]/10 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[660px]">
        <div className="border-t border-[#2b1d19]/18 pt-10">
          <h2
            id="letter-heading"
            className="font-serif-editorial text-3xl font-normal italic text-[#2b1d19] md:text-4xl"
          >
            {salutation}
          </h2>

          <div className="mt-10 space-y-7 font-serif-editorial text-[21px] leading-[1.72] text-[#2b1d19] md:text-[23px]">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? 'editorial-drop-cap' : undefined}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-14 border-t border-[#2b1d19]/14 pt-8">
            <p className="font-serif-editorial text-xl italic text-[#5e4741]">
              {closing}
            </p>
            <p className="mt-2 font-serif-editorial text-3xl font-normal text-[#2b1d19]">
              {senderName}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
