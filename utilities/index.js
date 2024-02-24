const itemsCont = require('../controllers/items');
const Util = {}

Util.buildAll = async function(data){
    
    let grid
    if(data.length > 0){
        grid += '<div class="item">'
        data.forEach(item => {
            grid += `<h2>${item.name}</h2>
            <p>${item.wholesale}</p>
            <p>${item.price}</p>
            <p>${item.quantity}</p>
            </div>`
            
        });
    }
    else{
        grid += "No data found"
    }
    return grid
}

module.exports = Util;