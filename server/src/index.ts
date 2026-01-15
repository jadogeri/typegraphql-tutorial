

import app from './app';
//import { connect } from './data-source.js';

const PORT = 3000;

// await connect(); // Ensure database connection is established

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

