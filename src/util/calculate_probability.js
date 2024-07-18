/**
 * 기상 데이터를 기반으로 강수 확률을 계산하는 함수
 * @param {Object} weatherData - 기상 데이터 객체
 * @param {number} weatherData.lgt - 낙뢰 (0 또는 1)
 * @param {number} weatherData.pty - 강수형태 (0: 없음, 1: 비, 2: 비/눈, 3: 눈, 4: 소나기)
 * @param {number|string} weatherData.rn1 - 1시간 강수량 (mm 또는 '강수없음')
 * @param {number} weatherData.sky - 하늘상태 (1: 맑음, 2: 구름조금, 3: 구름많음, 4: 흐림)
 * @param {number} weatherData.t1h - 기온 (°C)
 * @param {number} weatherData.reh - 습도 (%)
 * @param {number} weatherData.uuu - 동서바람성분 (m/s)
 * @param {number} weatherData.vvv - 남북바람성분 (m/s)
 * @param {number} weatherData.vec - 풍향 (degree)
 * @param {number} weatherData.wsd - 풍속 (m/s)
 * @returns {number} 강수 확률 (0에서 1 사이의 값)
 */
export function getCalculateProbability(weatherData) {
  let probability = 0;

  // 강수형태가 0이 아니면 강수 확률 높임
  if (weatherData.pty !== 0) {
    // probability += 0.5;
    probability += 1.0;
    // 확률이 1을 넘지 않도록 조정
    return Math.min(probability, 1);
  }

  // 1시간 강수량이 있으면 강수 확률 높임
  if (weatherData.rn1 !== "강수없음" && parseFloat(weatherData.rn1) > 0) {
    probability += 0.3;
  }

  // 하늘상태가 흐리면 강수 확률 높임
  if (weatherData.sky === 4) {
    probability += 0.1;
  } else if (weatherData.sky === 3) {
    probability += 0.05;
  }

  // 습도가 높으면 강수 확률 높임
  if (weatherData.reh > 70) {
    probability += 0.1;
  }

  // 낙뢰가 있으면 강수 확률 높임
  if (weatherData.lgt === 1) {
    probability += 0.2;
  }

  // 풍속이 강하면 강수 확률 약간 높임
  if (weatherData.wsd > 5) {
    probability += 0.05;
  }

  // 확률이 1을 넘지 않도록 조정
  return Math.min(probability, 1);
}

// 사용 예시
const weatherData = {
  lgt: 0,
  pty: 0,
  rn1: "강수없음",
  sky: 4,
  t1h: 29,
  reh: 60,
  uuu: 0.2,
  vvv: 0.5,
  vec: 205,
  wsd: 1,
};

const precipitationProbability = getCalculateProbability(weatherData);
console.log(`강수 확률: ${(precipitationProbability * 100).toFixed(2)}%`);
