// import modules
const Hapi = require('@hapi/hapi');
const { routes } = require('./routes');

// init fuction
const init = async () => {
    // Hapi server
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    });
    
    // handle route
    server.route(routes);
    
    // start server
    await server.start();
    
    // show url which server running
    console.log(`Server berjalan pada ${server.info.uri}`);

}

// intial
init();