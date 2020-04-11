/* eslint-disable object-shorthand */
const helpers = {
  impact(reportedCases, timeToElapse, totalHospitalBeds, avgDailyIncome, avgDailyIncomePop) {
    const currentlyInfected = reportedCases * 10;
    const factor = Math.floor(timeToElapse / 3);
    const infectionsByReqTime = currentlyInfected * (2 ** factor);
    const severeCasesByRequestedTime = Math.floor((15 / 100) * infectionsByReqTime);
    const hospitalBeds = Math.floor((totalHospitalBeds * (35 / 100)) - severeCasesByRequestedTime);
    const casesForICUByRequestedTime = Math.floor((5 / 100) * infectionsByReqTime);
    const casesForVentilatorsByRequestedTime = Math.floor((2 / 100) * infectionsByReqTime);
    const dollars = Math.floor(
      (infectionsByReqTime * avgDailyIncomePop * avgDailyIncome) * timeToElapse
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

  severeImpact(reportedCases, timeToElapse, totalHospitalBeds, avgDailyIncome, avgDailyIncomePop) {
    const currentlyInfected = reportedCases * 50;
    const factor = Math.floor(timeToElapse / 3);
    const infectionsByReqTime = currentlyInfected * (2 ** factor);
    const severeCasesByReqTime = Math.floor((15 / 100) * infectionsByReqTime);
    const hospitalBeds = Math.floor((totalHospitalBeds * (35 / 100)) - severeCasesByReqTime);
    const casesForICUByRequestedTime = Math.floor((5 / 100) * infectionsByReqTime);
    const casesForVentilatorsByRequestedTime = Math.floor((2 / 100) * infectionsByReqTime);
    const dollars = Math.floor(
      (infectionsByReqTime * avgDailyIncomePop * avgDailyIncome) * timeToElapse
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
  }
};

const covid19ImpactEstimator = (data) => ({
  data: data,
  impact: helpers.impact(
    data.reportedCases,
    data.timeToElapse,
    data.totalHospitalBeds,
    data.region.avgDailyIncomeInUSD,
    data.region.avgDailyIncomePopulation
  ),
  severeImpact: helpers.severeImpact(
    data.reportedCases,
    data.timeToElapse,
    data.totalHospitalBeds,
    data.region.avgDailyIncomeInUSD,
    data.region.avgDailyIncomePopulation
  )
});

// export default covid19ImpactEstimator;
module.exports = covid19ImpactEstimator;
