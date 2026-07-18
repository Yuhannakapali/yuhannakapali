// Small round "YK" monogram used in article bylines in place of an avatar photo.
export function Monogram({
  size = 44,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`font-display inline-flex shrink-0 items-center justify-center rounded-full bg-ink font-semibold tracking-tight text-marigold ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      YK
    </span>
  );
}
