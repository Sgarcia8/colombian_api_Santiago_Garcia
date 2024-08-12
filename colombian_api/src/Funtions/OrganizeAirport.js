const groupedDataByDC = (data) => {
    return new Promise((resolve, reject) => {
        const airports = {};
        data.forEach(current => {
            const departmentName = current.department.name;
            const cityName = current.city.name;

            // Si no existe el departamento, crearlo
            if (!airports[departmentName]) {
                airports[departmentName] = {};
            }

            // Si no existe la ciudad en ese departamento, crearla
            if (!airports[departmentName][cityName]) {
                airports[departmentName][cityName] = 0;
            }

            // Añadir el objeto actual a la lista de la ciudad
            airports[departmentName][cityName] += 1;


        });
        resolve(airports);
    })

    
}

const groupedDataByRDCT = (data, regions) => {
    return new Promise((resolve, reject) => {
        const airports = {};
        data.forEach(current => {
            const idRegion = current.department.regionId;
            const departmentName = current.department.name;
            const cityName = current.city.name;
            const typeName = current.type;
            const regionName = regions.find(region => region.id === idRegion).name;

            // Si no existe la region, crearlo
            if (!airports[regionName]) {
                airports[regionName] = {};
            }
            // Si no existe el departamento en la region, crearlo
            if (!airports[regionName][departmentName]) {
                airports[regionName][departmentName] = {};
            }

            // Si no existe la ciudad en ese departamento y region, crearla
            if (!airports[regionName][departmentName][cityName]) {
                airports[regionName][departmentName][cityName] = {};
            }
            // Si no existe el tipo en la ciudad en ese departamento y region, crearla
            if (!airports[regionName][departmentName][cityName][typeName]) {
                airports[regionName][departmentName][cityName][typeName] = 0;
            }

            // Añadir el objeto actual a la lista de la ciudad
            airports[regionName][departmentName][cityName][typeName] += 1;


        });
        resolve(airports);
    })

    
}

const OrganizeAirport = {
    groupedDataByDC,
    groupedDataByRDCT
};


export default OrganizeAirport;