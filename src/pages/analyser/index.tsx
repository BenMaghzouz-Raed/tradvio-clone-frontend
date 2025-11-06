import AnalysisForm from "./components/analysis-form";
import HowItWorks from "./components/how-it-works";

// TODO: add form and form fields, validation schema
export default function Analyser() {
  return (
    <div className="flex flex-wrap gap-5 w-full 2xl:justify-between justify-center">
      <HowItWorks />
      <AnalysisForm />
    </div>
  );
}
