const args = require('minimist')(process.argv.slice(2))

var Nullifier = require("../nullifier")

let  = args["pov"] || "buyer"

if (args["decode"] !== undefined){
    var message = args["decode"]
    console.log('\x1b[36m%s\x1b[32m%s\x1b[0m', "INPUT => ", message);
    var hasil = new Nullifier({
                        message: message,
                        pov: args["pov"]
                    }).decode()
    console.log('\x1b[36m%s\x1b[32m%s\x1b[0m', "OUTPUT => ", hasil);
}

if (args["encode"] !== undefined) {
    var message = args["encode"]

    console.log('\x1b[36m%s\x1b[32m%s\x1b[0m', "INPUT => ", message);
    var hasil = new Nullifier({
                        message: message,
                    }).encode()
    console.log('\x1b[36m%s\x1b[32m%s\x1b[0m', "OUTPUT => ", hasil);
}
