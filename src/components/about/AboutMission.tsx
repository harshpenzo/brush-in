
interface AboutMissionProps {
  onSectionRef: (index: number, ref: HTMLDivElement | null) => void;
}

const AboutMission = ({ onSectionRef }: AboutMissionProps) => {
  return (
    <div 
      ref={(el) => onSectionRef(1, el)} 
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          In today's fast-paced professional world, maintaining an active LinkedIn presence is 
          crucial for career growth and networking. However, creating compelling content consistently 
          can be time-consuming and challenging.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          We built Brushin to democratize content creation on LinkedIn, leveraging the power of AI 
          to help professionals of all writing abilities share their expertise, insights, and 
          experiences effectively.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Our goal is to remove the barriers to consistent professional communication, helping 
          you build your personal brand and expand your network without sacrificing your valuable time.
        </p>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="flex flex-col space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">We believe:</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-sky-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <p className="text-slate-600 dark:text-slate-300">Everyone has valuable professional insights worth sharing</p>
              </li>
              <li className="flex items-start">
                <span className="bg-sky-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <p className="text-slate-600 dark:text-slate-300">Technology should enhance human creativity, not replace it</p>
              </li>
              <li className="flex items-start">
                <span className="bg-sky-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <p className="text-slate-600 dark:text-slate-300">Professional communication should be accessible to everyone</p>
              </li>
              <li className="flex items-start">
                <span className="bg-sky-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <p className="text-slate-600 dark:text-slate-300">Your time is better spent on what you do best</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMission;
