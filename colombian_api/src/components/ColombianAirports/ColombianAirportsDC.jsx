import { React, useState, useEffect } from 'react'
import OrganizeAirport from '../../Funtions/OrganizeAirport'
import ResponseTime from '../ResponseTime/ResponseTime';
import CountEntities from '../CountEntityes/CountEntities';
import RegisteredEntity from '../RegisteredEntity/RegisteredEntity';
import ColombianAirportsRDCT from './ColombianAirportsRDCT';
import './ColombianAirports.css';

function ColombianAirportsDC() {

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
                setResponseTime(responseTime);
                setAirportInfo(data);

                const groupedAirports = await OrganizeAirport.groupedDataByDC(data);
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
                    <CountEntities obj={airportInfo} />
                </div>
                <div className='grid-item item2'>
                    <h2>Registros</h2>
                    <RegisteredEntity data={airportInfo} />
                </div>
                <div className='grid-item item3'>
                    {airportInfo.length > 0 && (
                        <div>
                            <h3>Group by department and city</h3>
                            <table className='contentTableAir'>
                                <thead>
                                    <tr>
                                        <th>Departamento</th>
                                        <th>Ciudad</th>
                                        <th>Cantidad de Aeropuertos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(airport).map((departmentName) => (
                                        Object.entries(airport[departmentName]).map(([cityName, count]) => (
                                            <tr key={`${departmentName}-${cityName}`}>
                                                <td>{departmentName}</td>
                                                <td>{cityName}</td>
                                                <td>{count}</td>
                                            </tr>
                                        ))
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className='grid-item item4'>
                    <ResponseTime time={responseTime} />
                </div>
                <div className='grid-item item5'>
                    <ColombianAirportsRDCT />
                </div>
            </div>

        </div>)

}

export default ColombianAirportsDC;