const express = require('express'); // Imports the Express module
const path = require('path');       // Helps with file paths
const fs = require('fs');           // Allows us to work with the file system

const app = express();   // Creates the Express app
const port = 3000;       // Sets the port to listen on

// Route to serve files from "Assets" folder
app.get('/media/:filename', (req, res) => {
    const fileName = req.params.filename; // Extracts filename from URL
    const filePath = path.join(__dirname, 'Assets', fileName); // Builds path to the file in "Assets"
  
    // Check if the file exists in "Assets"
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send('File not found'); // Sends 404 if file doesn't exist
      }
  
      // Sends the file if it exists
      res.sendFile(filePath, (err) => {
        if (err) {
          res.status(500).send('Error serving file'); // Sends 500 if error occurs
        }
      });
    });
  });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
