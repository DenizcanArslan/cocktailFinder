import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app=express();
const port=3000;
app.use(bodyParser.urlencoded({ extended: true }));

//static files 
app.use(express.static('public'))

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
//NOT FINISHED YET


/*
app.get("/", async (req,res)=>{

    try {

        const response= await axios.get(API_URL)
        const drinksLength=response.data.drinks.length;

        const rand=Math.floor(Math.random()*drinksLength);

        const result= response.data.drinks[rand];

        

        res.render("index.ejs",{data:result});

     



   

    } catch (error) {
        console.log("Failed to make request: ",error.message);
        res.render("index.ejs",{error:error.message});
    }

});

*/

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/search",async (req,res)=>{
const searchCocktail= req.body.searchCocktail;

try {
    const response= await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+searchCocktail);
    const drinksLength=response.data.drinks.length;

    const rand=Math.floor(Math.random()*drinksLength);

    const result= response.data.drinks[rand];

    

    res.render("index.ejs",{data:result});


} catch (error) {
    console.log("Failed to make request: ",error.message);
    res.render("index.ejs",{error:error.message});
}

console.log(searchCocktail);
});





app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})