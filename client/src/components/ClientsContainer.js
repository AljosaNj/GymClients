import { useEffect } from "react"
import Loading from "./Loading"
import Client from "./Client"
import Wrapper from "../assets/wrappers/ClientsContainer"
import { useAppContext } from '../context/appContext';
import Alert from './Alert';
import PageBtnContainer from './PageBtnContainer';


const ClientsContainer = () => {
    const {getClients,clients,isLoading, page,totalClients,showAlert,search,searchStatus,searchType,sort,numOfPages} = useAppContext()
      useEffect(() => {
    getClients();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);
 

   if (isLoading) {
    return <Loading   center/>
   }

    if (clients.length === 0) {

 return (
    <Wrapper>
      <h2>No clients to display...</h2>
    </Wrapper>
    
  )
    }

return  (
  <Wrapper>
 { showAlert && <Alert />}
<h5>
{totalClients} client {clients.length > 1 && 's'} found
</h5>
<div className="clients">
  {clients.map((client) => {

    return <Client key={client._id}  {...client} />
  })}

</div>
 {numOfPages > 1 && <PageBtnContainer />}

  </Wrapper>
)
 
}

export default ClientsContainer
