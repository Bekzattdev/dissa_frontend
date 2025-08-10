import "./ProgressBar.css";

type ProgressBarProps = {
  currentStep: number;
  totalSteps?: number;
  className?: string;
};

const ProgressBar = ({ currentStep, totalSteps = 6 ,className=""}: ProgressBarProps) => {
  const progressPercent = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className="progress-container">
      <div
        className={`progress-bar  ${className}`}
        style={{ width: `${progressPercent}% ` }}
      />
    </div>
  );
};

export default ProgressBar;
