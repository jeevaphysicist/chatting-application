console.log("node.js working part");
const {uuidv1} = require("uuid");
const {randomUUID} = require('crypto');
const shortid =require('shortid');

// console.log("uuid",uuidv1);
// console.log("randomUIID",randomUUID());
// console.log("randomUIID1",randomUUID());
console.log("short_id",shortid.generate().toUpperCase());

let friends = ["XCMDCDC","mvfvfvfv","NDVNFVNVN","KVNDIVNDVND","bfbnfnfbn"];
let filter=[];

friends.map((items,index)=>{
    console.log("items : ",items);
   filter.push({items});
})
console.log("filters = ",filter);










