import React, { useEffect, useState } from 'react'

function CountEntities({ obj }) {

  const [count, setCount] = useState(0);


  useEffect(() => {
    try {
      const countEntities = (obj) => {
        return Object.keys(obj).length
      };
      if (Object.keys(obj).length > 0) {
        const counts = countEntities(obj);
        setCount(counts);
      } else {
        setCount(0);
      }
    } catch (error) {
      console.error('Error fetching touristic attractions:', error);
    }
  }, [obj]);

  return (
    <div>Cantidad de registros: {count}</div>
  )
}

export default CountEntities;
