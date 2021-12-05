import React, {useState, useEffect} from 'react';
import {curveCatmullRom} from 'd3-shape';
import 'react-vis/dist/style.css';
import StatsService from "../services/StatsService";


import {
  XYPlot,
  XAxis,
  YAxis,
  ChartLabel,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  LineMarkSeries,
  Crosshair,
  MarkSeries
} from 'react-vis';

const Example = () => {
    const [stats, setStats] = useState([]);
    const [regions, setRegions] = useState(['England']);
    const [currentStat, setCurrentStat] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [points, setPoints] = useState(false);
    let Line = points ? LineMarkSeries : LineSeries;
    
    const retrieveStats = () => {
        StatsService.getAll(regions[0])
          .then(response => {
            setStats(response.data.data);
          })
          .catch(e => {
            console.log(e);
          });
    };

    useEffect(() => {
        retrieveStats();
    }, [regions]);

    const setActiveStat = (stat, index) => {
        setCurrentStat(stat);
        setCurrentIndex(index);
    };

    const handleRegionChange = (event) => {
        if(event.target.value === 'Varsity'){
            setRegions(['Cambridge']);
        } else {
            setRegions([event.target.value]);
        }
        
    }

    const handlePointsChange = (event) => {
        setPoints(!points);
        if(points){
            Line = LineMarkSeries;
        } else{
            Line = LineSeries;
        }
    }

    const oml = () => {
        setCurrentStat(false);
        setCurrentIndex(-1);
    }


    return (
      <div>
          <div>
              <h4>
                  New Cases - {regions[0]}
              </h4>
          </div>
          <div>
              <select value={regions[0]} onChange={handleRegionChange}>
                  <option value='England'>
                        England
                  </option>
                  <option value='Cambridge'>
                        Cambridge
                  </option>
                  <option value='Oxford'>
                        Oxford
                  </option>
                  <option value='Manchester'>
                        Manchester
                  </option>
              </select>
              <br/>
              <input type="checkbox" id="points" name="boxes" onChange={handlePointsChange}/>
              <label for="points">{'\u00A0'}Plot Data Points</label>
          </div>
    <div>
        <XYPlot 
        width={1000} 
        height={500}
        xType="time"
        onMouseLeave={oml}
        >
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis tickLabelAngle={90} />
          <YAxis />
          <ChartLabel 
            text="Date"
            className="alt-x-label"
            includeMargin={false}
            xPercent={0.025}
            yPercent={1.10}
            />

          <ChartLabel 
            text="Cases"
            className="alt-y-label"
            includeMargin={false}
            xPercent={-0.03}
            yPercent={0.06}
            style={{
              transform: 'rotate(-90)',
              textAnchor: 'end'
            }}
            />
            <Line
            className="first-series"
            data={stats.map((stat,index)=>{
                return {x:new Date(stat.date), y:stat.newCases}
            })}
            onNearestX={(value,{index}) => {
                setActiveStat(stats[index],index)
            }}
            />
            {/*currentStat && <Crosshair values={[{x: new Date(currentStat.date), y:currentStat.newCases}]} />*/}
            {currentStat && <MarkSeries data={[{x: new Date(currentStat.date), y:currentStat.newCases}]} />}

            
        
        </XYPlot>
      </div>
      <div>
      {currentStat ? (
        <div className="col-md-6">
            <h4>
            <strong>
            {currentStat.date}
            </strong>
            </h4>
            <div>
                <label>
                    <strong>
                        Area:{'\u00A0'}
                    </strong>
                </label>
                {currentStat.areaName}
            </div>
            <div>
                <label>
                    <strong>
                        Cases:{'\u00A0'}
                    </strong>
                </label>
                {currentStat.newCases}
                <br/>
                <label>
                    <strong>
                        Cumulative Cases:{'\u00A0'}
                    </strong>
                </label>
                {currentStat.cumCases}
            </div>
        </div>
        ) : (
        <div>
          <br />
          <p>Hover over the graph to see more details...</p>
        </div>
        )
        }
      </div>
      </div>
    );
}

export default Example;