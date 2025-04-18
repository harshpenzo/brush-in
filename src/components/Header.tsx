
import { Linkedin } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Linkedin size={28} />
          <h1 className="text-xl font-bold">LinkedIn Post Generator</h1>
        </div>
        <div className="text-sm">Create engaging posts that drive results</div>
      </div>
    </header>
  );
};

export default Header;
