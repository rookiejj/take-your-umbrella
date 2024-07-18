export function getSkyStatusName(sky) {
  switch (sky) {
    case 1:
      return "맑음";
    case 3:
      return "구름많음";
    case 4:
      return "흐림";
    default:
      return null;
  }
}
