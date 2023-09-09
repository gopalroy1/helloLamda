const aws = require('aws-sdk')
aws.config.update({ endpoint: 'https://8000-gopalroy1-hellolamda-qs3k2oizjq7.ws-us104.gitpod.io:8000' });
const dynamoDB = new aws.DynamoDB({ apiVersion: '2012-08-10' });


// const AWS = require('aws-sdk');
// const dynamoDB = new AWS.DynamoDB.DocumentClient();

// const dynamoDB = new AWS.DynamoDB({
//     region:'us-east-1',
//     endpoint:'https://8000-gopalroy1-hellolamda-qs3k2oizjq7.ws-us104.gitpod.io:8000',
// })
// const dynamodb =  new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event, context) => {
    
    console.log(dynamoDB)
    let response;
    let tableName="MOVIES";
    let found=false;
    try {
        const path = event.requestContext.path;
        
        
        const params = {
            TableName: "Movies",
            KeySchema: [
              { name: "name", KeyType: "HASH" } //Partition key
            ],
            AttributeDefinitions: [
              { name: "name", AttributeType: "S" }
            ],
            ProvisionedThroughput: {
              ReadCapacityUnits: 1,
              WriteCapacityUnits: 1
            }
          };
        

        // function for simple hello world 
        switch (path) {
            case ("/hello"):
                if(event.httpMethod=="GET"){
                    found=true;
                    response = {
                        'statusCode':200,
                        'body':JSON.stringify({
                            'message':"Ye hai ek hellow world function",
                            'path':path ,
                            'EventMethod':event.httpMethod
                        })
                    }
                }
                break;
            case("/add"):
                if(event.httpMethod=="POST")
                found=true;
            
                let req = JSON.parse(event.body) 
                
            
                const {id,name,price}=req;
                // console.log(id,name,price)
                // await dynamoDB.putItem({
                //       'TableName': 'Movies',
                //       'Item': {
                //         name: {S:"fjsl"},
                //       },
                //     }
                //   ).promise()

                dynamodb.createTable(params,function (err,data){
                    if(err)
                        console.log(err);
                    else{
                        console.log(data);
                    }
                })
                response={
                    statusCode:200,
                    body:JSON.stringify({
                        message:"Ye hai post function",
                        'path':path,
                        'EventMethod':event.httpMethod
                    })
                }
            // default:
            //     response = {
            //         'statusCode':400,
            //         body:JSON.stringify({
            //             'message':"Sorry bro path nahi mila",
            //             'path':path,
            //             'EventMethod':event.httpMethod
            //         })
            //     }
            //     break;
        }
        if(found===false){

            response = {
                'statusCode':400,
                body:JSON.stringify({
                    'message':"Sorry bro aur switchcase ke bahar",
                    'path':path,
                    'EventMethod':event.httpMethod
                })
            }
        }
        // TableName="MoviesNew"
        // console.log("Event hai ",event)
        // console.log("Db interaction se pahle tak")
        // const body = dynamodb.scan({
        //     TableName,
        // })
        // .promise();

        // console.log('DB Interaction ke baad : Item created successfully');
        // console.log(event);
        //  response = {
        //                 'statusCode': 200,
        //                 'body': JSON.stringify({
        //                     'message': 'data added in db',
        //                     'b':event.requestContext.path,
                          
        //                 })
        //             }
        return response;
    } catch (err) {
        console.log(err);
        response = {
            'statusCode': 405,
            'body': JSON.stringify({
                'message': err,
              
            })
        }
        return response;
    }
};