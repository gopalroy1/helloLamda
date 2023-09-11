const aws = require('aws-sdk')
const { v1 } = require('uuid');

const dynamoDB = new aws.DynamoDB.DocumentClient({
    endpoint: 'https://8000-gopalroy1-hellolamda-qs3k2oizjq7.ws-us104.gitpod.io/'
})



exports.lambdaHandler = async (event, context) => {
    let headers = { 'Content-Type': 'application/json'};
    let data = JSON.parse(event.body);
    let params = {
        TableName:"BookTable",
        Item :{
            KEY_NAME :v1(),
            createdAt: new Date().getTime(),
            id:data.id,
        }
    }
    try {
        body = await dynamoDB.put((params)).promise();
        
 
    } catch (err) {
        console.log("In the catch block of the function ",err);
        return {
            statusCode: 400,
            body: JSON.stringify({
                Message:"Operation has been failed ",
                Error: err
            })
        }    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            Message:`${data.id} has been added in the database`,
            Sucess:true,
            item:JSON.stringify(data)
            
        })
    }
};