import React from "react"; // Import React so JSX can compile; required even if we don’t use React.* directly.

/**
 * Generic feature card component.
 * Props:
 * - lightMode: boolean to switch colors for dark/light themes
 * - title: string shown as the card heading
 * - description: short supporting text
 * - icon: a React node (SVG wrapped in a badge) rendered on the right
 * - action: a React node (button/link) centered at the bottom
 * - badge: optional { text } object for a top-right pill
 *
 * Why this component:
 * - Reuse: keeps repeated layout/styling in one place.
 * - Flexibility: accepts nodes for icon/action so callers control their content.
 * - Theme-ready: takes lightMode instead of hardcoding colors.
 */
export default function FeatureCard({
  lightMode,
  title,
  description,
  icon,
  action,
  badge,
}) {
  // Choose card surface colors based on theme.
  // Why: avoids duplicating class strings in callers; easier to change theme in one place.
  const surface = lightMode
    ? "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100" // Light mode: soft off-white with subtle hover.
    : "bg-gray-900/60 border-gray-800 hover:border-gray-700 hover:bg-gray-900/80"; // Dark mode: translucent dark with subtle borders/hover.

  // Heading color per theme.
  // Why: ensures good contrast on both light and dark backgrounds.
  const titleClr = lightMode ? "text-gray-900" : "text-white";

  // Description color per theme.
  // Why: slightly muted text for better hierarchy; darker gray in light mode, lighter in dark mode.
  const descClr = lightMode ? "text-gray-700" : "text-gray-400";

  return (
    // Card container:
    // - group: allows group-hover styles if needed later.
    // - relative: enables absolutely-positioned badge inside.
    // - rounded-2xl/border/p-8: visual style (rounded corners, border, padding).
    // - min-h-[340px]: consistent height so all cards align nicely in a row.
    // - transition: smoothen hover state changes.
    // - ${surface}: theme-driven background/border classes.
    <div
      className={`group relative rounded-2xl border p-8 min-h-[340px] transition ${surface}`}
    >
      {
        // Optional "badge" pill in the top-right corner.
        // Why badge?.text: optional chaining safely checks for badge when it might be undefined
        // (shorter and clearer than badge && badge.text).
        badge?.text && (
          // Absolute position places the pill in the corner without shifting layout.
          // Theme colors keep the pill readable in both modes.
          <div
            className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
              lightMode
                ? "bg-black/10 text-black hover:bg-black/15"
                : "bg-white/10 text-white hover:bg-white/15"
            }`}
          >
            {
              badge.text /* Show the label passed by the caller (e.g., "Coming soon"). */
            }
          </div>
        )
      }

      {/* Header row inside the card:
          - flex + justify-between: space title/description on the left and icon on the right.
          - items-start: align tops so tall icons don’t vertically center awkwardly. */}
      <div className="flex items-start justify-between">
        <div>
          {/* Title text with theme-aware color. */}
          <div className={`text-xl font-semibold ${titleClr}`}>{title}</div>
          {/* Supporting description with a max width so lines don't get too long. */}
          <p className={`mt-2 text-sm max-w-sm ${descClr}`}>{description}</p>
        </div>

        {
          // Icon node provided by the caller (SVG wrapped in BrandBadge).
          // Why pass as a node: keeps this component unopinionated about which icon to use.
          icon
        }
      </div>

      {/* Action area:
          - mt-16: pushes button down to create breathing room from text.
          - flex + justify-center: centers the provided action button/link.
          - Why center here: same alignment for all cards without repeating classes in callers. */}
      <div className="mt-16 flex justify-center">{action}</div>
    </div>
  );
}
