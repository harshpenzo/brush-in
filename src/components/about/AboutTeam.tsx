import React from 'react';

interface AboutTeamProps {
  onSectionRef: (index: number, ref: HTMLDivElement | null) => void;
}

const AboutTeam = ({ onSectionRef }: AboutTeamProps) => {
  return (
    <div ref={(el) => onSectionRef(2, el)} className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Meet Our Founder</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Passionate about revolutionizing LinkedIn content creation through AI-powered solutions.
        </p>
      </div>

      <div className="flex justify-center max-w-5xl mx-auto">
        <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-2 shadow-lg max-w-md">
          <img 
            src="/lovable-uploads/b8e604ac-f3db-4533-aced-9c52956891a7.png"
            alt="Harsh Batheja - Founder & CEO"
            width={160}
            height={160}
            className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-sky-500/30"
            loading="lazy"
            decoding="async"
          />
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Harsh Batheja</h3>
          <p className="text-sky-500 mb-4 font-medium">Founder & CEO</p>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Visionary entrepreneur with expertise in AI and content strategy. Dedicated to empowering professionals with cutting-edge tools for LinkedIn success and meaningful professional networking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutTeam;