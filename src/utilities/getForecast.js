export const getForecast = (data) => {
  const dailyTemperatures = {};

  data.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0]; // Extracting date from the datetime string
    if (!dailyTemperatures[date]) {
      dailyTemperatures[date] = {
        highestTemp: -Infinity,
        lowestTemp: Infinity,
        dt_txt: date,
        condition: entry.weather[0].main,
      };
    }

    // Update highest and lowest temperatures for the day
    const temp = entry.main.temp;
    if (temp > dailyTemperatures[date].highestTemp) {
      dailyTemperatures[date].highestTemp = temp;
    }
    if (temp < dailyTemperatures[date].lowestTemp) {
      dailyTemperatures[date].lowestTemp = temp;
    }
  });
  const forecast = Object.values(dailyTemperatures);
  return forecast;
};
