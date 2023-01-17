import React from 'react'
import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Client'
import ClientInfo from './ClientInfo'


const Client = ({
_id,
nameClient,
surnameClient,
clientNumber,
clientPackage,
createdAt,
status

}) => {

const {setEditClient, deleteClient} = useAppContext()


  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')


  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{surnameClient.charAt(0)}</div>
        <div className='info'>
          <h5>{nameClient}</h5>
          <p>{surnameClient}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <ClientInfo icon={<FaLocationArrow />} text={clientNumber} />
          <ClientInfo icon={<FaCalendarAlt />} text={date} />
          <ClientInfo icon={<FaBriefcase />} text={clientPackage} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-client'
              className='btn edit-btn'
             onClick={() => setEditClient(_id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
             onClick={() => deleteClient(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>


  )
}

export default Client