const departmentName = () => {
    const endDepartment = "https://api-colombia.com/api/v1/Department";

    return new Promise((resolve, reject) => {
        fetch(endDepartment)
            .then((resp) => resp.json())
            .then((data) => {
                resolve(data);
            })
    })

}

export default departmentName;