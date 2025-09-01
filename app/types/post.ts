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
