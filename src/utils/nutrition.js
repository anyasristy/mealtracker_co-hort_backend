function toCm(heightFeet, heightInches) {
  const inchesTotal = Number(heightFeet) * 12 + Number(heightInches);
  return inchesTotal * 2.54;
}
function toKg(weightLbs) {
  return Number(weightLbs) * 0.45359237;
}
export function calculateTargets(profile) {
  const age = Number(profile.age);
  const heightFeet = Number(profile.heightFeet);
  const heightInches = Number(profile.heightInches);
  const weightLbs = Number(profile.weightLbs);
  const gender = String(profile.gender || "").toLowerCase();
  if (!age || (heightFeet === 0 && heightInches === 0) || !weightLbs || !gender) {
    return { calories: 2000, carbs: 250, protein: 120, fat: 70 };
  }
  const heightCm = toCm(heightFeet, heightInches);
  const weightKg = toKg(weightLbs);
  const bmrBase = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = gender === "male" ? bmrBase + 5 : bmrBase - 161;
  const calories = Math.round(bmr * 1.375);
  const carbs = Math.round((calories * 0.5) / 4);
  const protein = Math.round((calories * 0.25) / 4);
  const fat = Math.round((calories * 0.25) / 9);
  return { calories, carbs, protein, fat };
}
