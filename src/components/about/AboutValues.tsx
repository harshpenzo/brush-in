
interface AboutValuesProps {
  onSectionRef: (index: number, ref: HTMLDivElement | null) => void;
}

const AboutValues = ({ onSectionRef }: AboutValuesProps) => {
  return (
    <div ref={(el) => onSectionRef(3, el)} className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Core Values</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          These principles guide everything we do at Brushin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-2 shadow-lg">
          <div className="w-12 h-12 bg-sky-500/20 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Innovation</h3>
          <p className="text-slate-600 dark:text-slate-300">
            We continuously explore new ways to leverage AI to enhance professional communication.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-2 shadow-lg">
          <div className="w-12 h-12 bg-sky-500/20 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Inclusivity</h3>
          <p className="text-slate-600 dark:text-slate-300">
            We build tools that empower professionals across all industries and experience levels.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-2 shadow-lg">
          <div className="w-12 h-12 bg-sky-500/20 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Integrity</h3>
          <p className="text-slate-600 dark:text-slate-300">
            We prioritize privacy, transparency, and ethical AI use in everything we build.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-2 shadow-lg">
          <div className="w-12 h-12 bg-sky-500/20 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Excellence</h3>
          <p className="text-slate-600 dark:text-slate-300">
            We strive for the highest quality in our content generation and user experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutValues;
