"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="gutter flex min-h-[100svh] flex-col justify-center gap-8 pt-[var(--nav-h)]">
      <p className="eyebrow text-stone">Something went wrong</p>
      <h1 className="display display-lg">A small<br />interruption.</h1>
      <div>
        <button type="button" onClick={reset} className="btn btn-solid">Try again</button>
      </div>
    </section>
  );
}
