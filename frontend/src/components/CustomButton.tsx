import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const CustomButton = ({ title }: { title: string }) => {
  return (
    <Link to="/contact" className="group relative inline-block">
      {/* Glow layer */}
      <span className="absolute inset-0 rounded-xl bg-primary opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500"></span>

      {/* Animated border */}
      <span className="absolute inset-0 rounded-xl p-[2px] animated-border">
        <span className="block h-full w-full rounded-xl bg-white"></span>
      </span>

      {/* Button */}
      <Button
        variant="outline"
        className="relative z-10 overflow-hidden px-10 p-6 text-primary border border-primary bg-white text-[1rem] rounded-xl font-semibold tracking-wide transition-all duration-300 group-hover:text-white group-hover:-translate-y-1 group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]"
      >
        <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
        <span className="relative flex items-center gap-3">
          {title}
          <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </span>
      </Button>
    </Link>
  );
};

export default CustomButton;
