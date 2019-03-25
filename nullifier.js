'use strict'
/**
 * Encoder and Decoder for Mbiz chat module
 */
const Constant = require('./constants');

class Nullifier{

    constructor(data) {
        this.message    = data.message
        this.output     = {}
    }

    /**
     * Decode the Message
     * @param {String} pov 
     */
    decode(pov="buyer"){
        var msg     = this.message
        var newMsg 	= msg
        var res     = new RegExp(/\[([^}]*)\]/,'gm').exec(msg)
        
        if (res!==null){
            var arrayCode   = res[1].split("=")
            var obj 		= arrayCode[0]
            var objValue 	= arrayCode[1]
            switch(obj){
                case Constant.IMG:
                    var newObj = "<br/><img src="+objValue+" width='100'/>"
                    newMsg = msg.replace(res[0],newObj)
                    break;
                case Constant.PDF:
                    var newObj = "<img src='https://cdn2.iconfinder.com/data/icons/adobe-acrobat-pdf/154/adobe-acrobat-pdf-file-document-512.png' width='100'/>"
                    newMsg = msg.replace(res[0],newObj)
                    break;
                case Constant.RFQ:
                case Constant.QUOTATION:
                case Constant.PURCHASE_ORDER:
                    var url = "https://www.tokob2b.com/buyer/"
                    if (pov=="seller"){
                        url = "https://www.tokob2b.com/seller/"
                    }
                    var newObj = "<a href='"+url+"'>"+obj+" "+objValue+"</a>"
                    newMsg = msg.replace(res[0],newObj)
                    break;
            }
        }
        this.output = newMsg
        return this.output;
    }

    /**
     * Encode the message
     */
    encode() {
        var msg = this.message

        const regex      = /^(.*\s)*(([A-Z]{2,3}(?:-[0-9]+){3}))((\s)+.*)?$/
        const txNumRegex = /([A-Z]{2,3})(?:-[0-9]+){3}/g
        var res 		 = new RegExp(regex,'g').exec(message)
        var encodedMsg   = message
        console.log("REGEX RES: ", res)
        
        if (res !== null) {
            var encodedTxNum = "[" + res[2].replace('-','=') + "]"
            encodedMsg = message.replace(txNumRegex, encodedTxNum)
            console.log("Encoded Tx: ", encodedTxNum)
    
        }

        this.output = encodedMsg
        return this.output;
    }
    
}

module.exports = Nullifier