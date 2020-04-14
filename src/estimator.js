/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
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

const covid19ImpactEstimator = ({
  region = {
    name: 'Africa',
    avgAge: '19.7',
    avgDailyIncomeInUSD: '5',
    avgDailyIncomePopulation: '0.71'
  },
  periodType = 'days',
  timeToElapse = 28,
  reportedCases = 254,
  population = 66622705,
  totalHospitalBeds = 1380614
}) => {
  const currentlyInfected = reportedCases * 10;

  const currentlyInfectedSevere = reportedCases * 50;

  const factor = Math.trunc(getDays(timeToElapse, periodType) / 3);

  const infectionsByRequestedTime = Math.trunc(currentlyInfected * (2 ** factor));


  const infectionsByRequestedTimeSevere = Math.trunc(currentlyInfectedSevere * (2 ** factor));
  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);
  const severeCasesByRequestedTimeSevere = Math.trunc(infectionsByRequestedTimeSevere * 0.15);
  const hospitalBedsByRequestedTime = Math.trunc(
    availableBeds(totalHospitalBeds, severeCasesByRequestedTime)
  );
  const hospitalBedsByRequestedTimeSevere = Math.trunc(
    availableBeds(totalHospitalBeds, severeCasesByRequestedTimeSevere)
  );
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);
  const casesForICUByRequestedTimeSevere = Math.trunc(infectionsByRequestedTimeSevere * 0.05);
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.02);
  const casesForVentilatorsByReqTimeSevere = Math.trunc(infectionsByRequestedTimeSevere * 0.02);
  const dollarsInFlight = Math.trunc(
    (
      infectionsByRequestedTime
      * region.avgDailyIncomePopulation
      * region.avgDailyIncomeInUSD
    ) / getDays(
      timeToElapse, periodType
    )
  );
  const dollarsInFlightSevere = Math.trunc((
    infectionsByRequestedTimeSevere
    * region.avgDailyIncomePopulation
    * region.avgDailyIncomeInUSD) / getDays(timeToElapse, periodType));

  const outputData = {
    data: {
      region,
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    },
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
