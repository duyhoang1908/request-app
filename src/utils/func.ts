export const converTimeStamp = (date: number) => {
  let milisecondsSum = Date.now() - date;

  let seconds = 1000;
  let minutes = 1000 * 60;
  let hours = 1000 * 60 * 60;
  let days = 1000 * 60 * 60 * 24;
  let months = 1000 * 60 * 60 * 24 * 30;
  let years = 1000 * 60 * 60 * 24 * 30 * 12;

  if (milisecondsSum < minutes) {
    return Math.floor(milisecondsSum / seconds) + " giây";
  } else if (milisecondsSum < hours) {
    return Math.floor(milisecondsSum / minutes) + " phút";
  } else if (milisecondsSum < days) {
    return Math.floor(milisecondsSum / hours) + " giờ";
  } else if (milisecondsSum < months) {
    return Math.floor(milisecondsSum / days) + " ngày";
  } else if (milisecondsSum < years) {
    return Math.floor(milisecondsSum / months) + " tháng";
  } else {
    return Math.floor(milisecondsSum / years) + " năm";
  }
};

export const newUserData = (
  email: string,
  name: string,
  department: string,
  uid: string
) => {
  return {
    email,
    name,
    role: "staff",
    department,
    uid,
    createAt: Date.now(),
  };
};
