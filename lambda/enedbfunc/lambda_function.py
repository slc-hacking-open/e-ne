import sys
import logging
import pymysql
import os
import json
import boto3
import re
import base64

# ユーザー情報を操作するためのラムダです。
# ・マイページ用のユーザー情報取得

# プロフィール画像格納先S3バケット
BACKETNAME = os.environ.get('SAVEBACKETNAME')
BACKETURL = os.environ.get('SAVEBACKETURL')

dynamo = boto3.client('dynamodb')


def lambda_handler(event, context):

    # httpMethodに応じて処理を振り分け
    operations = {
        'GET'   : lambda dynamo, x: db_get(dynamo, x),
#        'POST'  : lambda dynamo, x: db_post(dynamo, x),
#        'PUT'   : lambda dynamo, x: db_post(dynamo, x),
#        'DELETE': lambda dynamo, x: db_delete(dynamo, x),
    }

    operation = event['httpMethod']
    if operation in operations:
        payload = event['queryStringParameters'] if operation == 'GET' else json.loads(event['body'])
        return respond(operations[operation](dynamo, payload))

    # CORS対応
    elif operation == 'OPTIONS':
        return {
            'statusCode': '200',
            'body': '',
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : ','.join(operations),
                'Access-Control-Allow-Headers' : 'Origin, Authorization, Accept, Content-Type'
            },
        }

    else:
        return respond(ValueError('Unsupported method "{}"'.format(operation)))


# ユーザー情報取得
#
# クエリパラメータ
# id=取得するID
# 省略時は全データ
#
# 戻り値（JSON）
# {
#   result : 1（成功） もしくは 0（失敗）
#   error : エラーのときのメッセージ配列
#   data : {
#     userid : ユーザーID
#     department : 所属部署
#     imageurl : プロフィール画像URL
#     name : 名前
#     profile : プロフィール文
#   }
# }
def db_get(dynamo, x):
    print(json.dumps(x))

    # パラメータに取得するIDが設定されている場合
    id = x.get('userid') if x else None
    if id is not None and re.match(r"^\d+$", str(id)):
        # 該当idのものをクエリー
        result = dynamo.get_item(
            TableName = 'Ene_Users',
            Key = {
                'userid' : {'S' : str(id)}
            }
        )

        # ユーザー情報がない場合、エラーを返す
        if 'Item' not in result:
            return db_error('ユーザー情報がありません')

        # 戻り値を設定して返す
        data = {}
        print(json.dumps(result))
        for k, v in result['Item'].items():
            if 'S' in v:
                data[k] = v['S']
            elif 'N' in v:
                data[k] = int(v['N'])
            elif 'BOOL' in v:
                data[k] = v['BOOL']

        print(result['Item'])

        return {
            'result' : 1,
            'error' : '',
            'data' : data
        }

    # パラメータ省略時は全データ取得
    else:
        result = dynamo.scan(
            TableName = 'Ene_Users'
        )

        # 戻り値を設定して返す
        rows = []
        for item in result['Items']:
            data = {}
            for k, v in item.items():
                if 'S' in v:
                    data[k] = v['S']
                elif 'N' in v:
                    data[k] = int(v['N'])
                elif 'BOOL' in v:
                    data[k] = v['BOOL']

            rows.append(data)

        return {
            'result' : 1,
            'error' : '',
            'data' : rows
        }


# レスポンス
def respond(res):
    print(json.dumps(res))
    return {
        'statusCode': '400' if res['error'] else '200',
        'body': str(res['error']) if res['error'] else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
    }


# エラー用
def db_error(msg):
    return {
        'result' : 0,
        'error' : msg,
        'data' : {}
    }
