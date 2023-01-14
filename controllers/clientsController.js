
const getAllClients = async (req,res) => {
 res.send('get all clients')
}

const updateClient = async (req,res) => {
 res.send('update client')
}

const deleteClient = async (req,res) => {
 res.send('delete client')
}

const createClient = async (req,res) => {
 res.send('create client')
}

const showStats = async (req,res) => {
 res.send('show stats')
}







export {createClient,deleteClient,getAllClients ,updateClient ,showStats}