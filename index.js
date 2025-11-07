const express = require('express')
const app = express()
const port = 3001


app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello Tama')
})

app.get('/parameter/:mhslpkia', (req, res) => {
  let dataMhs = req.params.mhslpkia;
  let listBlacklistMhs = ["ui", "root", "sys"];
  try {
    if (listBlacklistMhs.find(x => x === dataMhs).length > 0) {
      return res.status(200).json({
        "message": "anda termasuk dalam blacklist",
        "data_mhs_blacklist": listBlacklistMhs
      })
    }
  } catch (error) {
  }
    return res.status(200).json({
      "pesan": "anda tidak termasuk dalam blacklist",
      "data_mhs_blacklist": listBlacklistMhs
    })
  
})

app.post("/json", (req, res) => {
  // Jika content-type BUKAN application/json → error
  if (req.headers["content-type"] !== "application/json") {
    return res.status(400).json({
      "message": "error_bad_request",
      "details": "Invalid JSON"
    });
  }

  // Jika benar JSON → sukses
  return res.status(200).json({
    "message": "success",
    "data": req.body
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
