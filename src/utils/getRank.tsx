export const getRank = (accuracy: number): "C" | "B" | "A" | "S" => {
  if (accuracy < 50.0) {
    return "C";
  } else if (accuracy < 75.0) {
    return "B";
  } else if (accuracy < 90.0) {
    return "A";
  } else {
    return "S";
  }
};
