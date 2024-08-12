import React, { useEffect, useState } from 'react'
import departmentName from '../../Funtions/DepartmentName';
import ResponseTime from '../ResponseTime/ResponseTime';
import CountEntities from '../CountEntityes/CountEntities';
import RegisteredEntity from '../RegisteredEntity/RegisteredEntity';
import './ColombianTuristicAttraction.css'

function ColombianTuristicAttraction() {

    const endTuristicAttraction = "https://api-colombia.com/api/v1/TouristicAttraction";

    const [infoTuristicAttraction, setInfoTuristicAttraction] = useState({});
    const [turisticAttraction, setTuristicAttraction] = useState({});
    const [responseTime, setResponseTime] = useState(0);


    useEffect(() => {
        const fetchAndGroupData = async () => {
            const startTime = Date.now(); // Tiempo inicial
            try {
                const response = await fetch(endTuristicAttraction);
                const data = await response.json();

                const endTime = Date.now(); // Tiempo final
                const responseTime = (endTime - startTime) / 1000; // Diferencia de tiempo en segundos
                setResponseTime(responseTime);
                setInfoTuristicAttraction(data);
                const groupedDataByDC = {};
                const departments = await departmentName();

                // Agrupar los datos
                data.forEach(current => {
                    const idDepartement = current.city.departmentId;
                    const nameCity = current.city.name;
                    const nameDepartement = departments.find(department => department.id === idDepartement).name

                    // Si no existe el departamento, crearlo
                    if (!groupedDataByDC[nameDepartement]) {
                        groupedDataByDC[nameDepartement] = {};
                    }

                    // Si no existe la ciudad en ese departamento, crearla
                    if (!groupedDataByDC[nameDepartement][nameCity]) {
                        groupedDataByDC[nameDepartement][nameCity] = 0;
                    }
                    // Añadir el objeto actual a la lista de la ciudad
                    groupedDataByDC[nameDepartement][nameCity] += 1;
                });
                setTuristicAttraction(groupedDataByDC);
            } catch (error) {
                console.error('Error fetching touristic attractions:', error);
            }
        }
        fetchAndGroupData();
    }, []);



    return (
        <div>
            <h1>Atractivos Turísticos</h1>
            <div className='containerAttractions'>
                <div className='grid-item item1'>
                    <CountEntities obj={infoTuristicAttraction} />
                </div>
                <div className='grid-item item2'>
                    <h2>Registros</h2>
                    <RegisteredEntity data={infoTuristicAttraction} />
                </div>
                <div className='grid-item item3'>
                    {Object.keys(turisticAttraction).length > 0 && (
                        <div>
                            <h3>Group by department and city</h3>
                            <table className='contentTableA'>
                                <thead>
                                    <tr>
                                        <th>Departamento</th>
                                        <th>Ciudad</th>
                                        <th>Cantidad de Atractivos Turísticos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(turisticAttraction).map((nameDepartement) => (
                                        Object.entries(turisticAttraction[nameDepartement]).map(([nameCity, count]) => (
                                            <tr key={`${nameDepartement}-${nameCity}`}>
                                                <td>{nameDepartement}</td>
                                                <td>{nameCity}</td>
                                                <td>{count}</td>
                                            </tr>
                                        ))
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <div className='grid-item item4'>
                <ResponseTime time={responseTime} />
            </div>
        </div>
    )
}

export default ColombianTuristicAttraction
