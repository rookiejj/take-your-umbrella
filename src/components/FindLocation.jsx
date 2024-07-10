import { useEffect, useState } from "react";
import { dfsXyConv } from "../util/dfs_xy_conv";
import TakeYourUmbrella from "./TakeYourUmbrella";

const FindLocation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [rs, setRs] = useState({});
  const [error, setError] = useState(null);

  let options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };

  const success = (position) => {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
    const convertedLocation = dfsXyConv("toXY", latitude, longitude);
    setRs(convertedLocation);
    setIsLoading(false);
  };

  const handleError = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    setError(`위치 정보를 가져오는데 실패했습니다: ${err.message}`);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setIsLoading(false);
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            success,
            handleError,
            options
          );
        } else if (result.state === "denied") {
          setError(
            "위치 정보 접근이 거부되었습니다. 설정에서 권한을 허용해주세요."
          );
          setIsLoading(false);
        }
      })
      .catch(handleError);
  }, []);

  return (
    <div>
      <section>
        <h4>현재 위치</h4>
        {isLoading && <p>위치 정보를 가져오는 중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {location && (
          <div>
            <h4>경도: {location.latitude}</h4>
            <h4>위도: {location.longitude}</h4>
            <h4>변환된 X 좌표: {rs.x}</h4>
            <h4>변환된 Y 좌표: {rs.y}</h4>
          </div>
        )}
      </section>
      {!isLoading && !error && rs && (
        <section>
          <TakeYourUmbrella rs={rs} />
        </section>
      )}
    </div>
  );
};

export default FindLocation;
