import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { blogPosts } from '@/data/trips';
import { Calendar, ArrowRight } from 'lucide-react';

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
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#0d1b2a]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a] via-[#112240] to-[#0d1b2a]" />

      <div className="relative section-padding">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('blog.title')}</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">{t('blog.subtitle')}</p>
        </div>

        <div className="relative w-full overflow-hidden pause-on-hover pt-8 pb-12">
          <div className="flex w-max animate-slide-marquee">
            {[...Array(2)].map((_, arrayIndex) => (
              <div key={arrayIndex} className="flex gap-6 pr-6">
                {blogPosts.map((post) => (
                  <article
                    key={post.id}
                    className="w-[350px] md:w-[400px] shrink-0 group bg-[#1a2d45] overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(16,172,132,0.3)] border border-white/10 hover:border-turquoise/40"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        width={400}
                        height={224}
                        className="w-full h-full object-cover group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2d45] to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-turquoise/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-white/50 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-turquoise transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-white/60 text-sm mb-5 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                      <button className="flex items-center gap-2 text-turquoise text-sm font-semibold group/btn">
                        {t('blog.readMore')}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>

          {/* Fade Edges */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#0d1b2a] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#0d1b2a] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
