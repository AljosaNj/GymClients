import React from 'react'
import StatsItem from './StatItem'


const StatsContainer = () => {
  return (
    <div>
      <h1>
StatsContainer
      </h1>
      <StatsItem/>
      </div>
  )
}

export default StatsContainer







/*

 const defaultStats = [
    {
      title: 'month',
      count: stats.month || 0,
      icon: <FaCalendarAlt />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'threemonths',
      count: stats.threemonths || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'year',
      count: stats.year || 0,
      icon: <FaRegCalendarCheck/>,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]

*/