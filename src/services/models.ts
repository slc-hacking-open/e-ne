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
  // いいねコイン所持数
  enecoin: number
  // グリココイン所持数
  glicocoin: number
}

export interface Post {
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
  // 共感ユーザーのリスト
  empathyUsers: User[]
  // 共感された数
  empathyCount: number
  // ログインユーザーが共感してるか
  hasEmpathized: boolean
  // 送ったコイン数
  amount: number
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
  id: string
  sender: User
  receiver: User
  department: string
  datetime: string
  contents: string
  empathyUsers: User[]
  amount: number
}
