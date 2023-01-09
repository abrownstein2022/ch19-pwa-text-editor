// const express = require('express');
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

//! added another level of nesting (get back out of current directory - serving wrong file location)
app.use(express.static('../client/dist'));
app.use(express.static('../client/src'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
