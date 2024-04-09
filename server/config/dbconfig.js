
import mysql from 'mysql'
const config={
    host:'localhost', //sql6.freesqldatabase.com
    user:'root',//sql6695204
    password:'',//IcySLKWXzm
    database:'test',//sql6695204
    //port:3306//remove this for localhost
  
}

const db= mysql.createConnection(config);
const connecttodb=async()=>{
    try{
    const db= await mysql.createConnection(config);
    console.log('connected to database');}
    catch(error){
        console.log(error);
    }
    
};
export { connecttodb,db};