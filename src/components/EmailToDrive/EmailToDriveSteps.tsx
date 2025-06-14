
import { CheckCircle } from 'lucide-react';

interface EmailToDriveStepsProps {
  currentStep: 'config' | 'connect' | 'complete';
}

const EmailToDriveSteps = ({ currentStep }: EmailToDriveStepsProps) => {
  return (
    <div className="flex items-center justify-center max-w-md mx-auto mb-8">
      <div className="flex items-center w-full">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentStep === 'config' ? 'bg-primary text-primary-foreground' : 'bg-green-500 text-white'
        }`}>
          {currentStep === 'config' ? '1' : <CheckCircle className="w-4 h-4" />}
        </div>
        <div className={`flex-1 h-0.5 mx-2 ${
          ['connect', 'complete'].includes(currentStep) ? 'bg-green-500' : 'bg-border'
        }`} />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentStep === 'connect' ? 'bg-primary text-primary-foreground' : 
          currentStep === 'complete' ? 'bg-green-500 text-white' : 'bg-border text-muted-foreground'
        }`}>
          {currentStep === 'complete' ? <CheckCircle className="w-4 h-4" /> : '2'}
        </div>
        <div className={`flex-1 h-0.5 mx-2 ${
          currentStep === 'complete' ? 'bg-green-500' : 'bg-border'
        }`} />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentStep === 'complete' ? 'bg-primary text-primary-foreground' : 'bg-border text-muted-foreground'
        }`}>
          3
        </div>
      </div>
    </div>
  );
};

export default EmailToDriveSteps;
