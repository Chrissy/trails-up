import React from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import Label from "./label";
import Svg from "./svg";
import { flexCenter } from "../styles/flex";

const ImportantWeather = ({
  maxTemperature,
  minTemperature,
  chanceOfPercipitation,
  className
}) => {
  const percentText = integer => {
    return typeof integer == "number" ? parseInt(integer / 10) + "%" : "0%";
  };

  const tempIsExtreme = temp => {
    if (temp > 75) return "hot";
    if (temp < 50) return "cold";
    return null;
  };

  return (
    <div className={className}>
      <TopLabel>Average weather this week</TopLabel>
      <Container>
        <ImportantWeatherUnit darkBg={true}>
          <div className={flexCenter}>
            <StyledSvg
              src="weather-high"
              extreme={tempIsExtreme(maxTemperature)}
            />
            <Data extreme={tempIsExtreme(maxTemperature)}>
              {parseInt(maxTemperature)}°
            </Data>
          </div>
          <StyledLabel>High Temperature</StyledLabel>
        </ImportantWeatherUnit>
        <ImportantWeatherUnit>
          <div className={flexCenter}>
            <StyledSvg
              src="weather-low"
              extreme={tempIsExtreme(minTemperature)}
            />
            <Data extreme={tempIsExtreme(minTemperature)}>
              {parseInt(minTemperature)}°
            </Data>
          </div>
          <StyledLabel>Low Temperature</StyledLabel>
        </ImportantWeatherUnit>
        <ImportantWeatherUnit darkBg={true}>
          <div className={flexCenter}>
            <StyledSvg small={true} src="weather-rain" />
            <Data>{percentText(chanceOfPercipitation)}</Data>
          </div>
          <StyledLabel>Chance percipitation</StyledLabel>
        </ImportantWeatherUnit>
      </Container>
    </div>
  );
};

ImportantWeather.propTypes = {
  maxTemperature: PropTypes.number,
  minTemperature: PropTypes.number,
  chanceOfPercipitation: PropTypes.number,
  className: PropTypes.string
};

const Container = styled("div")`
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
`;

const ImportantWeatherUnit = styled("div")`
  display: grid;
  grid-template-rows: auto 0.6em;
  justify-items: center;
  align-items: center;
  padding: ${p => p.theme.ss(0.5)};
  padding-bottom: ${p => p.theme.ss(1)};
  color: ${p => p.theme.gray6};
  background: ${p => p.darkBg && p.theme.gray3};

  @media (max-width: 900px) {
    font-size: ${p => p.theme.ts(0.875)};
  }
`;

const getColor = p => {
  if (p.extreme == "hot") return p.theme.accentColor;
  if (p.extreme == "cold") return p.theme.purple;
  return p.theme.gray6;
};

const StyledSvg = styled(Svg)`
  width: ${p => (p.small ? p.theme.ss(2) : p.theme.ss(2.5))};
  height: auto;
  margin-top: ${p => p.theme.ss(0.5)};
  margin-right: ${p => p.theme.ss(0.25)};
  color: ${p => getColor(p)};
`;

const Data = styled("div")`
  font-size: ${p => p.theme.ts(2)};
  color: ${p => getColor(p)};
  font-weight: 600;
`;

const TopLabel = styled(Label)`
  margin-bottom: ${p => p.theme.ss(0.5)};
`;

const StyledLabel = styled(Label)`
  text-align: center;
  font-size: ${p => p.theme.ts(0.66)};
  margin-top: ${p => p.theme.ss(0.5)};

  @media (max-width: 900px) {
    font-size: ${p => p.theme.ts(0.5)};
  }
`;

export default ImportantWeather;
