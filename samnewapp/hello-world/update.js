const aws = require('aws-sdk')
const dynamoDB = new aws.DynamoDB.DocumentClient({
    endpoint: process.env.DYNAMODB_URL,
})


exports.UpdateLambda = async (event, context) => {
    

    let reqBody = JSON.parse(event.body);
    let id = reqBody?.id;
    let name = reqBody?.name;
    const params = {
        TableName : "BookTable",
        Item:{id:id,name:name}
      };
    try {
        let data = await dynamoDB.put(params).promise();
        let item = data.item;
        
         return {
            statusCode: 200,
            body: JSON.stringify({
                Message:`The requried items have been updated `,
                item:data,
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