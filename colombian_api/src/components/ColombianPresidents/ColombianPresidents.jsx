import { React, useEffect, useState } from 'react'
import ResponseTime from '../ResponseTime/ResponseTime';
import CountEntities from '../CountEntityes/CountEntities';
import './ColombianPresidents.css'
import RegisteredEntity from '../RegisteredEntity/RegisteredEntity';


function ColombianPresidents() {

    const endPresidents = "https://api-colombia.com/api/v1/President";

    //usesStates
    const [infoPresident, setInfoPresident] = useState({});
    const [president, setPresident] = useState({});
    const [responseTime, setResponseTime] = useState(0);

    useEffect(() => {
        const fetchAndGroupData = async () => {
            const startTime = Date.now(); // Tiempo inicial
            try {
                const response = await fetch(endPresidents);
                const data = await response.json();

                const endTime = Date.now(); // Tiempo final
                const responseTime = (endTime - startTime) / 1000; // Diferencia de tiempo en segundos
                setResponseTime(responseTime);
                setInfoPresident(data);
                const groupedDataByPP = data.reduce((acc, current) => {
                    const politicalParty = current.politicalParty;
                    if (!acc[politicalParty]) {
                        acc[politicalParty] = 0
                    }
                    acc[politicalParty] += 1;
                    return acc;
                }, {});
                setPresident(groupedDataByPP);
            } catch (error) {
                console.error('Error fetching touristic attractions:', error);
            }
        }
        fetchAndGroupData();
    }, []);

    return (
        <div>
            <h1>Presidentes por Partido Político</h1>
            <div className='containerPresidents'>
                <div className='grid-item item1'>
                <CountEntities obj={infoPresident} />
                </div>
                <div className='grid-item item2'>
                    <h2>Registros</h2>
                    <RegisteredEntity data={infoPresident} />
                </div>
                <div className='grid-item item3'>
                    {Object.keys(president).length > 0 && (
                        <table className='contentTable'>
                            <thead>
                                <tr>
                                    <th>Partido Político</th>
                                    <th>Cantidad de Presidentes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(president).map(([politicalParty, count]) => (
                                    <tr key={politicalParty}>
                                        <td>{politicalParty}</td>
                                        <td>{count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className='grid-item item4'>
                <ResponseTime time={responseTime}/>
                </div>
            </div>
        </div>
    )
}

export default ColombianPresidents;