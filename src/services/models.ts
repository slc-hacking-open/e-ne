export interface User {
  // ユーザID
  userid: string
  // 所属部署
  department: string
  // ユーザ名
  name: string
  // プロフィール
  profile: string
  // プロフィール画像URL
  imageurl: string
}

export interface Post {
  // 所属部署
  department: string
  // いいねID
  id: string
  // 送信者
  sender: User
  // 受信者
  receiver: User
  // いいね内容
  contents: string
  // 投稿日時（ISO8061）
  datetime: string
  // 共感された数
  empathyCount: number
  // ログインユーザーが共感してるか
  hasEmpathized: boolean
}

export interface Timeline {
  // 表示中のページ番号
  pageNumber: number
  // 最大のページ番号
  pageSize: number
  // 投稿リスト
  posts: Post[]
}

// APIが返してくるデータ
export interface APIPost {
  id: { N: string }
  sender: {
    name: { S: string }
    imageurl: { S: string }
  }
  reciever: {
    name: { S: string }
    imageurl: { S: string }
  }
  department: { S: string }
  datetime: { S: string }
  contents: { S: string }
  empathyCount: { N: number }
  hasEmpathized: boolean
}
