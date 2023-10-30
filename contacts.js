const fs = require("fs/promises");

const path = require('path');

const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname,'db/contacts.json');
const listContacts = async()=>{
    const data = await fs.readFile(`${contactsPath}`, "utf-8");//можна без utf-8, бо буфер зникає через json.parse
    return JSON.parse(data);
}

const getContactById = async(id)=>{
    const contacts = await listContacts();
    const rezult = contacts.find(item=>item.id===id);
    return rezult||null;
}
const addContact = async(data)=>{
    const newContact = {
        id:nanoid(),
        ...data
    }
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts,null,2));//стригифай запишить все не водну строку а норамльно
    return newContact;
}

const updateContact = async(id,data)=>{
    const contacts = await listContacts();
    const index = contacts.findIndex(item=>item.id===id);
    if(index===-1){
        return null;
    }
    contacts[index]= {id, ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts,null,2));
    return contacts[index];
}
const removeContact = async(id)=>{
    const contacts = await listContacts();
    const index = contacts.findIndex(item=>item.id===id);
    if(index===-1){
        return null;
    }
    const [rezult] = contacts.splice(index,1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts,null,2));
    return rezult;

}
module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact
}