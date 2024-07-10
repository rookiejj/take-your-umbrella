import React, { useState, useEffect } from "react";

const TakeYourUmbrella = ({ rs }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState("");

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
    encodeURIComponent("20240711"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("base_time") +
    "=" +
    encodeURIComponent("0030"); /**/
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

  // POST 요청 예제
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   fetch("https://jsonplaceholder.typicode.com/posts", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       title: postData,
  //       body: postData,
  //       userId: 1,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log("POST 응답:", json);
  //       alert("데이터가 성공적으로 전송되었습니다!");
  //     })
  //     .catch((error) => {
  //       console.error("에러:", error);
  //       alert("데이터 전송 중 오류가 발생했습니다.");
  //     });
  // };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div>
      <h2>GET 요청 결과:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      {/* <h2>POST 요청 보내기:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={postData}
          onChange={(e) => setPostData(e.target.value)}
          placeholder="전송할 데이터 입력"
        />
        <button type="submit">데이터 전송</button>
      </form> */}
    </div>
  );
};

export default TakeYourUmbrella;
