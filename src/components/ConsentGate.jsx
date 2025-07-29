import { useConsent } from "../hooks/useConsent";
import "./ConsentGate.css";
import * as Consent from "vanilla-cookieconsent";

export function ConsentGate({ children }) {
  const hasConsented = useConsent();

  if (!hasConsented) {
    return (
      <div className="ConsentGate">
        <h2>Third Party Content</h2>
        <p>
          You can't view this third party content because of your{" "}
          <a href="#" data-cc="show-preferencesModal">
            Cookie Settings
          </a>
          .
        </p>
        <button
          onClick={() => {
            Consent.acceptCategory("thirdPartyContent");
          }}
        >
          Accept Third Party Content cookies
        </button>
        <aside>
          This website may offer content or functionalities that are provided by
          third-party providers on their own responsibility. These third-party
          providers may set their own cookies, e.g. to track user activity or to
          personalize and optimize their offers.
        </aside>
      </div>
    );
  }

  return children;
}
