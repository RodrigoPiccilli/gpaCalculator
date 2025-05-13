const express = require('express');
const PORT = 5000;

const server = express();
server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
