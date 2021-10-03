// Display list of all Authors.
exports.my_function = function(req, res) {
    //res.send('hola mundo sin parametros');
    res.json({ username: 'Flavio' })
};


// Display detail page for a specific Author.
exports.my_function_with_params = function(req, res) {
    res.send('hola mundo con parametros: ' + req.params.id);
};
