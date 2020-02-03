export interface User {
  id: string;
  department: string;
  name: string;
  profile: string;
  imageurl: string;
}

export interface Post {
  id: string;
  sender: User;
  receiver: User;
  contents: string;
  datetime: string;
  empathyCount: number;
}

export interface Timeline {
  pageNumber: number;
  pageSize: number;
  posts: Post[];
}
