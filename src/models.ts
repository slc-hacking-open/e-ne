export interface User {
  id: string;
  department: string;
  name: string;
}

export interface Post {
  id: string;
  sender: User;
  receiver: User;
  contents: string;
  datetime: string;
  empathyCount: number;
}
