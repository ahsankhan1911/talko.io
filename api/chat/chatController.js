const axios = require('axios');
const mongoose = require('mongoose');
const responseHandler = require('../../lib/responseHandler');
const chatDoa = require('./chatDoa');

exports.createChat = (request, response) => {
    let _id = request.user._id
          chatDoa.createChat({_id})
}