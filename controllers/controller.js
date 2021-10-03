//backend functions


exports.my_function = (req, res)=> {
    
    var myjsondata=[  
        {"name":"Ram", "email":"Ram@gmail.com"},  
        {"name":"Bob", "email":"bob32@gmail.com"}  
    ]  

    console.log(req.body);
    res.json(myjsondata)
};



exports.my_function_with_params = (req, res)=> {
    res.send('hola mundo con parametros: ' + req.params.id);
};
