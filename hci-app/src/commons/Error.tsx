import React from "react";
import SomethingWentWrongImg from "../assets/Something_Went_Wrong.png";

interface ComponentProps {
  errorMessage?: string;
  status?: number;
}

const Error: React.FC<ComponentProps> = ({ errorMessage, status }) => {
  return (
    <div className="fixed top-0 left-0 z-50 block w-full h-screen bg-[#F4511E]">
      <div className="flex flex-col items-center justify-center h-full">
        <img
          className="lg:w-[20%] w-[70%]"
          src={SomethingWentWrongImg}
          alt="loading-icon"
        />
        <h2 className="text-2xl text-white lg:text-3xl">
          Something went wrong
        </h2>
        <button
          onClick={() => window.location.replace("/")}
          className="px-4 py-2 mt-4 text-white border border-white rounded-sm"
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default Error;

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Error />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
