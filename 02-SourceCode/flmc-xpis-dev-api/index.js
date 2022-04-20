"use strict";
const createRouter = require("@arangodb/foxx/router");
const router = createRouter();
const joi = require("joi");
const db = require("@arangodb").db;
const aql = require("@arangodb").aql;
// const { getAuth } = require("./util");
const { context } = require("@arangodb/locals");

const partCollection = db._collection("Part");
const supplierCollection = db._collection("Supplier");
const partseriesCollection = db._collection("PartSeries");
const documentCollection = db._collection("Document");
const plantCollection = db._collection("Plant");
const ecnCollection = db._collection("ECN");
const part_supplierCollection = db._collection("part_supplier");
const part_seriesCollection = db._collection("part_series");
const part_documentCollection = db._collection("part_doc");
const part_plantCollection = db._collection("part_plant");
const plant_supplierCollection = db._collection("plant_supplier");
const part_ecnCollection = db._collection("part_ecn");
const wildcardRegex = /\*/g;

/** @type {{ collections: string; username: string; password: string; }} */
const cfg = context.configuration;

module.context.use(router);

// Basic Authentication implementation
// router.use((req, res, next) => {
//   const auth = getAuth(req);
//   if (!auth || !auth.basic) {
//     console.log("Did not match basic authentication");
//     next();
//   }
//   console.log("postman username: ");
//   console.log(username);
//   console.log("cfg username: ");
//   console.log(cfg.username);
//   const { username, password } = auth.basic;
//   if (username !== cfg.username || password !== cfg.password) {
//     res.throw(403, "Bad username or password");
//   }
//   next();
// });

//GET method to search for Parts by product_number
router
  .get("v2/part/:product_number", function (req, res) {
    res.send(req.params);
    const query = db._query(aql`
        FOR item IN ${partCollection}
        FILTER item.product_number LIKE ${req.pathParams.product_number.replace(
          wildcardRegex,
          "%" // Find and replace wildcard * by % for ArangoDB
        )}
        RETURN item
    `);
    res.json(query);
  })
  .pathParam(
    // Documentation for required attributes
    "product_number",
    joi.string().required(),
    "Part search by product_number"
  )
  .response(["application/json"], "Returns Parts by product_number")
  .summary("This endpoint retrieves part(s) by product_number.")
  .description("This endpoint retrieves part(s) by product_number.");


//GET method to search for Parts by organization, and product_number
router
.get("v2/part/:location/:product_number", function (req, res) {
  var user_input1 = req.pathParams.location;
  var user_input2 = req.pathParams.product_number;
  const query = db._query(aql`
      FOR item IN ${partCollection}
      FILTER item.organization LIKE ${user_input1}
      FILTER item.product_number LIKE ${user_input2.replace(wildcardRegex, "%")}
      RETURN item
  `);
  res.json(query);
})
.pathParam(
  "location",
  joi.string().required(),
  "Part search by location"
)
.pathParam(
  "product_number",
  joi.string().required(),
  "Part search by product_number"
)
.response(["application/json"], "Returns Parts by location and product_number")
.summary("This endpoint retrieves part(s) by location and product_number.")
.description("This endpoint retrieves part(s) by location and product_number.");


//GET method to search for Parts by organization, and description
router
.get("v2/part/:location/:description", function (req, res) {
var user_input1 = req.pathParams.location;
console.log(user_input1);
var user_input2 = req.pathParams.description;
console.log(user_input2);
const query = db._query(aql`
    FOR item IN ${partCollection}
    FILTER item.organization LIKE ${user_input1}
    FILTER item.description LIKE ${user_input2.replace(wildcardRegex, "%")}
    RETURN item
`);
res.json(query);
})
.pathParam(
"location",
joi.string().required(),
"Part search by location"
)
.pathParam(
"description",
joi.string().required(),
"Part search by description"
)
.response(["application/json"], "Returns Parts by location and description")
.summary("This endpoint retrieves part(s) by location and description.")
.description("This endpoint retrieves part(s) by location and description.");


//GET method to search for Parts by organization, and AGR
router
.get("v2/part/:location/:agr_min/:agr_max", function (req, res) {
  var user_input1 = req.pathParams.location;
  var user_input2 = int(req.pathParams.agr_min);
  var user_input3 = int(req.pathParams.agr_max);

  const query = db._query(aql`
      FOR item IN ${partCollection}
      FILTER item.organization LIKE ${user_input1}
      FILTER item.agr > ${user_input2} and item.agr < ${user_input3}
      RETURN item
  `);
  res.json(query);
})
.pathParam(
  "location",
  joi.string().required(),
  "Part search by location"
)
.pathParam(
  "agr_min",
  joi.string().required(),
  "Part search by agr"
)
.pathParam(
  "agr_max",
  joi.string().required(),
  "Part search by agr"
)
.response(["application/json"], "Returns Parts by location and agr")
.summary("This endpoint retrieves part(s) by location and agr.")
.description("This endpoint retrieves part(s) by location and agr.");

//GET method to search for Parts by organization, and EAU
router
.get("v2/part/:location/:eau_min/:eau_max", function (req, res) {
  var user_input1 = req.pathParams.location;
  var user_input2 = int(req.pathParams.eau_min);
  var user_input3 = int(req.pathParams.eau_max);

  const query = db._query(aql`
      FOR item IN ${partCollection}
      FILTER item.organization LIKE ${user_input1}
      FILTER item.eau > ${user_input2} and item.eau < ${user_input3}
      RETURN item
  `);
  res.json(query);
})
.pathParam(
  "location",
  joi.string().required(),
  "Part search by location"
)
.pathParam(
  "eau_min",
  joi.string().required(),
  "Part search by eau"
)
.pathParam(
  "eau_max",
  joi.string().required(),
  "Part search by eau"
)
.response(["application/json"], "Returns Parts by location and eau")
.summary("This endpoint retrieves part(s) by location and eau.")
.description("This endpoint retrieves part(s) by location and eau.");

//GET method to search for Parts by organization, and on hand inventory
router
.get("v2/part/:location/:inventory_min/:inventory_max", function (req, res) {
  var user_input1 = req.pathParams.location;
  var user_input2 = int(req.pathParams.inventory_min);
  var user_input3 = int(req.pathParams.inventory_max);

  const query = db._query(aql`
      FOR item IN ${partCollection}
      FILTER item.organization LIKE ${user_input1}
      FILTER item.inventory > ${user_input2} and item.inventory < ${user_input3}
      RETURN item
  `);
  res.json(query);
})
.pathParam(
  "location",
  joi.string().required(),
  "Part search by location"
)
.pathParam(
  "inventory_min",
  joi.number().required(),
  "Part search by inventory"
)
.pathParam(
  "inventory_max",
  joi.string().required(),
  "Part search by inventory"
)
.response(["application/json"], "Returns Parts by location and inventory")
.summary("This endpoint retrieves part(s) by location and inventory.")
.description("This endpoint retrieves part(s) by location and inventory.");


//GET method to search for Parts by organization, and drawing_number
router
.get("v2/part/:location/:drawing_number", function (req, res) {
var user_input1 = req.pathParams.location;
var user_input2 = req.pathParams.drawing_number;
const query = db._query(aql`
    FOR item IN ${part_documentCollection}
    FOR doc in ${documentCollection}
    FILTER item.drawing_number == ${user_input2.replace(wildcardRegex, "%")}
    FILTER item._to == doc._id
    FOR part in ${partCollection}
    FILTER item._from == part._id and part.organization LIKE ${user_input1}
    RETURN part
`);
res.json(query);
})
.pathParam(
"location",
joi.string().required(),
"Part search by location"
)
.pathParam(
"drawing_number",
joi.string().required(),
"Part search by drawing_number"
)
.response(["application/json"], "Returns Parts by location and drawing_number")
.summary("This endpoint retrieves part(s) by location and drawing_number.")
.description("This endpoint retrieves part(s) by location and drawing_number.");


//GET method to search for drawing by product_number (hyperlink for drawing number)
router
  .get("v2/drawing/:product_number", function (req, res) {
    var user_input = req.pathParams.product_number;
    const query = db._query(aql`
      for item IN ${part_documentCollection}
      for p in ${partCollection}
      filter p.product_number == ${user_input.replace(wildcardRegex, "%")}
      filter item._from == p._id
      for d in ${documentCollection}
      filter item._to == d._id
      return d
    `);
    res.json(query);
  })
  .pathParam(
    "product_number",
    joi.string().required(),
    "Drawing search by product_number"
  )
  .response(["application/json"], "Returns Drawing by product_number")
  .summary("This endpoint retrieves Drawing(s) by product_number.")
  .description("This endpoint retrieves Drawing(s) by product_number.");


//GET method to search where used upto next level by product_number (hyperlink for whereused)
router
  .get("v2/whereused/:product_number", function (req, res) {
    var user_input = req.pathParams.product_number;
    const query = db._query(aql`
      for item in ${partCollection}
      filter item.product_number == ${user_input.replace(wildcardRegex, "%")}
      for v,e,p in 1..1 inbound item ${part_bomCollection}
      return p
    `);
    res.json(query);
  })
  .pathParam(
    "product_number",
    joi.string().required(),
    "whereused by product_number"
  )
  .response(["application/json"], "Returns whereused by product_number")
  .summary("This endpoint retrieves whereused by product_number.")
  .description("This endpoint retrieves whereused by product_number.");


//GET method to search where used upto n level by product_number (hyperlink for whereused) (path)
router
  .get("v2/whereused/:product_number/:depth", function (req, res) {
    var user_input = req.pathParams.product_number;
    var n = int(req.pathParams.depth);
    const query = db._query(aql`
      for item in ${partCollection}
      let max = ${n}
      filter item.product_number == ${user_input.replace(wildcardRegex, "%")}
      for v,e,p in 1..max inbound item ${part_bomCollection}
      return p
    `);
    res.json(query);
  })
  .pathParam(
    "product_number",
    joi.string().required(),
    "whereused by product_number"
  )
  .pathParam(
    "depth",
    joi.string().required(),
    "whereused by depth"
  )
  .response(["application/json"], "Returns whereused by product_number")
  .summary("This endpoint retrieves whereused by product_number.")
  .description("This endpoint retrieves whereused by product_number.");

//GET method to search where used upto next top level by product_number (hyperlink for whereused) (vertex)
router
  .get("v2/whereusedvertex/:product_number", function (req, res) {
    var user_input = req.pathParams.product_number;
    const query = db._query(aql`
      for item in ${partCollection}
      filter item.product_number == ${user_input.replace(wildcardRegex, "%")}
      for v,e,p in 1..1 inbound item ${part_bomCollection}
      return v
    `);
    res.json(query);
  })
  .pathParam(
    "product_number",
    joi.string().required(),
    "whereused by product_number"
  )
  .response(["application/json"], "Returns whereused by product_number")
  .summary("This endpoint retrieves whereused by product_number.")
  .description("This endpoint retrieves whereused by product_number.");