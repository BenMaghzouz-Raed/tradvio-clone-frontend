import AnalysisForm from "./components/analysis-form";

// TODO: add form and form fields, validation schema
export default function Analyser() {
  return (
    <div className="flex flex-wrap gap-5 w-full justify-center">
      <AnalysisForm className="w-1/2" />
    </div>
  );
}
