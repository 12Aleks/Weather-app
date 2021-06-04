const context = require.context('./assets/icons/', true, /.png$/);

const obj = {};
context.keys().forEach((key) => {
    const weatherIcon = key.split('./').pop() // remove the first 2 characters
         .substring(0, key.length - 6); // remove the file extension
    obj[weatherIcon] = context(key);
});

export default obj;
