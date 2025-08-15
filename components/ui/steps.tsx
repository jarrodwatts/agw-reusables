import * as React from "react";
import { cn } from "@/lib/utils";

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

interface StepProps {
  step: number;
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
  className?: string;
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, children, ...props }, ref) => {
    const stepCount = React.Children.count(children);

    return (
      <div ref={ref} className={cn("space-y-0", className)} {...props}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === Step) {
            return React.cloneElement(child as React.ReactElement<StepProps>, {
              isLast: index === stepCount - 1,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
Steps.displayName = "Steps";

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ step, title, children, isLast = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative flex gap-4 min-h-0", className)}
        {...props}
      >
        {/* Step number and line */}
        <div className="flex flex-col items-center relative">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
            {step}
          </div>
          {!isLast && (
            <div className="w-px bg-border absolute top-10 bottom-2" />
          )}
          {isLast && (
            <div className="w-px absolute top-10 bottom-0 bg-gradient-to-b from-border to-transparent" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-8 min-w-0">
          <h3 className="font-semibold text-lg mb-3">{title}</h3>
          <div className="text-muted-foreground space-y-4 min-w-0">{children}</div>
        </div>
      </div>
    );
  }
);
Step.displayName = "Step";

export { Steps, Step };
