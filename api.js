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
assignRouter = require('./assignments/assRouter');
paymentRouter = require('./payment/paymentRouter');
paperRouter = require('./paper/paperRouter');
contactRouter = require('./contact/contactRouter');

api.use('/users', userRouter);
api.use('/conference', conferenceRouter);
api.use('/activity', activityRouter);
api.use('/program', programRouter);
api.use('/abstract', abstractRouter);
api.use('/parties', partiesRouter);
api.use('/request', requestRouter);
api.use('/review', reviewRouter);
api.use('/assign', assignRouter);
api.use('/pay', paymentRouter);
api.use('/paper', paperRouter);
api.use('/contact', contactRouter);

module.exports = api;
