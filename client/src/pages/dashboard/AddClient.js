import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddClient = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    nameClient,
    surnameClient,
    clientNumber,
    clientPackage,
    clientPackageOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createClient,
    editClient,

  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!nameClient || !surnameClient || !clientNumber) {
      displayAlert()
      return
    }
    if (isEditing) {
      editClient()
      return
    }
    createClient()
  }
  const handleClientInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit client' : 'add client'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* name */}
          <FormRow
            type='text'
            name='nameClient'
            value={nameClient}
            handleChange={handleClientInput}
          />
          {/* surname*/}
          <FormRow
            type='text'
            name='surnameClient'
            value={surnameClient}
            handleChange={handleClientInput}
          />
          {/* number */}
          <FormRow
            type='text'
            labelText='client number'
            name='clientNumber'
            value={clientNumber}
            handleChange={handleClientInput}
          />
          {/* client status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleClientInput}
            list={statusOptions}
          />
          {/* client package */}
          <FormRowSelect
            name='clientPackage'
            labelText='client package'
            value={clientPackage}
            handleChange={handleClientInput}
            list={clientPackageOptions}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddClient