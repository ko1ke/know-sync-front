import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import PostBody from '../../components/adminPost/AdminPostBody';
import PostFooter from '../../components/adminPost/AdminPostFooter';
import { getAdminPostBySlug, getAllAdminPosts } from '../../lib/api/adminPost';
import Head from 'next/head';
import markdownToHtml from '../../lib/markdownToHtml';
import AdminPost from '../../types/AdminPost';

type Props = {
  post: AdminPost;
  preview?: boolean;
};

const Post: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <PostBody title={post.title} content={post.content} />
      <PostFooter date={post.date} author={post.author} />
    </>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getAdminPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
  ]);

  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllAdminPosts(['slug']);

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      };
    }),
    fallback: false,
  };
}
