import { useState } from "react";
import "./App.css";
import TakeYourUmbrella from "./components/TakeYourUmbrella";

function App() {
  const [count, setCount] = useState(0);

  const onClickButton = () => {
    TakeYourUmbrella();
  };

  return (
    <>
      <div>
        <h1>우산 가져가!</h1>
        <section>
          <h4>현재 위치</h4>
          <div>
            <h4>경도 : </h4>
            <h4>위도 : </h4>
          </div>
        </section>
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
