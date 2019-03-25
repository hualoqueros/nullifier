var Nullifier = require("../nullifier")

var message = 'Berikut RFQ nya [RFQ=1]'
var hasil = new Nullifier({message: message})
                .decode("seller")
console.log(hasil)