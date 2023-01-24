import Client from "../models/Client.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError,NotFoundError,UnAuthenticatedError} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from "mongoose"
import moment from 'moment'

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
const {status,clientPackage,sort,search} = req.query

const queryObject = {
  createdBy: req.user.userId
}

if(status && status !== 'all'){
  queryObject.status = status
}

if(clientPackage && clientPackage !== 'all') {
  queryObject.clientPackage = clientPackage
}

if (search) {
  queryObject.nameClient = {$regex: search, $options: 'i'}
}


let result = Client.find(queryObject)

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('nameClient');
  }
  if (sort === 'z-a') {
    result = result.sort('-nameClient');
  }

   // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);



const clients = await result

  const totalClients = await Client.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalClients / limit);



  res.status(StatusCodes.OK)
  .json({ clients, totalClients, numOfPages})
}

const updateClient = async (req,res) => {

const {id:clientId} = req.params
const {surnameClient,nameClient} = req.body

if (!surnameClient || !nameClient) {
  throw new BadRequestError('Please provide all values')
}
const client = await Client.findOne({ _id: clientId})

if(!client){
  throw new NotFoundError(`No client with id: ${clientId}`)
}
//check permission
 checkPermissions(req.user, client.createdBy);



const updatedClient = await Client.findOneAndUpdate({_id: clientId}, req.body, {
new:true,
runValidators:true,

})

res.status(StatusCodes.OK).json({updatedClient})


}

const deleteClient = async (req,res) => {

const { id: clientId } = req.params;

  const client = await Client.findOne({ _id: clientId });

  if (!client) {
    throw new NotFoundError(`No job with id :${clientId}`);
  }

  checkPermissions(req.user, client.createdBy);

  await client.remove();

  res.status(StatusCodes.OK).json({ msg: 'Success! Client removed' });



}


const showStats = async (req,res) => {
 let stats = await Client.aggregate([
  { $match: { createdBy:mongoose.Types.ObjectId(req.user.userId)}},
  { $group: { _id: '$status', count: { $sum: 1 } } },
 ])

stats = stats.reduce(( acc, curr) => {
  const { _id: title,count} = curr
  acc[title] = count
  return acc
}, {});

  const defaultStats = {
    month: stats.month || 0,
   threemonths: stats.threemonths || 0,
    year: stats.year || 0,
  };
  
  let monthlyApplications = await Client.aggregate([
 { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    
     { $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);
   
 monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();




res.status(StatusCodes.OK).json({ defaultStats,monthlyApplications});


}







export {createClient,deleteClient,getAllClients ,updateClient ,showStats}