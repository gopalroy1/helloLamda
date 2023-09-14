const aws = require('aws-sdk')
const dynamoDB = new aws.DynamoDB.DocumentClient({
    endpoint: process.env.DYNAMODB_URL
})


exports.getLambda = async (event, context) => {
    
    const newId = parseInt(event.multiValueQueryStringParameters.id[0]);
    const params = {
        TableName : "BookTable",
        Key: { id: newId },
      };
    try {
        let data = await dynamoDB.get(params).promise();       
        return {
            statusCode: 200,
            body: JSON.stringify({
                Message:`The requried items have been fetched `,
                item:data,
                eventhai:newId,
                Sucess:true,
                
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