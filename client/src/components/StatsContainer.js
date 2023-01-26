import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import {  FaCalendarCheck, FaCalendarAlt, FaRegCalendarCheck } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'


const StatsContainer = () => {
  const {stats} = useAppContext()
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



  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return  <StatItem key={index} {...item}   />
      })}
      </Wrapper>
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