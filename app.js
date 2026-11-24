'use strict';
const $=id=>document.getElementById(id);
const stock=$('stock');
function renderDecision(){const onHand=Number(stock.value),position=onHand+12,order=position<=42?Math.ceil(Math.max(0,84-position)/6)*6:0;$('stock-value').textContent=onHand+' units';$('decision-tag').textContent=order?'Review an order':'No order suggested';$('order-result').textContent=order?order+' units':'Stock above trigger';$('decision-explanation').textContent='Inventory position: '+position+' units. '+(order?'At or below the 42-unit reorder point.':'Above the 42-unit reorder point.');}
stock.addEventListener('input',renderDecision);renderDecision();
$('logic-toggle').addEventListener('click',()=>{const expanded=$('logic-toggle').getAttribute('aria-expanded')==='true';$('logic-toggle').setAttribute('aria-expanded',String(!expanded));$('logic').hidden=expanded;$('logic-toggle').textContent=expanded?'Show the reasoning':'Hide the reasoning';});
try{if(localStorage.getItem('nikunj-theme')==='dark')document.body.classList.add('dark');}catch{}
function themeLabel(){const dark=document.body.classList.contains('dark');$('theme').textContent=dark?'Light mode':'Dark mode';$('theme').setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');}themeLabel();
$('theme').addEventListener('click',()=>{document.body.classList.toggle('dark');themeLabel();try{localStorage.setItem('nikunj-theme',document.body.classList.contains('dark')?'dark':'light');}catch{}});
$('copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('nikunjgalaiya0909@gmail.com');$('copy-status').textContent='Email address copied.';}catch{$('copy-status').textContent='Email: nikunjgalaiya0909@gmail.com';}});
