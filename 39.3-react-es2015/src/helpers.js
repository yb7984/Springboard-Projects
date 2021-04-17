
/**
 *  returns a randomly selected item from array of items
 * @param {*} items 
 * @returns 
 */
const choice = (items)=>{
    return items[Math.floor(items.length * Math.random())];
};

/**
 *  removes the first matching item from items, 
 *  if item exists, and returns it. Otherwise returns undefined.
 * @param {*} items 
 * @param {*} item 
 * @returns 
 */
const remove = (items , item)=>{
    for (let i = 0 ; i < items.length ; i ++){
        if (items[i] === item){
            items.splice(i , 1);

            return item;
        }
    }

    return undefined;
};

export {choice , remove};