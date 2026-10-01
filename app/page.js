import { HomeClient } from '../components/HomeClient';
import { HeroClient } from '../components/HeroClient';

export default function HomePage() { return <>
  <HeroClient />
  <div className="overflow-hidden border-b border-t hairline py-4"><div className="marquee-track flex gap-10 text-xs tracking-[.15em]">{Array.from({ length: 6 }).map((_, i) => <span key={i}>NEW COLLECTION&nbsp;&nbsp;—&nbsp;&nbsp; VELOCE&nbsp;&nbsp;—&nbsp;&nbsp; SPRING / SUMMER 2026</span>)}</div></div>
  <HomeClient />
</> }
