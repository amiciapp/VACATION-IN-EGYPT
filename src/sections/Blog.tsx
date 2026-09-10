import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { blogPosts } from '@/data/trips';
import { Calendar, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export default function Blog() {
  const { t } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="relative section-padding z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-bold text-xs uppercase tracking-wider mb-4 shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curated Travel Journals</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
            {t('blog.title')}
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Marquee Slider */}
        <div className="relative w-full overflow-hidden pause-on-hover pt-4 pb-8">
          <div className="flex w-max animate-slide-marquee">
            {[...Array(2)].map((_, arrayIndex) => (
              <div key={arrayIndex} className="flex gap-7 pr-7">
                {blogPosts.map((post) => (
                  <article
                    key={post.id}
                    className="w-[360px] md:w-[420px] shrink-0 group relative rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 hover:border-teal-400/50 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_45px_-10px_rgba(20,184,166,0.3)] flex flex-col justify-between"
                  >
                    {/* Top Animated Color Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-20" />

                    <div>
                      {/* Image Stage */}
                      <div className="relative h-60 overflow-hidden bg-slate-950">
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          width={400}
                          height={240}
                          className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                        
                        {/* Shimmer sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-teal-500/90 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-white shadow-lg flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-7">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-3">
                          <Calendar className="w-3.5 h-3.5 text-teal-400" />
                          <span>{post.date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-6 font-normal">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-7 pb-7 pt-0">
                      <button 
                        onClick={() => {
                          const number = '201131312402';
                          const msg = encodeURIComponent(`Hello VACATION IN EGYPT! 🇪🇬\n\nI was reading your travel insight: *"${post.title}"* and would love expert recommendations for planning this journey.`);
                          window.open(`https://wa.me/${number}?text=${msg}`, '_blank');
                        }}
                        className="inline-flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider group/btn hover:text-white transition-colors cursor-pointer"
                      >
                        <span>{t('blog.readMore')}</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>

          {/* Fade Edges */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
