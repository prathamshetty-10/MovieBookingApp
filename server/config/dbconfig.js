
import mysql from 'mysql'
const config={
    host:'sql6.freesqldatabase.com',//localhost
    user:'sql6695204',//root
    password:'IcySLKWXzm',//empty''
    database:'sql6695204',//test
    port:3306//remove this for localhost
  
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