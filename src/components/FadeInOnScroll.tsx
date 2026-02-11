import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
}

const FadeInOnScroll = ({ children, className = "" }: FadeInProps) => {
  const { ref, isVisible } = useScrollFadeIn();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;
