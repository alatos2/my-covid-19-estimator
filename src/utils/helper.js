/* eslint-disable object-shorthand */
const helpers = {
  impact(reportedCases, timeToElapse, totalHospitalBeds, avgDailyIncomeInUSD) {
    const currentlyInfected = reportedCases * 10;
    const factor = Math.floor(timeToElapse / 3);
    const infectionsByRequestedTime = currentlyInfected * (2 ** factor);
    const severeCasesByRequestedTime = (15 / 100) * infectionsByRequestedTime;
    const hospitalBedsByRequestedTime = Math.floor((totalHospitalBeds * (35 / 100)) - severeCasesByRequestedTime);
    const casesForICUByRequestedTime = (5 / 100) * infectionsByRequestedTime;
    const casesForVentilatorsByRequestedTime = (2 / 100) * infectionsByRequestedTime;
    const dollarsInFlight = (infectionsByRequestedTime * 0.65 * avgDailyIncomeInUSD) * timeToElapse;

    return {
      currentlyInfected: currentlyInfected,
      infectionsByRequestedTime: infectionsByRequestedTime,
      severeCasesByRequestedTime: severeCasesByRequestedTime,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTime,
      casesForICUByRequestedTime: casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime,
      dollarsInFlight: dollarsInFlight
    };
  },

  severeImpact() {
  }
};

// const impact = (reportedCases, timeToElapse, totalHospitalBeds, avgDailyIncomeInUSD) => {
//   const currentlyInfected = reportedCases * 10;
//   const factor = Math.floor(timeToElapse / 3);
//   const infectionsByRequestedTime = currentlyInfected * (2 ** factor);
//   const severeCasesByRequestedTime = (15 / 100) * infectionsByRequestedTime;
//   const hospitalBedsByRequestedTime = Math.floor((totalHospitalBeds * (35 / 100)) - severeCasesByRequestedTime);
//   const casesForICUByRequestedTime = (5 / 100) * infectionsByRequestedTime;
//   const casesForVentilatorsByRequestedTime = (2 / 100) * infectionsByRequestedTime;
//   const dollarsInFlight = (infectionsByRequestedTime * 0.65 * avgDailyIncomeInUSD) * timeToElapse;

//   return {
//     currentlyInfected: currentlyInfected,
//     infectionsByRequestedTime: infectionsByRequestedTime,
//     severeCasesByRequestedTime: severeCasesByRequestedTime,
//     hospitalBedsByRequestedTime: hospitalBedsByRequestedTime,
//     casesForICUByRequestedTime: casesForICUByRequestedTime,
//     casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime,
//     dollarsInFlight: dollarsInFlight
//   };
// };

// const helpers = { impact };

// export default helpers;
module.exports = helpers;
