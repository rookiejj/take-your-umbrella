import "./TakeYourUmbrella.css";

import React, { useState, useEffect } from "react";
import { getStringedDate } from "../util/get-stringed-date";
import { getCodeCategoryName } from "../util/code_category_name";
import { getStringedTime } from "../util/get-stringed-time";
import { getCalculateProbability } from "../util/calculate_probability";
import { getSkyStatusName } from "../util/sky_status_name";
import { getRainTypeName } from "../util/rain_type_name";

const TakeYourUmbrella = ({ rs }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState("");

  const baseDate = getStringedDate(new Date());
  const baseTime = getStringedTime(new Date());

  let queryParams =
    "?" +
    encodeURIComponent("serviceKey") +
    "=" +
    import.meta.env.VITE_SERVICE_KEY; /*Service Key*/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent("1000"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("dataType") +
    "=" +
    encodeURIComponent("json"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("base_date") +
    "=" +
    encodeURIComponent(`${baseDate}`); /**/
  queryParams +=
    "&" +
    encodeURIComponent("base_time") +
    "=" +
    encodeURIComponent(`${baseTime}`);
  queryParams +=
    "&" + encodeURIComponent("nx") + "=" + encodeURIComponent(`${rs.x}`); /**/
  queryParams +=
    "&" + encodeURIComponent("ny") + "=" + encodeURIComponent(`${rs.y}`); /**/

  // GET 요청 예제
  useEffect(() => {
    fetch(
      import.meta.env.VITE_END_POINT_URL +
        import.meta.env.VITE_ULTRA_SRT_FCST +
        queryParams
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">로딩중...</div>;
  if (error) return <div className="error">에러: {error}</div>;

  const conversionedData = data.response.body.items.item.map((item) => {
    const categoryName = getCodeCategoryName(item.category);

    return {
      ...item,
      categoryName: `${categoryName} (${item.category})`,
      category: `${item.category}`,
      baseDate: item.baseDate,
      baseTime: item.baseTime,
      time: item.fcstTime,
      value: item.fcstValue,
    };
  });

  const groupedAndFirstData = Object.values(
    conversionedData.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = item;
      }
      return acc;
    }, {})
  );

  const weatherData = {
    lgt: 0,
    pty: 0,
    rn1: "강수없음",
    sky: 0,
    t1h: 0,
    reh: 0,
    uuu: 0,
    vvv: 0,
    vec: 0,
    wsd: 0,
    time: 0,
  };

  const rawDate = groupedAndFirstData.map((item) => {
    switch (item.category.toLowerCase()) {
      case "lgt":
        weatherData.lgt = Number(item.value);
      case "pty":
        weatherData.pty = Number(item.value);
      case "rn1":
        weatherData.rn1 =
          item.value === "강수없음" ? "강수없음" : Number(item.value);
      case "sky":
        weatherData.sky = Number(item.value);
      case "t1h":
        weatherData.t1h = Number(item.value);
      case "reh":
        weatherData.reh = Number(item.value);
      case "uuu":
        weatherData.uuu = Number(item.value);
      case "vvv":
        weatherData.vvv = Number(item.value);
      case "vec":
        weatherData.vec = Number(item.value);
      case "wsd":
        weatherData.wsd = Number(item.value);
        weatherData.time = item.fcstTime;
      default:
        break;
    }
  });

  const precipitationProbability = getCalculateProbability(weatherData);

  return (
    <div className="take-your-umbrella">
      <h2 className="title">현재 날씨</h2>

      <div className="probability-card">
        <div className="icon">☂️</div>
        <div className="info">
          <span className="label">강수 확률</span>
          <span className="value">
            {(precipitationProbability * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="weather-grid">
        <WeatherCard
          icon="☀️"
          title="하늘 상태"
          value={getSkyStatusName(weatherData.sky)}
        />
        <WeatherCard
          icon="🌧️"
          title="강수 형태"
          value={getRainTypeName(weatherData.pty)}
        />
        <WeatherCard icon="🌡️" title="기온" value={`${weatherData.t1h}°C`} />
        <WeatherCard icon="💨" title="풍속" value={`${weatherData.wsd} m/s`} />
      </div>
    </div>
  );

  return (
    <div className="TakeYourUmbrella">
      <div className="probability">{`강수 확률: ${(
        precipitationProbability * 100
      ).toFixed(2)}%`}</div>

      {groupedAndFirstData.map((item) => {
        return (
          <div className="grouped_and_first_data">
            <div>{`${item.categoryName} : `}</div>
            <div>
              {item.category == "PTY"
                ? `${getRainTypeName(Number(item.value))}`
                : item.category == "SKY"
                ? `${getSkyStatusName(Number(item.value))}`
                : `${item.value}`}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const WeatherCard = ({ icon, title, value }) => (
  <div className="weather-card">
    <div className="icon">{icon}</div>
    <div className="info">
      <span className="label">{title}</span>
      <span className="value">{value}</span>
    </div>
  </div>
);

export default TakeYourUmbrella;
