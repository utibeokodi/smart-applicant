const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './frontend/' });
const handle = app.getRequestHandler();
const { userRoutes } = require('./backend/src/routes/userRoutes.js');

app.prepare()
  .then(() => {
    const server = express();

    // Parse JSON request bodies
    server.use(express.json());

    // Parse cookies
    server.use(cookieParser());

    // Use the user routes at the /api path
    server.use('/api', userRoutes);

    // This is the catch-all route for Next.js pages
    server.all('*', (req, res) => handle(req, res));

    const port = process.env.PORT || 3000; // Fallback to 3000 if PORT is not set
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`Server running on http://localhost:${port}`);
    });

  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
