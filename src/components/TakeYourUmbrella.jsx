import "./TakeYourUmbrella.css";

import React, { useState, useEffect } from "react";
import { getStringedDate } from "../util/get-stringed-date";
import { getCodeCategoryName } from "../util/code_category_name";
import { getStringedTime } from "../util/get-stringed-time";
import { calculatePrecipitationProbability } from "../util/calculate_precipitation_probability";

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

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error}</div>;

  const value = data.response.body.items.item.map((item) => {
    const categoryName = getCodeCategoryName(item.category);

    return {
      categoryName: `${categoryName} (${item.category})`,
      category: `${item.category}`,
      baseDate: item.baseDate,
      baseTime: item.baseTime,
      time: item.fcstTime,
      value: item.fcstValue,
    };
  });

  const groupedAndFirstData = Object.values(
    value.reduce((acc, item) => {
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
  };

  const rawDate = groupedAndFirstData.map((item) => {
    switch (item.category.toLowerCase()) {
      case "lgt":
        weatherData.lgt = item.value;
      case "pty":
        weatherData.pty = item.value;
      case "rn1":
        weatherData.rn1 = item.value;
      case "sky":
        weatherData.sky = item.value;
      case "t1h":
        weatherData.t1h = item.value;
      case "reh":
        weatherData.reh = item.value;
      case "uuu":
        weatherData.uuu = item.value;
      case "vvv":
        weatherData.vvv = item.value;
      case "vec":
        weatherData.vec = item.value;
      case "wsd":
        weatherData.wsd = item.value;
      default:
        break;
    }
  });

  const precipitationProbability =
    calculatePrecipitationProbability(weatherData);

  return (
    <div className="TakeYourUmbrella">
      <div className="probability">{`강수 확률: ${(
        precipitationProbability * 100
      ).toFixed(2)}%`}</div>

      {groupedAndFirstData.map((item) => {
        return (
          <div className="grouped_and_first_data">
            <div>{`${item.categoryName} : `}</div>
            <div>{`${item.value}`}</div>
          </div>
        );
      })}
      {/* <div>{JSON.stringify(groupedAndFirstData)}</div> */}
      {/* <div>{JSON.stringify(data, null, 2)}</div> */}
    </div>
  );
};

export default TakeYourUmbrella;
