export type Post = {
  id: number;
  coverImage: string;
  title: string;
  description: string;
  content: string;
  author: {
    name: string;
  };
  published: boolean;
};

export type RecommendedPost = {
  id: number;
  coverImage: string;
  title: string;
  description: string;
  content: string;
  name: string;
  published: boolean;
};
