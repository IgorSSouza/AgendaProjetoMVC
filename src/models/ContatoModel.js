const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({

    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }

});

const ContatoModel = mongoose.model('Contato', ContatoSchema);


class Contato {

    constructor(body){
        this.body = body;
        this.errors = [];
        this.contato = null;
    }
    
    buscaPorId = async function(id){
        if(typeof id !== 'string') return;
        const user = await ContatoModel.findById(id);
        return user;
    };

    async register(){
        this.valida();
        
        if (this.errors.length > 0) return;
        
        this.contato = await ContatoModel.create(this.body);
    };

    valida(){
        this.cleanUp();

        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido');
        };
        
        if (!this.body.nome){
            
            this.errors.push('O campo "Nome" é um campo obrigatório!');

        }; 
        
        if (!this.body.email && !this.body.telefone) {

            this.errors.push('Os campos "Email" ou "Telefone" precisam estar com valores.');
        };

    };

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] == '';
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
        };

    }

    async edit(id){
        if(typeof id !== 'string') return;
        
        this.valida();
        if(this.errors.length > 0){
            this.contato = await ContatoModel.findById(id); 
            return; 
        }else{
            this.contato = await ContatoModel.findByIdAndUpdate(id , this.body, {new: true});
        } 
        
    };
    
    delete = async function(id){
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findOneAndDelete({_id: id});
        return contato;
    }; 
    
};   



Contato.buscaContatos = async function(){
    const contatos = await ContatoModel.find()
    .sort({criadoEm: -1});
    return contatos;
}; 





module.exports = Contato;

// function Contato(body){
//     this.body = body;
//     this.errors = [];
//     this.contato = null;
// }

// Contato.prototype.register = async function(){
//     this.valida();

//     if(this.errors.length > 0) return;

//     this.contato = await ContatoModel.create(this.body);
// };

// Contato.prototype.valida = function(){
//     this.cleanUp();

//     if(this.body.email && !validator.isEmail(this.body.email)) {
//         this.errors.push('E-mail inválido');
//     }; 

//     if(!this.body.nome) this.body.errors.push('O campo "Nome" é um campo obrigatório!');

//     if(!this.body.email && !this.body.telefone){

//         this.body.errors.push('Os campos "Email" ou "Telefone" precisam estar com valores.');
//     };



// }

// Contato.prototype.cleanUp = function(){
//     for(const key in this.body){
//         if(typeof this.body[key] !== 'string'){
//             this.body[key] == '';
//         }
//     }

//     this.body = {
//         nome : this.body.nome,
//         sobrenome : this.body.sobrenome,
//         email : this.body.email,
//         telefone : this.body.telefone,
//     };
// }
