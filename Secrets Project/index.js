import express from "express"
import axios from "axios";
import bodyParser from "body-parser";


const app = express()
const port = 3000
const API_URL = "https://secrets-api.appbrewery.com";
const yourBearerToken = "d0ac67c7-72c1-43c0-9d46-df38164601bc";

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', async(req, res) => {
    try {
       const response = await axios.get('https://secrets-api.appbrewery.com/random');
       const data=response.data;
       res.render('index.ejs', { user: data.username, secret:data.secret});
    } catch (error) {
        console.error(error);
    }
});


app.get("/home", (req, res) => {
  res.render("home.ejs", { content: "Waiting for data..." });
});

//GET REQUEST
app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("home.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("home.ejs", { content: JSON.stringify(error.response.data) });
  }
});

//POST REQUEST
//URL+data+config(bearer token)
app.post("/post-secret", async (req, res) => {
  try {
    const result = await axios.post(API_URL + "/secrets/" , req.body, config);
    res.render("home.ejs", { content: JSON.stringify(result.data) });
    console.log(req.body)
  } catch (error) {
    res.render("home.ejs", { content: JSON.stringify(error.response.data) });
  }
});



//<form id="myForm" method="post"> thats why we use all of them app.post
//axios.get/put/delete vs is like postman request we sent a request from this url with axios
//PUT REQUEST
//with PUT request, we have to provide all of the data because we can change all info from server
//URL+data+config(bearer token)
app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.put(API_URL + "/secrets/"+searchId ,req.body, config);
    res.render("home.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("home.ejs", { content: JSON.stringify(error.response.data) });
  }
  
});


//PATCH REQUEST
//a PATCH request which remember, you can simply just change one thing. You don't have to provide all of the data.
//URL+data+config(bearer token)
app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.patch(API_URL + "/secrets/"+searchId ,req.body, config);
    res.render("home.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("home.ejs", { content: JSON.stringify(error.response.data) });
  }
  
});


//DELETE REQUEST
//URL+config(bearer token)
app.post("/delete-secret", async (req, res) => {
  //id came from name  <input type="text" name="id">
  const searchId = req.body.id;
  try {
    const result = await axios.delete(API_URL + "/secrets/"+searchId , config);
    res.render("home.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("home.ejs", { content: JSON.stringify(error.response.data) });
  }
});





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })