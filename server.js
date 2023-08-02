const express = require('express');
const next = require('next');
//const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './frontend/' });
const handle = app.getRequestHandler();
//const { userRoutes } = require('./backend/src/routes/userRoutes.js');

app.prepare()
  .then(() => {
    const server = express();

    // Parse JSON request bodies
    //server.use(express.json());

    // Parse cookies
    //server.use(cookieParser());

    // Use the user routes at the /api path
    //server.use('/api', userRoutes);

    // This is the catch-all route for Next.js pages
    server.all('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('Ready on http://localhost:3000');
    });
  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
