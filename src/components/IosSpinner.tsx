import { cn } from "@/lib/utils";

interface IosSpinnerProps {
  className?: string;
}

const IosSpinner = ({ className }: IosSpinnerProps) => (
  <span className={cn("inline-block relative", className)} aria-label="Loading">
    <style>{`
      @keyframes ios-fade {
        0%   { opacity: 1; }
        100% { opacity: 0.15; }
      }
      .ios-blade {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        animation: ios-fade 1s linear infinite;
      }
      .ios-blade::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 15%;
        height: 35%;
        background: currentColor;
        border-radius: 999px;
      }
    `}</style>
    {Array.from({ length: 12 }).map((_, i) => (
      <span
        key={i}
        className="ios-blade"
        style={{
          transform: `rotate(${i * 30}deg)`,
          animationDelay: `${-((12 - i) / 12).toFixed(3)}s`,
        }}
      />
    ))}
  </span>
);

export default IosSpinner;
