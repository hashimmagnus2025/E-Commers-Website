import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="gutter flex min-h-[100svh] flex-col justify-center gap-8 pt-[var(--nav-h)]">
      <p className="eyebrow text-stone">Error 404</p>
      <h1 className="display display-xl">Off<br />the rail.</h1>
      <p className="max-w-sm text-stone">The page you are looking for has moved, or never existed.</p>
      <div><ButtonLink href="/" variant="solid">Back to home</ButtonLink></div>
    </section>
  );
}
