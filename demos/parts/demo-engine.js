'use strict';
const PartsDemo=(()=>{
const initial=[['P-101','Feed assembly','SIM-A100',125000,12],['P-102','Drive belt','SIM-A100',95000,30],['P-103','Nozzle set','SIM-A100',65000,20],['P-201','Feed assembly','SIM-B200',180000,8],['P-202','Control board','SIM-B200',220000,4]];
const transitions={DRAFT:['APPROVED','CANCELLED'],APPROVED:['ORDERED','CANCELLED'],ORDERED:['DISPATCHED','CANCELLED'],DISPATCHED:['DELIVERED'],DELIVERED:[],CANCELLED:[]};
function empty(){return {parts:initial.map(([part_id,name,machine_model,unit_price_paisa,on_hand])=>({part_id,name,machine_model,unit_price_paisa,on_hand,reserved:0})),quotes:[]};}
function integer(value,min,max,name){if(!Number.isInteger(value)||value<min||value>max)throw Error(name+' is outside its allowed range.');return value;}
function create(state,p,today=new Date().toISOString().slice(0,10)){
const qty=integer(p.quantity,1,1000,'Quantity'),discount=integer(p.discount_bps,0,1000,'Discount'),tax=integer(p.tax_bps,0,10000,'Tax'),shipping=integer(p.shipping_paisa,0,1000000,'Shipping');
if(typeof p.buyer_reference!=='string'||!p.buyer_reference.trim()||p.buyer_reference.trim().length>60)throw Error('Use a demo reference of 1–60 characters.');
const part=state.parts.find(x=>x.part_id===p.part_id);if(!part||part.machine_model!==p.machine_model)throw Error('Part is incompatible with this model.');
const merchandise=qty*part.unit_price_paisa,discountAmount=Math.floor((merchandise*discount+5000)/10000),taxable=merchandise-discountAmount+shipping,taxAmount=Math.floor((taxable*tax+5000)/10000);
const date=new Date(today+'T00:00:00Z');date.setUTCDate(date.getUTCDate()+7);
const q={quote_id:'DEMO-'+String(state.quotes.length+1).padStart(4,'0'),buyer_reference:p.buyer_reference.trim(),part_id:part.part_id,name:part.name,machine_model:part.machine_model,quantity:qty,total_paisa:taxable+taxAmount,merchandise_paisa:merchandise,discount_paisa:discountAmount,tax_paisa:taxAmount,shipping_paisa:shipping,status:'DRAFT',created_date:today,expires_date:date.toISOString().slice(0,10),events:[{to_status:'DRAFT',event_time:new Date().toISOString()}]};state.quotes.unshift(q);return q;
}
function move(state,id,next,today=new Date().toISOString().slice(0,10)){
const q=state.quotes.find(x=>x.quote_id===id);if(!q||!transitions[q.status].includes(next))throw Error('This status transition is not allowed.');const part=state.parts.find(x=>x.part_id===q.part_id);
if(next==='APPROVED'){if(today>q.expires_date)throw Error('Quote has expired.');if(part.on_hand-part.reserved<q.quantity)throw Error('Insufficient available stock.');part.reserved+=q.quantity;}
if(next==='CANCELLED'&&['APPROVED','ORDERED'].includes(q.status))part.reserved-=q.quantity;
if(next==='DISPATCHED'){part.reserved-=q.quantity;part.on_hand-=q.quantity;}
q.status=next;q.events.push({to_status:next,event_time:new Date().toISOString()});return q;
}return {empty,create,move,transitions};})();
if(typeof module!=='undefined')module.exports=PartsDemo;
