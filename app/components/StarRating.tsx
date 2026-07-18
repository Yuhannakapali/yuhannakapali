// Five small stars filled to the rating (supports half steps via a clipped
// marigold overlay on top of muted outline stars).
export function StarRating({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) {
  const pct = Math.max(0, Math.min(1, rating / 5)) * 100;
  const stars = "★★★★★";

  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className="relative inline-block whitespace-nowrap leading-none"
      style={{ fontSize: size, letterSpacing: "1px" }}
    >
      <span className="text-haze/45">{stars}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden text-marigold"
        style={{ width: `${pct}%` }}
      >
        {stars}
      </span>
    </span>
  );
}
