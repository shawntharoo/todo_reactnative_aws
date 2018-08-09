// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.

// Copyright 2017-2018 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.

// AWS Mobile Hub Project Constants
const awsmobile = {
    'aws_app_analytics': 'enable',
    'aws_cloud_logic': 'enable',
    'aws_cloud_logic_custom': [{"id":"2afxyhthoh","name":"todo","description":"task tracking","endpoint":"https://2afxyhthoh.execute-api.us-east-1.amazonaws.com/Development","region":"us-east-1","paths":["/items","/items/123"]},{"id":"vgc6reupok","name":"Pets","description":"","endpoint":"https://vgc6reupok.execute-api.us-east-1.amazonaws.com/Development","region":"us-east-1","paths":["/items","/items/123"]}],
    'aws_cognito_identity_pool_id': 'us-east-1:ddf37050-aa0c-435b-aa8f-7568858a464b',
    'aws_cognito_region': 'us-east-1',
    'aws_content_delivery': 'enable',
    'aws_content_delivery_bucket': 'todoreact-hosting-mobilehub-1083965034',
    'aws_content_delivery_bucket_region': 'us-east-1',
    'aws_content_delivery_cloudfront': 'enable',
    'aws_content_delivery_cloudfront_domain': 'd13en24cmd7ude.cloudfront.net',
    'aws_dynamodb': 'enable',
    'aws_dynamodb_all_tables_region': 'us-east-1',
    'aws_dynamodb_table_schemas': [{"tableName":"todoreact-mobilehub-1083965034-tasks","attributes":[{"name":"taskId","type":"S"},{"name":"userId","type":"S"},{"name":"assignGroup","type":"S"},{"name":"assignUser","type":"S"},{"name":"description","type":"S"},{"name":"dueDate","type":"S"},{"name":"title","type":"S"}],"indexes":[],"region":"us-east-1","hashKey":"taskId","rangeKey":"userId"},{"tableName":"todoreact-mobilehub-1083965034-pets","attributes":[{"name":"userId","type":"S"},{"name":"petId","type":"S"}],"indexes":[],"region":"us-east-1","hashKey":"userId","rangeKey":"petId"},{"tableName":"todoreact-mobilehub-1083965034-task","attributes":[{"name":"userId","type":"S"},{"name":"taskId","type":"S"},{"name":"assignGroup","type":"S"},{"name":"assignUser","type":"S"},{"name":"description","type":"S"},{"name":"dueDate","type":"S"},{"name":"title","type":"S"}],"indexes":[],"region":"us-east-1","hashKey":"userId","rangeKey":"taskId"}],
    'aws_mobile_analytics_app_id': 'e80e7788d1f04a0ab1fbf51bb0804e92',
    'aws_mobile_analytics_app_region': 'us-east-1',
    'aws_project_id': '55ba7ad2-c75a-45f3-926d-39a44203fa36',
    'aws_project_name': 'todo_react',
    'aws_project_region': 'us-east-1',
    'aws_push_pinpoint': 'enable',
    'aws_resource_bucket_name': 'todoreact-deployments-mobilehub-1083965034',
    'aws_resource_name_prefix': 'todoreact-mobilehub-1083965034',
    'aws_sign_in_enabled': 'enable',
    'aws_user_files': 'enable',
    'aws_user_files_s3_bucket': 'todoreact-userfiles-mobilehub-1083965034',
    'aws_user_files_s3_bucket_region': 'us-east-1',
    'aws_user_pools': 'enable',
    'aws_user_pools_id': 'us-east-1_LogS0OwDj',
    'aws_user_pools_mfa_type': 'ON',
    'aws_user_pools_web_client_id': '3kvduuk2bqpius2bgh56fc5d0g',
}

export default awsmobile;
