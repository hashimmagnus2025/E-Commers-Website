export default function Loading() {
  return <div className="flex min-h-[70vh] items-center justify-center bg-[#f7f4ee]">
    <div className="rise text-center">
      <p className="text-2xl font-semibold tracking-[-.07em]">VELOCE<span className="text-[var(--gold)]">.</span></p>
      <div className="mx-auto mt-5 h-px w-24 overflow-hidden bg-[#d1ccc3]"><div className="shimmer h-full w-full" /></div>
    </div>
  </div>;
}
