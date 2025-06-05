
interface AboutTeamProps {
  onSectionRef: (index: number, ref: HTMLDivElement | null) => void;
}

const AboutTeam = ({ onSectionRef }: AboutTeamProps) => {
  return (
    <div ref={(el) => onSectionRef(2, el)} className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Meet Our Team</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          We're a dedicated group of professionals passionate about helping others succeed on LinkedIn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="text-center bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-2 shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
            alt="Alex Morgan"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-sky-500/30"
          />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Alex Morgan</h3>
          <p className="text-sky-500 mb-2">Founder & CEO</p>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xs mx-auto">
            Former LinkedIn content strategist with 10+ years of experience in professional networking.
          </p>
        </div>
        <div className="text-center bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-2 shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
            alt="Taylor Chen"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-sky-500/30"
          />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Taylor Chen</h3>
          <p className="text-sky-500 mb-2">CTO</p>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xs mx-auto">
            AI specialist with expertise in natural language processing and content generation.
          </p>
        </div>
        <div className="text-center bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-2 shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
            alt="Jordan Lee"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-sky-500/30"
          />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Jordan Lee</h3>
          <p className="text-sky-500 mb-2">Head of Product</p>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xs mx-auto">
            Product strategist focused on creating intuitive tools for professional development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutTeam;
