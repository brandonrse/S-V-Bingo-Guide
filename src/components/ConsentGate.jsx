import { useConsent } from "../hooks/useConsent";
import "./ConsentGate.css";

export function ConsentGate({ children }) {
  const hasConsented = useConsent();

  if (!hasConsented) {
    return (
      <div className="ConsentGate">
        You need to consent to third party stuff first!
      </div>
    );
  }

  return children;
}
