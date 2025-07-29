import { ConsentGate } from "./ConsentGate";

export function Youtube({ href }) {
  return (
    <ConsentGate>
      <iframe
        width="560"
        height="315"
        src={href}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </ConsentGate>
  );
}
