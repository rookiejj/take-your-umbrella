export function getCodeCategoryName(category) {
  switch (category) {
    case "T1H":
      return "기온";
    case "RN1":
      return "1시간 강수량";
    case "SKY":
      return "하늘상태";
    case "UUU":
      return "동서바람성분";
    case "VVV":
      return "남북바람성분";
    case "REH":
      return "습도";
    case "PTY":
      return "강수형태";
    case "LGT":
      return "낙뢰";
    case "VEC":
      return "풍향";
    case "WSD":
      return "풍속";
    default:
      return null;
  }
}
