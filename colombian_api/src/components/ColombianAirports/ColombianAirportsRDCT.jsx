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


    // Función para descargar el archivo JSON
    const downloadJSON = () => {
        const blob = new Blob([JSON.stringify(airport, null, 5)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'airport_info.json';
        a.click();
        URL.revokeObjectURL(url); // Limpiar el URL después de la descarga
    };

    return (
        <div>
            <h1>Airports Information</h1>
            <div className='containerAirports'>
                <div className='grid-item item1'>
                    {airportInfo.length > 0 && (
                        <div>
                            <h3>Group by region, department, city and type</h3>
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
                        </div>
                    )}
                </div>
                <div className='grid-item item6'>
                    <button onClick={downloadJSON} className='button_slide slide_left'>Download JSON</button>
                    <pre>{JSON.stringify(airport, null, 5)}</pre>
                    <button onClick={downloadJSON} className='button_slide slide_left'>Download JSON</button>
                </div>
                <div className='grid-item item7'>
                    <ResponseTime time={responseTime} />
                </div>
            </div>
        </div>)
}

export default ColombianAirportsRDCT;