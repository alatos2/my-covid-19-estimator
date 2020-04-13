/* eslint-disable object-shorthand */
const getDays = (period, periodType) => {
  let days = periodType;
  switch (periodType) {
    case 'days':
      days = period;
      break;
    case 'months':
      days = period * 30;
      break;
    case 'weeks':
      days = period * 7;
      break;
    default:
      days = period;
      break;
  }
  return days;
};

const availableBeds = (totalBeds, patients) => {
  const available = totalBeds * 0.35;
  const hospitalBeds = available - patients;
  return hospitalBeds;
};

const covid19ImpactEstimator = (data) => {
  const currentlyInfected = data.reportedCases * 10;

  const currentlyInfectedSevere = data.reportedCases * 50;

  const factor = Math.trunc(getDays(data.timeToElapse, data.periodType) / 3);

  const infectionsByRequestedTime = Math.trunc(currentlyInfected * (2 ** factor));


  const infectionsByRequestedTimeSevere = Math.trunc(currentlyInfectedSevere * (2 ** factor));
  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);
  const severeCasesByRequestedTimeSevere = Math.trunc(infectionsByRequestedTimeSevere * 0.15);
  const hospitalBedsByRequestedTime = Math.trunc(
    availableBeds(data.totalHospitalBeds, severeCasesByRequestedTime)
  );
  const hospitalBedsByRequestedTimeSevere = Math.trunc(
    availableBeds(data.totalHospitalBeds, severeCasesByRequestedTimeSevere)
  );
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);
  const casesForICUByRequestedTimeSevere = Math.trunc(infectionsByRequestedTimeSevere * 0.05);
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.02);
  const casesForVentilatorsByReqTimeSevere = Math.trunc(infectionsByRequestedTimeSevere * 0.02);
  const dollarsInFlight = Math.trunc(
    (
      infectionsByRequestedTime
      * data.region.avgDailyIncomePopulation
      * data.region.avgDailyIncomeInUSD
    ) / getDays(
      data.timeToElapse, data.periodType
    )
  );
  const dollarsInFlightSevere = Math.trunc((
    infectionsByRequestedTimeSevere
    * data.region.avgDailyIncomePopulation
    * data.region.avgDailyIncomeInUSD) / getDays(data.timeToElapse, data.periodType));

  const outputData = {
    data: data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight

    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere,
      infectionsByRequestedTime: infectionsByRequestedTimeSevere,
      severeCasesByRequestedTime: severeCasesByRequestedTimeSevere,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevere,
      casesForICUByRequestedTime: casesForICUByRequestedTimeSevere,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByReqTimeSevere,
      dollarsInFlight: dollarsInFlightSevere
    }
  };
  return outputData;
};


module.exports = covid19ImpactEstimator;
