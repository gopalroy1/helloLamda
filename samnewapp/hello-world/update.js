const aws = require('aws-sdk')
const dynamoDB = new aws.DynamoDB.DocumentClient({
    endpoint: 'https://8000-gopalroy1-hellolamda-qs3k2oizjq7.ws-us104.gitpod.io/'
})


exports.UpdateLambda = async (event, context) => {
    

    let reqBody = JSON.parse(event.body);
    let id = reqBody?.id;
    let name = reqBody?.name;
    
    // const newId = parseInt(event.multiValueQueryStringParameters.id[0]);

    const params = {
        TableName : "BookTable",
        Item:{id:id,name:name}
      };
      let item=null;
      let data = null;
    try {
         data = await dynamoDB.put(params).promise();
         item = data.item;
        
 
    } catch (err) {
        console.log("In the catch block of the function ",err);
        return {
            statusCode: 400,
            body: JSON.stringify({
                Message:"Operation has been failed ",
                Error: err
            })
        }    }
        console.log(data)
    return {
        statusCode: 200,
        body: JSON.stringify({
            Message:`The requried items have been updated `,
            item:JSON.stringify(data),
            Sucess:true,
            
        })
    }

};