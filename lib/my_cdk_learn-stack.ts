import * as cdk from 'aws-cdk-lib';
import { aws_lambda as lambda, aws_iam as iam } from 'aws-cdk-lib';



export class MyCdkLearnStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  
    const fn = new lambda.Function(this, 'MyFuncFromCDK', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "hi"); }'),
      handler: 'index.handler',
    })

    const fnUrl = fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, 'TheUrl', {
      value: fnUrl.url,
    });
  }
}