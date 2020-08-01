const conference = require("./conference/conference");
const activity = require("./activity/activity");
const program = require("./program/program");
const { abstract } = require("./db");

const express = require("express"),
      api = express.Router(),


userRouter = require('./auth/userRouter');
conferenceRouter = require('./conference/conferenceRouter');
activityRouter = require('./activity/activityRouter');
programRouter = require('./program/programRouter');
abstractRouter = require('./uploads/uploadAbsRouter');
partiesRouter = require('./parties/partiesRouter');
requestRouter = require('./requests/requestRouter');
reviewRouter = require('./reviews/reviewRouter');

api.use('/users', userRouter);
api.use('/conference', conferenceRouter);
api.use('/activity', activityRouter);
api.use('/program', programRouter);
api.use('/abstract', abstractRouter);
api.use('/register', partiesRouter);
api.use('/request', requestRouter);
api.use('/review', reviewRouter);

module.exports = api;
