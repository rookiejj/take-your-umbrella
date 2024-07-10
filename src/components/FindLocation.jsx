import { useEffect } from "react";
import { dfsXyConv } from "../util/dfs_xy_conv";

const FindLocation = () => {
  var options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    const rs = dfsXyConv("toXY", crd.latitude, crd.longitude);

    console.log(rs["x"], rs["y"]);
  }
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      <div>
        <section>
          <h4>현재 위치</h4>
          <div>
            <h4>경도 : </h4>
            <h4>위도 : </h4>
          </div>
        </section>
      </div>
    </>
  );
};

export default FindLocation;
