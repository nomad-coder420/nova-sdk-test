import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useNova, useNovaExperience } from "nova-react-sdk";

const MyComponent = () => {
  const { objects } = useNovaExperience("onboarding");

  const tutorialFlow = objects?.["tutorial-flow"];

  return <p>{JSON.stringify(tutorialFlow)}</p>;
};

const App = () => {
  const { setUser, loadAllExperiences, trackEvent, state } = useNova();

  const [novaLoaded, setNovaLoaded] = useState(false);

  useEffect(() => {
    const appInit = async () => {
      await setUser({
        userId: "user78211qaqe2e1a1132",
        userProfile: { utm_source: "facebook" },
      });
    };

    appInit();
  }, []);

  useEffect(() => {
    const loadNovaExperiences = async () => {
      await loadAllExperiences();
      setNovaLoaded(true);
    };

    if (state.user) {
      loadNovaExperiences();
      trackEvent("Test Event", {
        test: "test",
      });
    }
  }, [state.user]);

  console.log(state.experiences);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {novaLoaded && <MyComponent />}
      </header>
    </div>
  );
};

export default App;
