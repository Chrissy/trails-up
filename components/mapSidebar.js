import React from 'react';
import cx from 'classnames';
import LineGraph from './lineGraph';
import Terrain from './terrain';
import LoadingSpinner from './loadingSpinner';
import {metersToFeet, metersToMiles} from '../modules/conversions';
import {convertToPercent} from '../modules/NOAA'

import styles from './mapSidebar.css';
import spacing from './spacing.css';

export default class MapSidebar extends React.Component {

  terrainComponent() {
    if (this.props.firstTrail.hasElevationData) return <Terrain trail={this.props.firstTrail}/>
  }

  render() {
    return (
      <div className={cx(styles.body, {[styles.active]: this.props.loading})}>
        <div className={cx(styles.content, {[styles.active]: this.props.firstTrail.hasElevationData})}>
          {this.terrainComponent()}
          length: {metersToMiles(this.props.distance)}<br/>
          elevation gain: {metersToFeet(this.props.elevationGain)} Feet<br/>
          elevation loss: {metersToFeet(this.props.elevationLoss)} Feet<br/>
          <div className={spacing.top_margin}>
            <LineGraph points={this.props.cumulativeElevations}/>
          </div>
          Weather almanac for this week: <br/>
          High temperature: {this.props.firstTrail.maxTemperature}° <br/>
          Low Temperature: {this.props.firstTrail.minTemperature}° <br/>
          Chance of percipitation: {convertToPercent(this.props.firstTrail.chanceOfPercipitation)}% <br/>
          Chance of heavy percipitation: {convertToPercent(this.props.firstTrail.chanceOfHeavyPercipitation)}% <br/>
          Chance of snow: {convertToPercent(this.props.firstTrail.chanceOfSnow)}% <br/>
          Chance of heavy snow: {convertToPercent(this.props.firstTrail.chanceOfHeavySnow)}% <br/>
          Chance of snowpack: {convertToPercent(this.props.firstTrail.chanceOfSnowPack)}% <br/>
          Chance of heavy snowpack: {convertToPercent(this.props.firstTrail.chanceOfHeavySnowPack)}% <br/>
          surface: {this.props.firstTrail.surface || 'unknown'}<br/>
        </div>
        <div className={cx(styles.spinner, {[styles.hidden]: this.props.firstTrail.hasElevationData})}>
          <LoadingSpinner/>
        </div>
      </div>
    )
  }
};
