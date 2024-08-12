const regionName = () => {
    const endRegion = "https://api-colombia.com/api/v1/Region";
    
    return new Promise((resolve, reject) => {
        fetch(endRegion)
            .then((resp) => resp.json())
            .then((data) => {
                resolve(data);
            })
    })
}

export default regionName;