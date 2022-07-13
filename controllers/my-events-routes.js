const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, Vendor, Going } = require('../models');