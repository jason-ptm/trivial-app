import React from 'react'

export default function Podium ({ players }) {
  return (
    <div className='Podium'>
      <h3 className='title'>
        Mejores puntajes
        <i className='fa-solid fa-trophy' />
      </h3>
      <table className='players'>
        <tr className='head'>
          <th>#</th>
          <th className='user'>Nombre</th>
          <th className='score'>Puntaje</th>
        </tr>
        {players.map(player => (
          <li
            className='player'
            key={player.id}
          >
            <span className='position'>{player.position}</span>
            <span className='user'>{player.user}</span>
            <span className='score'>{player.score}</span>
          </li>
        ))}
      </table>
    </div>
  )
}
