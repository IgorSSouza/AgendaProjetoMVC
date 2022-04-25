const Contato = require("../models/ContatoModel");

exports.index = (req, res) => {
    res.render('contato', {
        user : {}
    });
};

exports.register = async (req, res) => {
    
    try{
        const contato = new Contato(req.body);
        await contato.register();
        
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('index'));  
            return;
        }
            
            req.flash('success', 'Contato registrado com sucesso!');
            req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));  
        return;
    }catch(e){
        console.log(e);
        return res.render('404');
    }
    
}; 

exports.editIndex =  async (req, res) => {
    if(!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    const user = await contato.buscaPorId(req.params.id);

    if(!user) return res.render('404');

    res.render('contato', {user});

};