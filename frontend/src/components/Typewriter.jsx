import React, { useEffect, useState } from "react";

export default function Typewriter({
  text,
  speed = 120,
  pause = 1000,
  className = "",
}) {
  const [out, setOut] = useState("");
  const [dir, setDir] = useState("type");

  useEffect(() => {
    let t;
    if (dir === "type") {
      if (out.length < text.length)
        t = setTimeout(() => setOut(text.slice(0, out.length + 1)), speed);
      else t = setTimeout(() => setDir("del"), pause);
    } else {
      if (out.length > 0)
        t = setTimeout(
          () => setOut(text.slice(0, out.length - 1)),
          speed / 1.2
        );
      else t = setTimeout(() => setDir("type"), pause / 2);
    }
    return () => clearTimeout(t);
  }, [dir, out, text, speed, pause]);

  return (
    <span className={className}>
      {out}
      <span className="ml-0.5 inline-block w-[1px] h-[1em] align-baseline bg-current animate-pulse" />
    </span>
  );
}
