const contacts = require("./contacts");
const nanoid = require('nanoid');


const yargs = require('yargs');
const {hideBin} = require('yargs/helpers');


const {program}= require('commander');

const invokeAction = async({action,id,name,email,phone})=>{
    switch(action){
        case 'list':
            const allContacts = await contacts.listContacts();
            return console.table(allContacts);


        case 'get':
            const oneContact = await contacts.getContactById(id);
            
            return console.log(oneContact);

        case "add":
            const newContact = await contacts.addContact({name,email,phone});
            return console.log(newContact);

        case 'update':
            const update = await contacts.updateContact(id,{name,email,phone});
            return console.log(update);
        
        case 'remove':
           const deletedContact= await contacts.removeContact(id);
            return console.log(deletedContact);

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
       

        
}
//invokeAction({action:'list'});
//invokeAction({action:"get", id:"drsAJ4SHPYqZeG-83QTVW"});
//invokeAction({action:"add", name:"Jhon Weak", email:"JhonWeak@gmail.com", phone:"88003535"});
//invokeAction({action:"update",id:`uMVOnvfDh-6HxKJliRKps`, name:"Jhon Weaksed", email:"JhonWeak@gmail.com", phone:"88003535"});
//invokeAction({action:"remove",id:`ZwBjU8pJK3GN2nhtWFXQQ`});

/*const indexAction = process.argv.indexOf('--action');
if(indexAction!==-1){
    const action = process.argv[indexAction+1];
    invokeAction({action});
}*/

/*const arr = hideBin(process.argv);
const {argv} = yargs(arr);
invokeAction(argv);*/


program
.option("-a,--action, <type>")
.option("-i,--id, <type>")
.option("-n,--name, <type>")
.option("-e,--email, <type>")
.option("-p,--phone, <type>");

program.parse();
const options= program.opts();
invokeAction(options);
