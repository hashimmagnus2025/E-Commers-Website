import Link from 'next/link';

const stories = {
  '1': { title: 'The art of everyday dressing.', meta: 'Field notes / 06.02.26', intro: 'A wardrobe is not a performance. It is a collection of small decisions that make the day feel like yours.', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=88', body: ['There is a particular pleasure in getting dressed without needing to think too hard. The right jacket. A shirt that has softened with time. Trousers that make walking feel easy.', 'This is where Veloce begins: with the belief that considered design should disappear into your life, leaving only the feeling of being ready for it.'] },
  '2': { title: 'The return of tailoring.', meta: 'Perspective / 28.01.26', intro: 'Soft shoulders, generous lines and a new ease: why tailoring is finding its way back into the everyday.', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=88', body: ['Tailoring once belonged to a particular kind of occasion. Now, its most interesting role is quieter: giving shape to an ordinary Tuesday, adding intention without ceremony.', 'Our new tailoring keeps the language of precision but lets the wearer decide how formal the sentence becomes.'] },
  '3': { title: 'Materials that move.', meta: 'Studio / 14.01.26', intro: 'A closer look at the textures, weights and natural movement behind the SS26 collection.', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1800&q=88', body: ['Material is the first thing the body understands. A dry cotton, a cool silk, a wool that holds its line but gives when you walk.', 'For SS26, we chose fabrics for this conversation with the body: how they fold, breathe, settle and become familiar over time.'] },
};

export function generateStaticParams() { return Object.keys(stories).map((slug) => ({ slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const story = stories[slug] || stories['1']; return { title: story.title, description: story.intro, alternates: { canonical: `/journal/${slug}` } }; }

export default async function JournalStory({ params }) { const { slug } = await params; const story = stories[slug] || stories['1']; return <article className="page-pad section-pad max-w-5xl">
  <p className="rise eyebrow text-[#837c70]">Journal / {story.meta}</p>
  <h1 className="rise serif mt-5 max-w-4xl text-6xl leading-[.92] md:text-9xl" style={{ animationDelay: '.1s' }}>{story.title}</h1>
  <p className="rise mt-8 max-w-md text-sm leading-6 text-[#837c70]" style={{ animationDelay: '.2s' }}>{story.intro}</p>
  <div className="image-wrap rise mt-16 aspect-[16/8] bg-[#dedbd5]" style={{ animationDelay: '.3s' }}><img src={story.image} alt={story.title} className="h-full w-full object-cover"/></div>
  <div className="rise mx-auto mt-16 max-w-2xl text-lg leading-8" style={{ animationDelay: '.4s' }}>{story.body.map((paragraph) => <p key={paragraph} className="mb-7">{paragraph}</p>)}<Link href="/journal" className="eyebrow link-underline mt-5 inline-block">Back to journal</Link></div>
</article> }
