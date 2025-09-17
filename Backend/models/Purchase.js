
const mongoose = require("mongoose");

const purchaseItemSchema = new mongoose.Schema({
  product_id:{type: mongoose.Schema.Types.ObjectId,ref: "Product", required: true},
  batch_no:{type:String},
  mfg_date:{type:Date},
  exp_date:{type:Date},
  qty:{type:Number},
  unit_price:{type:Number},
  discount:{type:Number},
  tax:{type:Number},
  line_total:{type:Number},
},
{timestamps:true});

const purchaseSchema = new mongoose.Schema({
  supplier_id:{type: mongoose.Schema.Types.ObjectId,ref: "Supplier",required: true},
  invoice_no:{type:String,required:true},
  invoice_date:{type:Date,required:true},
  warehouse_id:{type:mongoose.Schema.Types.ObjectId,ref: "Warehouse",required: true},
  items:[purchaseItemSchema],
  subtotal:{type:Number},
  discount_amount:{type:Number},

  other_charges:{type:Number},
  round_off:{type:Number},
  grand_total:{type:Number},
  paid_amount:{type:Number},
  due_amount:{type:Number},
  payment_mode:{type:String},
  notes:{type:String},
}, { timestamps: true });

module.exports = mongoose.model("Purchase", purchaseSchema);
