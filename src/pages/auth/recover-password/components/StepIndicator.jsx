export const StepIndicator = ({ currentStep }) => {
  const steps = ['email', 'code', 'password', 'success']
  const currentIndex = steps.indexOf(currentStep)

  return (
    <div className="flex items-center gap-3">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            index <= currentIndex ? 'w-16 bg-primary' : 'w-8 bg-border'
          }`}
        />
      ))}
    </div>
  )
}
