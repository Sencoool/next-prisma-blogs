export interface Post {
  id: number;
  coverImage: string;
  title: string;
  description: string;
  content: string;
  author: {
    name: string;
  };
  published: boolean;
}

export interface RecommendedPost {
  id: number;
  coverImage: string;
  title: string;
  description: string;
  content: string;
  name: string;
  published: boolean;
}
