import express from "express";
import {defaultTo} from "ramda";
import {StatusCodes} from "http-status-codes";
import Requestor from "../services/helpers/response";
import {UsersRepository} from "../services/service/user.service";

const router = express.Router()


router.put('/search_user', async (req, res) => {
   try {
     const searchedQuery = defaultTo("",  req.query.search);
     const list = await UsersRepository.getUsersInSearch(searchedQuery as string);
     res.status(200).send(Requestor.GiveOKResponseWithData(list));
   } catch (e) {
     res.status(StatusCodes.BAD_REQUEST).send(Requestor.GiveResponse(StatusCodes.BAD_REQUEST, "BAD REQUEST"))
   }
});


export default router;
