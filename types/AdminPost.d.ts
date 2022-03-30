type AdminPost = {
  slug?: string;
  title: string;
  date: string;
  coverImage?: string;
  author: string;
  excerpt?: string;
  ogImage?: {
    url: string;
  };
  content: string;
};

export default AdminPost;
