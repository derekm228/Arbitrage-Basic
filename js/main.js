

/////////////////////////////////////////////////////
///////////////// Get CEX Balance ///////////////////
/////////////////////////////////////////////////////

var userID = 'up113852226';
var secret = '5cI2HOz0cG3Bg8DiyZvh39PC9A';

var cexData = {};
cexData.key = 'yUv5pjCyAP2G2IS96WO1sQ4cLE';
cexData.nonce = Date.now();
cexData.signature = CryptoJS.enc.Hex.stringify(
   CryptoJS.HmacSHA256(cexData.nonce + userID + cexData.key, secret)).toUpperCase();

var body = JSON.stringify(cexData);

var cexAccount = new XMLHttpRequest();
cexAccount.open("POST", "https://cex.io/api/balance/", false);
cexAccount.setRequestHeader('Content-type','application/json; charset=utf-8');

cexAccount.onload = function () {
   var cexAccountResponse = JSON.parse(cexAccount.responseText);
   if (cexAccount.readyState == 4 && cexAccount.status == "200") {
      console.table(cexAccountResponse);
      $("#cexBalance").text(cexAccountResponse.USD.available);
   } else {
      console.error(cexAccountResponse);
   }
}
cexAccount.send(body);


/////////////////////////////////////////////////////
////////////////// Get CEX Price ////////////////////
/////////////////////////////////////////////////////

var cexBTC = new XMLHttpRequest();
cexBTC.open("GET", "https://cex.io/api/ticker/BTC/USD", false);
cexBTC.send();

var cexBTC_response = JSON.parse(cexBTC.response);
$("#cexPrice").text(cexBTC_response.last);


/////////////////////////////////////////////////////
/////////////// Get Coinapult Price /////////////////
/////////////////////////////////////////////////////

var Coinapult = new XMLHttpRequest();
Coinapult.open("GET", 'https://api.coinapult.com/api/ticker/', false);
Coinapult.send();

var coinapultResponse = JSON.parse(Coinapult.response);

$("#coinapultPrice").text(coinapultResponse.index);


/////////////////////////////////////////////////////
///////////////// Get Exmo Price ////////////////////
/////////////////////////////////////////////////////

var Exmo = new XMLHttpRequest();
Exmo.open("GET", 'https://api.exmo.com/v1/trades/?pair=BTC_USD', false);
Exmo.send();

var exmoResponse = JSON.parse(Exmo.response);

$("#exmoPrice").text(exmoResponse["BTC_USD"][0].price);




/////////////////////////////////////////////////////
/////////////// Get CryptoCap Stuff /////////////////
/////////////////////////////////////////////////////

var key = '325bc332ff8bbb73e6ca9ae7a7050efc';
var secret = '3301554432d6c329a5a8f92f9789ec16';
var command = 'ACCOUNTS';
var nonce = Date.now();
var message = command + nonce;
var signature = CryptoJS.SHA1(message + key + secret);

var Crypto = new XMLHttpRequest();
Crypto.open("GET", "https://api.cryptocapital.co/v4/ACCOUNTS", false);
Crypto.setRequestHeader('key', key);
Crypto.setRequestHeader('message', message);
Crypto.setRequestHeader('signature', signature);
Crypto.setRequestHeader('nonce', nonce);
Crypto.send();

var cryptoResponse = JSON.parse(Crypto.response);
$("#cryptoBalance").text(cryptoResponse[0].balance);


/////////////////////////////////////////////////////
///////////////// Get CEX Orders ////////////////////
/////////////////////////////////////////////////////

var userID = 'up113852226';
var secret = '5cI2HOz0cG3Bg8DiyZvh39PC9A';

var cexData = {};
cexData.key = 'yUv5pjCyAP2G2IS96WO1sQ4cLE';
cexData.nonce = Date.now();
cexData.dateTo = 1506998111953;
cexData.signature = CryptoJS.enc.Hex.stringify(
   CryptoJS.HmacSHA256(cexData.nonce + userID + cexData.key, secret)).toUpperCase();

var body = JSON.stringify(cexData);

var cexOrders = new XMLHttpRequest();
cexOrders.open("POST", "https://cex.io/api/archived_orders/BTC/USD", false);
cexOrders.setRequestHeader('Content-type','application/json; charset=utf-8');

cexOrders.onload = function () {
   var cexOrdersResponse = JSON.parse(cexOrders.responseText);
   if (cexOrders.readyState == 4 && cexOrders.status == "200") {
      console.table(cexOrdersResponse);
      $("#cexOrder1_id").text(cexOrdersResponse[0].id);
      $("#cexOrder1_amount").text(cexOrdersResponse[0].amount);
      $("#cexOrder1_USD").text(cexOrdersResponse[0]['ta:USD']);

      $("#cexOrder2_id").text(cexOrdersResponse[1].id);
      $("#cexOrder2_amount").text(cexOrdersResponse[1].amount);
      $("#cexOrder2_USD").text(cexOrdersResponse[1]['ta:USD']);
   } else {
      console.error(cexOrdersResponse);
   }
}
cexOrders.send(body);
