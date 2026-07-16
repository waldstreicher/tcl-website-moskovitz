type WordmarkProps = {
  /** `dark` is for placement over a dark background (hero, footer). */
  variant?: 'light' | 'dark';
  tagline?: boolean;
  className?: string;
};

export default function Wordmark({
  variant = 'light',
  tagline = true,
  className = '',
}: WordmarkProps) {
  const onDark = variant === 'dark';

  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="font-wordmark text-3xl tracking-[0.035em]">
        <span className={onDark ? 'font-normal text-white' : 'font-normal text-tcl-dark'}>Tu</span>
        <span className={onDark ? 'font-medium text-tcl-gold' : 'font-medium text-tcl-gold-dark'}>Li</span>
      </span>
      {tagline && (
        <span
          className={`font-wordmark text-[10px] tracking-[0.2em] uppercase mt-1 ${
            onDark ? 'text-white/70' : 'text-tcl-gray'
          }`}
        >
          Tumescent Lipolysis
        </span>
      )}
    </span>
  );
}
