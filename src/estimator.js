/* eslint-disable object-shorthand */
const helpers = {
  impact(
    periodType,
    reportedCases,
    timeToElapse,
    totalHospitalBeds,
    avgDailyIncome,
    avgDailyIncomePop
  ) {
    const currentlyInfected = reportedCases * 10;
    const factor = Math.trunc(this.convertToDays(periodType, timeToElapse) / 3);
    const infectionsByReqTime = currentlyInfected * (2 ** factor);
    const severeCasesByRequestedTime = Math.trunc((15 / 100) * infectionsByReqTime);
    const hospitalBeds = Math.trunc((totalHospitalBeds * (35 / 100)) - severeCasesByRequestedTime);
    const casesForICUByRequestedTime = Math.trunc((5 / 100) * infectionsByReqTime);
    const casesForVentilatorsByRequestedTime = Math.trunc((2 / 100) * infectionsByReqTime);
    const dollars = Math.floor(
      (infectionsByReqTime * avgDailyIncomePop * avgDailyIncome) / this.convertToDays(
        periodType,
        timeToElapse
      )
    );

    return {
      currentlyInfected: currentlyInfected,
      infectionsByRequestedTime: infectionsByReqTime,
      severeCasesByRequestedTime: severeCasesByRequestedTime,
      hospitalBedsByRequestedTime: hospitalBeds,
      casesForICUByRequestedTime: casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime,
      dollarsInFlight: dollars
    };
  },

  severeImpact(
    periodType,
    reportedCases,
    timeToElapse,
    totalHospitalBeds,
    avgDailyIncome,
    avgDailyIncomePop
  ) {
    const currentlyInfected = reportedCases * 50;
    const factor = Math.trunc(this.convertToDays(periodType, timeToElapse) / 3);
    const infectionsByReqTime = currentlyInfected * (2 ** factor);
    const severeCasesByReqTime = Math.trunc((15 / 100) * infectionsByReqTime);
    const hospitalBeds = Math.trunc((totalHospitalBeds * (35 / 100)) - severeCasesByReqTime);
    const casesForICUByRequestedTime = Math.trunc((5 / 100) * infectionsByReqTime);
    const casesForVentilatorsByRequestedTime = Math.trunc((2 / 100) * infectionsByReqTime);
    const dollars = Math.floor(
      (infectionsByReqTime * avgDailyIncomePop * avgDailyIncome) / this.convertToDays(
        periodType,
        timeToElapse
      )
    );

    return {
      currentlyInfected: currentlyInfected,
      infectionsByRequestedTime: infectionsByReqTime,
      severeCasesByRequestedTime: severeCasesByReqTime,
      hospitalBedsByRequestedTime: hospitalBeds,
      casesForICUByRequestedTime: casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime,
      dollarsInFlight: dollars
    };
  },

  convertToDays(periodType, timeToElapse) {
    let days = timeToElapse;
    switch (periodType) {
      default:
        days = timeToElapse;
        break;
      case 'weeks':
        days = timeToElapse * 7;
        break;
      case 'months':
        days = timeToElapse * 30;
        break;
    }
    return days;
  }

//   convertToDays(periodType, timeToElapse) {
//     const type = periodType.toLowerCase();
//     const time = timeToElapse;
//     switch (type) {
//       case 'days':
//         return time;
//       case 'weeks':
//         return time * 7;
//       case 'months':
//         return time * 30;
//       default:
//         return time;
//     }
//   }
};

const covid19ImpactEstimator = (data) => ({
  data: data,
  impact: helpers.impact(
    data.periodType,
    data.reportedCases,
    data.timeToElapse,
    data.totalHospitalBeds,
    data.region.avgDailyIncomeInUSD,
    data.region.avgDailyIncomePopulation
  ),
  severeImpact: helpers.severeImpact(
    data.periodType,
    data.reportedCases,
    data.timeToElapse,
    data.totalHospitalBeds,
    data.region.avgDailyIncomeInUSD,
    data.region.avgDailyIncomePopulation
  )
});

// export default covid19ImpactEstimator;
module.exports = covid19ImpactEstimator;
