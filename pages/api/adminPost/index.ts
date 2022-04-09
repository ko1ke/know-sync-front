import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postDirectory = join(process.cwd(), 'markdown/adminPost');

export function getAdminPostSlugs() {
  return fs.readdirSync(postDirectory);
}

export function getAdminPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (data[field]) {
      items[field] = data[field];
    }
  });
  return items;
}

export function getAllAdminPosts(fields: string[] = []) {
  const slugs = getAdminPostSlugs();
  const posts = slugs.map((slug) => getAdminPostBySlug(slug, fields));
  // sort posts by date in descending order
  // .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
