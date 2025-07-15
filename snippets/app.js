const crypto = require('crypto');

function findHash(prefix) {
    let n = 0;
    while(true) {
        inputString  = "harkirat => Raman | Rs 100  Ram => Ankit | Rs 10" + n.toString();
        const hash = crypto.createHash('sha256').update(inputString).digest('hex');

        if(hash.startsWith(prefix)) {
            return n;
        }
        n++;
    }
}

const prefix = '00000';
const result = findHash(prefix);
console.log(`Answer is: '${result}'`);
