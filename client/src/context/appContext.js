import   React, {useReducer,useContext} from 'react'

import reducer from './reducer'
import  axios from 'axios'

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_CLIENT_BEGIN,
    CREATE_CLIENT_SUCCESS,
    CREATE_CLIENT_ERROR,
    GET_CLIENTS_BEGIN,
    GET_CLIENTS_SUCCESS,
    SET_EDIT_CLIENT,
    DELETE_CLIENT_BEGIN,
    DELETE_CLIENT_ERROR,
    EDIT_CLIENT_BEGIN,
    EDIT_CLIENT_SUCCESS,
    EDIT_CLIENT_ERROR,
    SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
   CLEAR_FILTERS,
    CHANGE_PAGE,
 } from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')




const initialState = {
 isLoading: false,
 showAlert: false,
 alertText: '',
 alertType: '',
 user: user ? JSON.parse(user) : null,
 token: token,
 userLocation: userLocation || '',
 jobLocation: userLocation || '',
 showSidebar: false,
 isEditing: false,
 editClientId:'',
 nameClient:'',
 surnameClient:'',
 clientNumber:'',
 clientPackageOptions:  ['basic', 'premium', 'pro', 'none'],
clientPackage: 'none',
statusOptions:  ['month', 'threemonths', 'year'] ,
status: 'onemonth',
clients:[],
totalClients:0,
numOfPages:1,
page:1,
 stats: {},
 monthlyApplications: [],
 search:'',
 searchStatus:'all',
 searchType: 'all',
 sort: 'latest',
 sortOptions: ['latest','oldest','a-z','z-a']
}


const AppContext = React.createContext()

const AppProvider = ({children})  => {
 const [state,dispatch] = useReducer(reducer,initialState)


//axios
const authFetch = axios.create({
  baseURL:'/api/v1',
})

//request
authFetch.interceptors.request.use(
  (config) => {
    config.headers.common['Authorization'] = `Bearer ${state.token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );





  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert()
  };


  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

const addUserToLocalStorage = ({user,token,location}) => {
localStorage.setItem('user',JSON.stringify(user))
localStorage.setItem('token',token)
localStorage.setItem('location',location)

}

const removeUserFromLocalStorage = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('location')
}

    const setupUser = async ({currentUser,endPoint,alertText}) => {
    dispatch({type: SETUP_USER_BEGIN})
  try {
    const { data } = await axios.post( `/api/v1/auth/${endPoint}`,currentUser)
    
    const {user,token,location} = data
    dispatch({
      type: SETUP_USER_SUCCESS,
      payload: {user,token,location,alertText},
    })
    addUserToLocalStorage({user,token,location})
  } catch (error) {
    
    dispatch({
      type: SETUP_USER_ERROR,
      payload: {msg: error.response.data.msg}
    })
  }
  clearAlert()
  }

const toggleSidebar = () => {
  dispatch({ type: TOGGLE_SIDEBAR})
}

const logoutUser = async () => {
  dispatch({ type: LOGOUT_USER}) 
  removeUserFromLocalStorage()
}

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, location ,token} = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location ,token},
      });
      addUserToLocalStorage({user,location,token})
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg:error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

const handleChange = ({ name, value}) => {
  dispatch({ type:HANDLE_CHANGE ,payload: {name, value}})
}
const clearValues = () => {
  dispatchEvent({ type: CLEAR_VALUES})
}


const createClient = async () => {
  dispatch({type: CREATE_CLIENT_BEGIN})
  try {
    const { nameClient,surnameClient, clientNumber,clientPackage,status} = state
    await authFetch.post('/clients', {
     nameClient,
     surnameClient,
      clientNumber,
      clientPackage,
      status,
    })
dispatch({type: CREATE_CLIENT_SUCCESS})
dispatch({type: CLEAR_VALUES})
  } catch (error) {
    if (error.response.status === 401) return
    dispatch({
      type: CREATE_CLIENT_ERROR,
      payload: {msg: error.response.data.msg},
    })
  }
  clearAlert()
}

const getClients = async () => {
  const { page, search, searchStatus, searchType, sort } = state


 let url = `/clients?page=${page}&status=${searchStatus}&clientPackage=${searchType}&sort=${sort}`;

   if (search) {
      url = url + `&search=${search}`
   }
  
    dispatch({ type: GET_CLIENTS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { clients, totalClients, numOfPages } = data;
      dispatch({
        type: GET_CLIENTS_SUCCESS,
        payload: {
          clients,
          totalClients,
          numOfPages,
        },
      });
    } catch (error) {
    
      logoutUser();
    }
   clearAlert()
  };

    const setEditClient = (id) => {
    dispatch({ type: SET_EDIT_CLIENT, payload: {id}});
  };

  const editClient = async () => {
    dispatch({ type: EDIT_CLIENT_BEGIN });

    try {
      const { nameClient, surnameClient, clientNumber, clientPackage, status } = state;
      await authFetch.patch(`/clients/${state.editClientId}`, {
        nameClient,
        surnameClient,
        clientNumber,
        clientPackage,
        status,
      });
      dispatch({ type: EDIT_CLIENT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_CLIENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const showStats = async () => {
dispatch({type: SHOW_STATS_BEGIN})
 try {
  const {data} = await authFetch('/clients/stats')
  dispatch({type:SHOW_STATS_SUCCESS,payload: {
    stats: data.defaultStats,
    monthlyApplications: data.monthlyApplications,
  }})
  
 } catch (error) {
 
  logoutUser()
 }
clearAlert()
  }






  const deleteClient = async (clientId) => {
    dispatch({ type: DELETE_CLIENT_BEGIN });
    try {
      await authFetch.delete(`/clients/${clientId}`);
      getClients();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_CLIENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };







  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  }
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };



 return <AppContext.Provider value={{...state,displayAlert,setupUser,toggleSidebar,logoutUser,updateUser,handleChange,clearValues,createClient,getClients,setEditClient,deleteClient,editClient ,showStats   ,clearFilters,changePage}}>{children}</AppContext.Provider>
}

const useAppContext = () => {
 return useContext(AppContext)
}




export {AppProvider,initialState,useAppContext}