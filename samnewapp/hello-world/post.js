const aws = require('aws-sdk')
const { v1 } = require('uuid');

const dynamoDB = new aws.DynamoDB.DocumentClient({
    endpoint: process.env.DYNAMODB_URL,
})



exports.lambdaPost = async (event, context) => {
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
        return {
            statusCode: 200,
            body: JSON.stringify({
                message:`${data.id} has been added in the database`,
                sucess:true,
            })
        }
 
    } catch (err) {
        console.log("In the catch block of the function ",err);
        return {
            statusCode: 400,
            body: JSON.stringify({
                Message:"Operation has been failed ",
                Error: err
            })
        }    }

};