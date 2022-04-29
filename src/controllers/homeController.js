const Contato = require("../models/ContatoModel");

exports.index = async (req, res) => {
    const contatos = await Contato.buscaContatos();

    if(!req.session.user){
        res.render('404');
    }else{
        res.render('index', {contatos});
    }

    
};

