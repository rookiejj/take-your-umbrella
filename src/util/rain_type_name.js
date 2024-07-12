export function getRainTypeName(type) {
  switch (type) {
    case 0:
      return "없음";
    case 1:
      return "비";
    case 2:
      return "비/눈";
    case 3:
      return "눈";
    case 4:
      return "소나기";
    case 5:
      return "빗방울";
    case 6:
      return "빗방울눈날림";
    case 7:
      return "눈날림";
    default:
      return null;
  }
}
