import boto3
import json
import base64
import re
import urllib
import os
import datetime

# eねを取得・更新するためのラムダです。
# APIエンドポイント
# https://4dka93an1g.execute-api.ap-northeast-1.amazonaws.com/Prod/enedbfuncTimeline
dynamo = boto3.client('dynamodb')

def lambda_handler(event, context):

    operations = {
        'GET': lambda dynamo, x: db_get(dynamo, x),
        'POST': lambda dynamo, x: db_post(dynamo, x),
        #'PUT': lambda dynamo, x: db_put(dynamo, x),
        #'DELETE': lambda dynamo, x: db_delete(dynamo, x),
    }

    print(event);

    operation = event['httpMethod']
    if operation in operations:
        if operation == 'GET':
            payload = event['queryStringParameters']
        else:
            payload = json.loads(event['body']);

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


# eねカード取得
#
# クエリパラメータ
# department: 所属部署（フィルタをかけるため）
# userid: ログインユーザーID（共感情報取得のため）
#
# 戻り値（JSON）
# {
#   result : 1（成功） もしくは 0（失敗）
#   error : エラーのときのメッセージ配列
#   data : {
#            [
#              "id": eねカードのID
#              "sender": { 送り主情報
#                "name": 名前
#                "imageurl" プロフィール画像
#              }
#              "reciever": { 受け取り主情報
#                  "name": 名前
#                  "imageurl" プロフィール画像
#              }
#              "contents": eね内容
#              "datetime": 更新時間
#              "empathyCount": 共感数
#              "hasEmpathized": 共感しているかどうか
#            ]
#   }
# }
def db_get(dynamo, x):

    department = str(x.get('department'))
#    pageNumber = int(x.get('pageNumber'))
    userid = str(x.get('userid'))

    result = dynamo.query(
        TableName = 'Ene_Messages',
        Limit = 20,
        ScanIndexForward = False,
        KeyConditionExpression = 'department = :department',
        ExpressionAttributeValues = {
            ':department' : { 'S' : department }
            }
        )

    print(json.dumps(result))

    if 'Items' not in result:
        return db_error('eねがありません')

    # ユーザー情報の取得
    # sender、recieverのidに紐づくユーザー情報を取得
    datalist = []
    for d in result['Items']:
        data = {}
        for k,v in d.items():
            if k == 'sender' or k == 'reciever':
                result = dynamo.get_item(
                    TableName = 'Ene_Users',
                    Key = { 'userid' : v },
                    AttributesToGet = [ 'name' , 'imageurl' ],
                    )
                data[k] = result['Item']
            elif k == 'empathyUsers':
                x = filter(lambda id:True if id['S'] == userid else False, v['L'])
                if len(list(x)) != 0 :
                    data['hasEmpathized'] = True
                else:
                    data['hasEmpathized'] = False
            else:
                data[k] = v

        datalist.append(data)

    return {
        'result' : 1,
        'error' : '',
        'data' : datalist
    }


# eね投稿
#
# {
#   body: {
#     data: {
#       department: 所属部署
#       sender: 送り主ユーザーID
#       reciever: 送り先ユーザーID
#       contents: 内容
#       empathy: 1（共感ボタン押下時）もしくは 0
#     }
#   }
# }
#
# 戻り値（JSON）
# {
#   result : 1（成功） もしくは 0（失敗）
#   error : エラーのときのメッセージ配列
#   data : {
#     設定されたデータ（形式は入力データと同じ）
#   }
def db_post(dynamo, x):

    empathy = x['data'].get('empathy')
    # 共感以外の場合
    if(empathy != '1'):
        print('POST');
        # 簡易的なエラーチェック
        if 'data' not in x:
            return db_error('データ構造が不正です')

        department = x['data'].get('department')
        contents   = x['data'].get('contents')
        reciever   = x['data'].get('reciever')
        sender     = x['data'].get('sender')

        # 簡易的なエラーチェック
        if str.strip(contents) == '':
            return db_error('いいね内容が空欄です')
        if not re.match(r"^\d+$", str(reciever)):
            return db_error('送り先IDが正しくありません')
        if not re.match(r"^\d+$", str(sender)):
            return db_error('送り主IDが正しくありません')

        # 連番取得
        id = str(next_seq())

        # システム日付取得
        sysdate = str(datetime.datetime.now())

        # DBに書き込む
        item = {
            'department' : {'S' : department},
            'id' : {'N' : id},
            'contents' : {'S' : contents},
            'reciever' : {'S' : reciever},
            'sender'   : {'S' : sender},
            'datetime' : {'S' : sysdate},
            'empathyCount' : {'N' : str(0)},
            'empathyUsers' : {'L' : []},
            }

        result = dynamo.put_item(
            TableName = 'Ene_Messages',
            Item = item
        )

        # ユーザー情報の取得
        # sender、recieverのidに紐づくユーザー情報を取得
        senderresult = dynamo.get_item(
                        TableName = 'Ene_Users',
                        Key = {'userid' : {'S' : sender}},
                        AttributesToGet = [ 'name' , 'imageurl' ],
                        )
        recieverresult = dynamo.get_item(
                        TableName = 'Ene_Users',
                        Key = {'userid' : {'S' : reciever}},
                        AttributesToGet = [ 'name' , 'imageurl' ],
                        )

        item = {
            'department' : {'S' : department},
            'id' : {'N' : id},
            'contents' : {'S' : contents},
            'reciever' : recieverresult['Item'],
            'sender'   : senderresult['Item'],
            'datetime' : {'S' : sysdate},
            'empathyCount' : {'N' : str(0)},
            'empathyUsers' : {'L' : []},
            }
    # 共感の場合
    else:
        print('empathy')
        department = x['data'].get('department')
        id = x['data'].get('id')
        userid = x['data'].get('userid')

        # 共感対象のeね取得
        result = dynamo.get_item(
            TableName = 'Ene_Messages',
            Key = {
                'department': { 'S' : department },
                'id' : { 'N' : id }
            },
            AttributesToGet = [ 'empathyUsers' , 'empathyCount' ]
            )

        data = {}
        for k,v in result['Item'].items():
                data[k] = v

        empathyUsers =  data.get('empathyUsers').get('L')
        empathyFlag = False
        for i, user in enumerate(empathyUsers):
            if empathyFlag == True:
                break
            if userid in user.values():
                response = dynamo.update_item(
                    TableName = 'Ene_Messages',
                    Key = {
                        'department': { 'S' : department },
                        'id' : { 'N' : id }
                    },
                    UpdateExpression = 'SET empathyCount = empathyCount - :val REMOVE empathyUsers['+str(i)+']',
                    ExpressionAttributeValues = {
                        ':val' : {'N' : '1'},
                    }
                    )
                empathyFlag = True

        # 共感していない場合、empathyCountを増やす
        if empathyFlag == False:
            response = dynamo.update_item(
            TableName = 'Ene_Messages',
            Key = {
                'department': { 'S' : department },
                'id' : { 'N' : id }
            },
            UpdateExpression = 'SET empathyCount = empathyCount + :val, empathyUsers = list_append(empathyUsers,:appendUser)',
            ExpressionAttributeValues = {
                ':val' : {'N' : '1'},
                ':appendUser' :{'L' :  [{'S' : userid}] }
            }
            )
        item = {}

    return {
        'result' : 1,
        'error' : '',
        'data' : item
    }


# 共感数更新
# なぜかPUTが叩けないので使っていない
#
# {
#   body: {
#     data: {
#       department: 所属部署
#       id: eねカードID
#       userid: 共感したユーザーのID
#     }
#   }
# }
#
# 戻り値（JSON）
# {
#   result : 1（成功） もしくは 0（失敗）
#   error : エラーのときのメッセージ配列
#   data : {
#     設定されたデータ（形式は入力データと同じ）
#   }
def db_put(dynamo, x):

    department = x['data'].get('department')
    id = x['data'].get('id')
    userid = x['data'].get('userid')

    # 共感対象のeね取得
    result = dynamo.get_item(
        TableName = 'Ene_Messages',
        Key = {
            'department': { 'S' : department },
            'id' : { 'N' : id }
        },
        AttributesToGet = [ 'empathyUsers' , 'empathyCount' ]
        )

    data = {}
    for k,v in result['Item'].items():
            data[k] = v

    empathyUsers =  data.get('empathyUsers').get('L')
    empathyFlag = False
    for i, user in enumerate(empathyUsers):
        print(i)
        print(user)
        if empathyFlag == True:
            break
        if userid in user.values():
            response = dynamo.update_item(
                TableName = 'Ene_Messages',
                Key = {
                    'department': { 'S' : department },
                    'id' : { 'N' : id }
                },
                UpdateExpression = 'SET empathyCount = empathyCount - :val REMOVE empathyUsers['+str(i)+']',
                ExpressionAttributeValues = {
                    ':val' : {'N' : '1'},
                }
                )
            empathyFlag = True

    # 共感していない場合、empathyCountを増やす
    if empathyFlag == False:
        response = dynamo.update_item(
        TableName = 'Ene_Messages',
        Key = {
            'department': { 'S' : department },
            'id' : { 'N' : id }

        },
        UpdateExpression = 'SET empathyCount = empathyCount + :val, empathyUsers = list_append(empathyUsers,:appendUser)',
        ExpressionAttributeValues = {
            ':val' : {'N' : '1'},
            ':appendUser' :{'L' :  [{'S' : userid}] }
        }
        )

    print(response)

    return {
        'result' : 1,
        'error' : '',
        'data' : ''
    }


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

def db_error(msg):
    return {
        'result' : 0,
        'error' : msg,
        'data' : {}
    }

# 次のシーケンス番号を返す関数
def next_seq():
    response = dynamo.update_item(
        TableName = 'Ene_Sequence',
        Key = {
            'tablename' : {'S' : 'Ene_Messages'}
        },
        ReturnValues = 'UPDATED_NEW',
        UpdateExpression = 'SET seq = seq + :val',
        ExpressionAttributeValues = {
            ':val' : {'N' : '1'}
        }
    )
    return int(response['Attributes']['seq']['N'])
