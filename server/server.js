const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/task.router.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tasks', tasksRouter);

// Serve back static files by default
app.use(express.static('server/public'))

// Start listening for requests on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});























// const express = require('express');
// const bodyParser = require('body-parser');
// const taskRouter = require('./routes/task.router.js');

// const app = express();
// app.use(bodyParser.urlencoded({extended: true}));

// // app.use('/tasks', taskRouter);
// // console.log('task router??', taskRouter);

// // Serve back static files by default
// app.use(express.static('server/public'))

// // Start listening for requests on a specific port
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log('listening on port', PORT);
// });




// const express = require( 'express' );
// const app = express();
// const bodyParser = require( 'body-parser' );
// const pool = require( './modules/routes' );



// app.use( express.static( 'server/public' ) );
// app.use( bodyParser.urlencoded( { extended: true } ) );



// const port = 5000;



// app.listen( port, ()=>{
//     console.log( 'server up on:', port );
// })














// app.get( '/tasks', ( req, res )=>{
//     console.log( 'in /tasks GET' );
//     const query = `SELECT * from items ORDER BY id;`;
//     pool.query( query ).then( ( results )=>{
//         res.send( results.rows );
//     }).catch( (err )=>{
//         console.log( 'yr GET done erred:', err );
//         res.sendStatus( 500 );
//     })
// }) // end /items GET




// app.post( '/task', ( req, res )=>{
//     console.log( 'in /tasks POST:', req.body.task );
//     const query = `INSERT INTO "tasks" ( "id", "task" ) VALUES ( $1, $2 );`;
//     const values = [ req.body.task ];
//     pool.query( query, values ).then( ( results )=>{
//         res.sendStatus( 201 );
//     }).catch( ( err )=>{
//         console.log( 'ERROR with INSERT:', err );
//         res.sendStatus( 500 );
//     })
// }) //end /items POST



// app.put( '/items/:id', ( req, res )=>{
//     console.log( '/items PUT:', req.params.id, req.body );
//     const query = `UPDATE "items" SET pending=$1 WHERE id=$2;`;
//     const values =[ req.body.newPending, req.params.id ];
//     pool.query( query, values ).then( (results)=>{
//         res.sendStatus( 200 );
//     }).catch( ( err )=>{
//         console.log( 'error with update:', err );
//         res.sendStatus( 500 );
//     })
// }) // end /items put

// app.delete( '/items/:id', ( req, res )=>{
//     console.log( '/items DELETE hit:', req.params.id );
//     const query = `DELETE FROM "items" WHERE id=$1;`;
//     const values = [ req.params.id ];
//     pool.query( query, values ).then( ( response )=>{
//         res.sendStatus( 200 );
//     }).catch( ( err )=>{
//         console.log( 'error with DELETE:', err );
//         res.sendStatus( 500 );
//     })
// }) // end /items delete