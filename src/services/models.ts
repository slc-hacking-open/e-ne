export interface User {
  // ユーザID
  id: string;
  // 所属部署
  department: string;
  // ユーザ名
  name: string;
  profile: string;
  imageurl: string;
}

// TODO: UserかPostに「誰がどのいいねに共感したか」を持たせないと連打できちゃう

export interface Post {
  // いいねID
  id: string;
  // 送信者
  sender: User;
  // 受信者
  receiver: User;
  // いいね内容
  contents: string;
  // 投稿日時（ISO8061）
  datetime: string;
  // 共感された数
  empathyCount: number;
}

export interface Timeline {
  // 表示中のページ番号
  pageNumber: number;
  // 最大のページ番号
  pageSize: number;
  // 投稿リスト
  posts: Post[];
}
