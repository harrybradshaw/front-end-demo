import axios from "axios";

const getAll = (region='England') => {
    let AreaType = "nation";
    let AreaName = "england";
    let structure = {
        date: "date",
        areaName: "areaName",
        code: "areaCode",
        newCases: "newCasesByPublishDate",
        cumCases: "cumCasesByPublishDate",
    };

    if(region==='Cambridge') {
        AreaType = 'ltla';
        AreaName = 'Cambridge';
    } else if (region==='Oxford') {
        AreaType = 'ltla';
        AreaName = 'Oxford';
    } else if (region==='Manchester') {
        AreaType = 'utla';
        AreaName = 'Manchester';
    }

    const filters = [
        `areaType=${ AreaType }`,
        `areaName=${ AreaName }`
    ];
    
    if(AreaType!=='nation'){
        structure = {
            date: "date",
            areaName: "areaName",
            code: "areaCode",
            
            newCases: "newCasesBySpecimenDate",
            cumCases: "cumCasesBySpecimenDate",
            
        };
    }

    const apiParams = {
        filters: filters.join(";"),
        structure: JSON.stringify(structure),
    };

    const endpoint = 'https://api.coronavirus.data.gov.uk/v1/data';

    return axios.get(endpoint, { params: apiParams});
    };

export default {getAll};