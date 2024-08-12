import React from 'react'
import './RegisteredEntity.css'

function RegisteredEntity({data}) {

  const entries = Object.entries(data);

  return (
    <div className='containerEntity'>
      <table className='registerTable'>
        <thead>
          <tr>
            <th className='thEntity'>ID</th>
            <th className='thEntity'>Name</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([key, value], index) => (
            <tr key={key}>
              <td className='tdEntity'>{index + 1}</td>
              <td className='thEntity'>{value.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegisteredEntity