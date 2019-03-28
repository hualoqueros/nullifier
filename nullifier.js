'use strict'
/**
 * Encoder and Decoder for Mbiz chat module
 */
const Constant = require('./constants');

class Nullifier{

    constructor(data) {
        this.message    = data.message
        this.pov        = data.pov || "buyer"
        this.output     = {}
    }

    /**
     * Decode the Message
     * @param {String} pov 
     */
    decode(){
        var pov     = this.pov
        var msg     = this.message
        var newMsg 	= msg
        var res     = new RegExp(/\[([^}]*)\]/,'gm').exec(msg)
        
        if (res!==null){
            var arrayCode   = res[1].split("=")
            var obj 		= arrayCode[0]
            var objValue 	= arrayCode[1]
            switch(obj){
                case Constant.IMG:
                    var newObj = "<img src='" + Constant.LICH_URL + objValue+"' width='100'/>"
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
                    var newObj = "<a href='"+url+"'>"+obj+"-"+objValue+"</a>"
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

        const regexTransaction   = /^(.*\s)*(([A-Z]{2,3}(?:-[0-9]+){3}))((\s)+.*)?$/
        var resTransaction		 = new RegExp(regexTransaction,'g').exec(msg)
        var encodedMsg           = msg
        
        if (resTransaction !== null) {
            var encodedTxNum = "[" + resTransaction[2].replace('-','=') + "]"
            encodedMsg = msg.replace(resTransaction[2], encodedTxNum)
    
        } else {
            const regexFile          = /\b(https?:\/\/)?((img|assets)\.mbizmarket\.co\.id)(\/[a-zA-Z0-9-_\/]+)(\.(jpg|jpeg|png|pdf|xlsx?))\b/
            var resFile              = new RegExp(regexFile, 'g').exec(msg)

            if (resFile !== null) {
                var encodedFilePath

                switch(resFile[6]) {
                    case "jpg":
                    case "jpeg":
                    case "png":
                    case "gif":
                        encodedFilePath = "[IMG=" + resFile[0] +"]"
                        break

                    case "pdf":
                        encodedFilePath = "[PDF=" + resFile[0] +"]"
                        break

                    case "xls":
                    case "xlsx":
                        encodedFilePath = "[XLS=" + resFile[0] +"]"
                        break
                }

                encodedMsg = msg.replace(resFile[0], encodedFilePath)
            }
        }

        this.output = encodedMsg
        return this.output;
    }
    
}

module.exports = Nullifier