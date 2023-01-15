import Client from "../models/Client.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError} from '../errors/index.js'

const createClient = async (req,res) => {
    const {nameClient,surnameClient} = req.body

     if(!nameClient || !surnameClient){
      throw new BadRequestError('Please provide all values')
     }
    
     req.body.createdBy = req.user.userId
     const client = await Client.create(req.body)
     res.status(StatusCodes.CREATED).json({ client})
}
const getAllClients = async (req,res) => {
 res.send('get all clients')
}

const updateClient = async (req,res) => {
 res.send('update client')
}

const deleteClient = async (req,res) => {
 res.send('delete client')
}


const showStats = async (req,res) => {
 res.send('show stats')
}







export {createClient,deleteClient,getAllClients ,updateClient ,showStats}