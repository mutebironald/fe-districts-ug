const { path } = require('udistricts')

// const { path } = require('../../node_modules/udistricts/api/index.js')


path.then(districts => districts.map(d => console.log(d))).catch(error => console.log(error))
