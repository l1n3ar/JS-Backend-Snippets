const express = require("express")
const router = express.Router();

const controllers = require("./controllers.js")

router.get("/products", controllers.getProducts);
router.get("/products/edit", controllers.editProducts);
router.get("products/delete", controllers.deleteProduct);
router.get("products/:productId", controllers.getProductById);

//The way for a dynamic route is to put a colon in front of the route so that express treats it as a variable, in our case "productId" is dynamic.
//Always remember to put your dynamic route at the end as JavaScript parses code from top to bottom, so if you place the dynamic route first, it will always be picked up and the routes like edit and delete wont be picked up.




export default router;
