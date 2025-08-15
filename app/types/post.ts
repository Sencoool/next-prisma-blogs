export type Post = {
  id: number;
  coverImage: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  published: boolean;
};
