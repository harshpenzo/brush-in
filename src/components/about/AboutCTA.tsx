
import { Button } from "@/components/ui/button";

interface AboutCTAProps {
  onSectionRef: (index: number, ref: HTMLDivElement | null) => void;
}

const AboutCTA = ({ onSectionRef }: AboutCTAProps) => {
  return (
    <section 
      ref={(el) => onSectionRef(4, el)} 
      className="text-center bg-white dark:bg-slate-800 rounded-2xl p-10 max-w-4xl mx-auto border border-slate-200 dark:border-slate-700 shadow-lg"
      aria-labelledby="cta-heading"
    >
      <h2 id="cta-heading" className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
        Ready to create viral LinkedIn content with AI?
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
        Join thousands of professionals who are saving time and getting better results with Brushin - 
        the best AI LinkedIn post generator. Create engaging content that drives real engagement!
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-white" asChild>
          <a href="/" aria-label="Start creating LinkedIn posts with Brushin AI">Try Brushin AI Free</a>
        </Button>
        <Button size="lg" variant="outline" className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700" asChild>
          <a href="/testimonials" aria-label="Read success stories from LinkedIn content creators">Read Success Stories</a>
        </Button>
      </div>
    </section>
  );
};

export default AboutCTA;
