import React, { useEffect, useState } from 'react'

function ColombianPresidents() {

    const endPresidents = "https://api-colombia.com/api/v1/President";

    //usesStates
    const [president, setPresident] = useState();

    useEffect(() => {
        fetch(endPresidents)
            .then((resp) => resp.json())
            .then((data) => {
                setPresident(data);
                console.log(data[0]);
            })
    }, [])

    return (
        <div>{
            president && (
                <div>
                    <img src={president[0].image} alt={president[0].name} />
                    <div>{president[0].description}</div>
                </div>
            )

        }
        </div>
    )
}

export default ColombianPresidents