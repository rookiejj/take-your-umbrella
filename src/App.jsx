import { useState } from "react";
import "./App.css";
import TakeYourUmbrella from "./components/TakeYourUmbrella";
import FindLocation from "./components/FindLocation";

function App() {
  const [count, setCount] = useState(0);

  const onClickButton = () => {
    TakeYourUmbrella();
  };

  return (
    <>
      <div>
        <h1>우산 가져가!</h1>
        <FindLocation />
        {/* <button onClick={onClickButton}>Request API</button> */}
        <section>
          <TakeYourUmbrella />
        </section>
        <section>
          <textarea />
        </section>
      </div>
    </>
  );
}

export default App;
