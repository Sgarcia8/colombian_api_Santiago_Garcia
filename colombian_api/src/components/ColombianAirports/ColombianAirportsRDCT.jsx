import { React, useState, useEffect } from 'react'
import OrganizeAirport from '../../Funtions/OrganizeAirport'
import regionName from '../../Funtions/RegionName'
import ResponseTime from '../ResponseTime/ResponseTime';
import './ColombianAirports.css';

function ColombianAirportsRDCT() {

    const endAirports = "https://api-colombia.com/api/v1/Airport";

    //usesStates
    const [airportInfo, setAirportInfo] = useState({});
    const [airport, setAirport] = useState({});
    const [responseTime, setResponseTime] = useState(0);

    useEffect(() => {
        const fetchAndGroupData = async () => {
            const startTime = Date.now(); // Tiempo inicial
            try {
                const response = await fetch(endAirports);
                const data = await response.json();
                const endTime = Date.now(); // Tiempo final
                const responseTime = (endTime - startTime) / 1000; // Diferencia de tiempo en segundos
                setAirportInfo(data);
                setResponseTime(responseTime);

                const regions = await regionName();

                const groupedAirports = await OrganizeAirport.groupedDataByRDCT(data, regions);
                setAirport(groupedAirports);


            } catch (error) {
                console.error('Error fetching touristic attractions:', error);
            }
        }

        fetchAndGroupData();
    }, [])

    return (
        <div>
            <h1>Airports Information</h1>
            <div className='containerAirports'>
                <div className='grid-item item1'>
                    {airportInfo.length > 0 && (
                        <table className='contentTableAir'>
                            <thead>
                                <tr>
                                    <th>Región</th>
                                    <th>Departamento</th>
                                    <th>Ciudad</th>
                                    <th>Tipo</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(airport).map((regionName) => (
                                    Object.entries(airport[regionName]).map(([departmentName, cities]) => (
                                        Object.entries(cities).map(([cityName, types]) => (
                                            Object.entries(types).map(([typeName, count]) => (
                                                <tr key={`${regionName}-${departmentName}-${cityName}-${typeName}`}>
                                                    <td>{regionName}</td>
                                                    <td>{departmentName}</td>
                                                    <td>{cityName}</td>
                                                    <td>{typeName}</td>
                                                    <td>{count}</td>
                                                </tr>
                                            ))
                                        ))
                                    ))
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className='grid-item item6'>
                    <pre>{JSON.stringify(airport, null, 5)}</pre>
                </div>
                <div className='grid-item item7'>
                    <ResponseTime time={responseTime} />
                </div>
            </div>
        </div>)
}

export default ColombianAirportsRDCT;