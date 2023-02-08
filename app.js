// CORE MODULES
const readline = require('readline');
const fs = require('fs'); // file system
const http = require('http');
const url = require('url');
// In order to work with events use the events module
const events = require('events');

// USER/CUSTOM MODULES
const replaceHtml = require('./modules/replaceHtml');
const user = require('./modules/user');

// THIRD PARTY LIBRARIES

/*READING INPUT & WRITING OUTPUT
**********************************/
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('Please enter your name ', (name) =>{
//     console.log('You entered ', name);
//     rl.close();
// })

// rl.on('close', ()=>{
//    console.log('interface closed');
//    process.exit(0); 
// })

/* READING & WRITING TO A FILE SYNCHRONOUSLY
*********************************/
// // READ
// let textInSync = fs.readFileSync('./Files/input.txt', 'utf-8'); // reads file synchronously. Line by Line
// console.log(textIn);

// // WRITE
// let contentSync = `Data read from input.txt: ${textInSync} \n Date created ${new Date()}`
// fs.writeFileSync('./Files/output.txt', contentSync) // reads file synchronously
// // Should see update in output.txt file

/* READING & WRITING TO A FILE ASYNCHRONOUSLY
*********************************/
// This is callback hell. Need to use Async & Await
// fs.readFile('./Files/start.txt', 'utf-8', (error1, data1) =>{
//     console.log(data1);
//     fs.readFile(`./Files/${data1}.txt`, 'utf-8', (error2, data2)=>{
//         console.log(data2);
//         fs.readFile('./Files/append.txt', 'utf-8', (error3, data3)=>{
//             console.log(data3);
//             fs.writeFile('./File/output.txt', `${data2}\n\n${data3}\n\n${new Date()}`, ()=>{
//                 console.log('File returned successully!');
//             })
//         })
//     });
    
// });
// console.log('Reading file...');

// BUIDLING A WEB SERVER

/**This line of code is reading the index.html file synchronously. Nothing will happen until this page has loaded.
 * The index.html file holds the CONTENT that displays all other pages like so {{%CONTENT%}}
 ***************************************************************/
// const html = fs.readFileSync('Template/index.html', 'utf-8'); 

/**This line of code gets the products data asyncronously for the products.json file. The JSON.parse displays the products in JSON format
 ***************************************************************/
// let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'));

/**This line of code gets the product list.html file syncronously.
 **************************************************************/
// let productListHtml = fs.readFileSync('./Template/product-list.html', 'utf-8');
// let producDetailHtml = fs.readFileSync('./Template/product-detail.html', 'utf-8');

/**
 **************************************************************/


// CREATE THE SERVER
/**Create a server with the createServer method. In order to do so, wer import the http interface. The createServer method takes on a callback method and 2 parameters. Request and Response.
 *************************************************************/
// const server = http.createServer((request, response) =>{

// /**Here we pass query string by using the url module. We use parse to return a URL Object and assign it to a variable using key value pairs "query and pathname. By setting te request.url to true we are able to pass a query string. Setting it to false would not allow you to pass a query string" 
// **************************************************************/
//     let {query, pathname: path} = url.parse(request.url, true); // passing query string
//     // console.log(x);
//     // let path = request.url;

// // SET UP ROUTING...
//     if(path === '/' || path.toLocaleLowerCase() ==='/home'){
// /**Writing Headers allows us to set the http status and set up specific headers on the backend*/
//                 response.writeHead(200, {
//                     'Content-Type' : 'text/html',
//                     'my-header': 'Hellow, world'
//                 });
//                 response.end(html.replace('{{%CONTENT%}}', 'You are in Home page'));
//     }else if(path.toLocaleLowerCase() === '/about'){
//         response.writeHead(200, {
//             'Content-Type': 'text/html',
//             'my-header': 'Hello World'
//         });
//         response.end(html.replace('{{%CONTENT%}}', 'You are in About Page'));
//     }else if(path.toLocaleLowerCase() === '/contact'){
//         response.writeHead(200, {
//             'Content-Type': 'text/html',
//             'my-header': 'Hello World'
//         });
//         response.end(html.replace('{{%CONTENT%}}', 'You are in Contact Page'));
//     /**Setting the path for products... /products */
//     }else if(path.toLocaleLowerCase() === '/products'){
//     /**If the path does not have a query parameter with id. Run the following code... */
//         if(!query.id){
//             let productHTMLArray = products.map((prod)=>{
//                 return replaceHtml(productListHtml, prod)
//             })
//     /**Here the productHTMLArray variable is used with the join method to separate each object. It will list all products within the product.json file. html- is fetching the index page where the CONTENT for the products page is display using a placeholder "{{%CONTENT%}}". It is then using replace to add the products to the page and assigned to a variable called "productResponseHtml."  */
//             let productResponseHtml =  html.replace('%CONTENT%', productHTMLArray.join(''))
//             /**Set up the http response status and headders here... */
//             response.writeHead(200, {'Content-Type' : 'text/html'});
//             /**response.end method signals that no more data will be called and sets the parameter to productResponseHtml*/
//             response.end(productResponseHtml);
//         } else{
//             let prod = products[query.id]
//             let productDetailResponseHtml = replaceHtml(producDetailHtml, prod);
//             response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml) + query.id);
//         }
       
//     }else{
//         /**The status here is set to 404 page not found if the route does not exist*/
//         response.writeHead(404, {
//             'Content-Type': 'text/html',
//             'my-header': 'Hello World'
//         });
//         response.end(html.replace('{{%CONTENT%}}', 'Error 404: Page Not Found'));
//     }
// });

// EVENT/EMIT ARCHITECTURE
// INHERITS FROM EVENT EMITTER. Listens to events (OBSERVER PATTERN - Observer and a listener)
const server = http.createServer(); // emits request event
// server.on('request', (request, response)=>{
// let {query, pathname: path} = url.parse(request.url, true); // passing query string

// if(path === '/' || path.toLocaleLowerCase() ==='/home'){

//             response.writeHead(200, {
//                 'Content-Type' : 'text/html',
//                 'my-header': 'Hellow, world'
//             });
//             response.end(html.replace('{{%CONTENT%}}', 'You are in Home page'));
// }else if(path.toLocaleLowerCase() === '/about'){
//     response.writeHead(200, {
//         'Content-Type': 'text/html',
//         'my-header': 'Hello World'
//     });
//     response.end(html.replace('{{%CONTENT%}}', 'You are in About Page'));
// }else if(path.toLocaleLowerCase() === '/contact'){
//     response.writeHead(200, {
//         'Content-Type': 'text/html',
//         'my-header': 'Hello World'
//     });
//     response.end(html.replace('{{%CONTENT%}}', 'You are in Contact Page'));

// }else if(path.toLocaleLowerCase() === '/products'){

//     if(!query.id){
//         let productHTMLArray = products.map((prod)=>{
//             return replaceHtml(productListHtml, prod)
//         })

//         let productResponseHtml =  html.replace('%CONTENT%', productHTMLArray.join(''))
     
//         response.writeHead(200, {'Content-Type' : 'text/html'});

//         response.end(productResponseHtml);
//     } else{
//         let prod = products[query.id]
//         let productDetailResponseHtml = replaceHtml(producDetailHtml, prod);
//         response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml) + query.id);
//     }
   
// }else{
 
//     response.writeHead(404, {
//         'Content-Type': 'text/html',
//         'my-header': 'Hello World'
//     });
//     response.end(html.replace('{{%CONTENT%}}', 'Error 404: Page Not Found'));
// }
// })

// // START THE SERVER
// /**The server checks for 2 parameters... The port number and the server IP address. Then it takes on a callback and in this case prints to the console... "Server has started!" */
// server.listen(8000, '127.0.0.1', () =>{
//     console.log('server has started!');
// }) // port, host, and a callback

// let myEmitter = new user(); // assign an instance of Event Emitter class.

// myEmitter.on('userCreated', (id, name)=>{
// console.log(`A new user with ${name} with ID ${id} is created`);
// }); // Listening to event

// myEmitter.on('userCreated', (id, name)=>{
//     console.log(`A new user with ${name} with ID ${id} has been added to database`);
//     }); // Listening to event

// myEmitter.emit('userCreated', 101, 'John'); // Event is emitted

// STREAMS - Process data piece by piece instead of all at once
// Advantages - Make data process more effecient by not storing all the data at once.
//Don't have to store all of the memory. Ex. YouTube/ NetFlix. You can start watching videos before all of it is downloaded

/**4 TYPES OF STREAMS * Streams are instances of Event Emitter class. They Emit and Listen
 * 1. READABLE STREAM - Most common. Read or consume data chunck by chunch.
 * ----- Example: Request Stream, and read file
 * ----- Important readable stream events are "data & end"
 * ----- Important readable stream methods are "read & pipe"
 * 2. WRITABLE STREAM - Most common. Writes data chunk by chunk
 * ----- Example: Response Stream & write file stream
 * ----- Important readable stream events are "Drain & Finish"
 * ----- Important readable stream methods are "Write & End"
 * 3. DUPLEX STREAM - Both readable and writable
 * ----- Example: Web Sockets
 * 4. TRANSFORM STREAM - Readable and Writable and can be modified or transformed
 * ----- Example: Zlib
*/
server.listen(8000, '127.0.0.1', () =>{
    console.log('server has started! and you are running on PORT: ' + 8000);
}) // port, host, and a callback

// Takes a long time to read all data. Makes the app slow. It's loading the entire file in the memory. Might crash the app
// server.on('request', (request, response)=>{
//     fs.readFile('./Files/largeFile.txt', (err, data) =>{
//         if(err){
//             response.end('Something went wrong');
//             return;
//         }
//         response.end(data);
//     })
// })

// Faster approach here... using STREAM
// server.on('request', (request, response)=>{
//     // let rs = fs.createReadStream('./Files/lardgeFile.txt'); // error
//     let rs = fs.createReadStream('./Files/largeFile.txt'); // no error
//     rs.on('data', (chunk)=>{
//         response.write(chunk);
//     })

//     rs.on('end', () =>{
//         response.end();
//     })

//     rs.on('error', (error)=>{
//         response.end(error.message);
//     })
//})

// USING PIPE METHOD
/* Pipe fixes back pressure and it's written in 2 lines of code. It can only be used with READABLE Stream
**********************************************************/
server.on('request', (request,response) =>{
    let rs = fs.createReadStream('./Files/largeFile.txt');
    rs.pipe(response);
})

// EVENT LOOP IN PRACTICE
// Top level executed in main thread. Once it's empty the event loop will start
console.log('Program has started');

// // Stored in the 1st phase. Set asynchrously
// setTimeout(()=>{
//     console.log('Timer callback executed');
// },0)

// Stored in the 2nd phase. This is an IO task
fs.readFile('./Files/input.txt', ()=>{
    console.log('file read complete');
setTimeout(()=>{
    console.log('Timer callback executed');
},0)

// Stored in the 3rd phase. 
setImmediate(()=>{
    console.log('setImmediate callback executed');
})
process.nextTick(()=> {console.log('Process.nextTick callback executed')})
})

// Top level executed in main thread. Once it's empty the event loop will start
console.log('Program has completed');



