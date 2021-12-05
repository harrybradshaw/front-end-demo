import React, { useState, useEffect } from "react";
import StatsService from "../services/StatsService";

const AllStatsList = () => {
    const [stats, setStats] = useState([]);
    const [currentStat, setCurrentStat] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const retrieveTutorials = () => {
        StatsService.getAll()
          .then(response => {
            setStats(response.data.data);
          })
          .catch(e => {
            console.log(e);
          });
      };

    useEffect(() => {
        retrieveTutorials();
    }, []);
  
    const setActiveStat = (stat, index) => {
      setCurrentStat(stat);
      setCurrentIndex(index);
    };
  
    return (
        <div className="list row">
        <div className="col-md-6">
            <h4>All Data</h4>
            {stats.map((stat,index)=> (
                <li
                className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveStat(stat, index)}
                  key={index}
                >
                    {stat.date}
                </li>
            ))}
        </div>
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
                        Cum Cases:{'\u00A0'}
                    </strong>
                </label>
                {currentStat.cumCases}
            </div>
        </div>
        ) : (
        <div>
          <br />
          <p>Please choose a date</p>
        </div>
        )
        }
        </div>
       
    );
};

export default AllStatsList;