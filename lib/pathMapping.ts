export default [
  {
    name: '公開投稿一覧',
    path: '/public_procedures',
    authRequired: false,
    useOnNav: true,
  },
  {
    name: '公開投稿閲覧',
    path: '/public_procedures/[id]',
    authRequired: false,
    useOnNav: false,
  },
  {
    name: 'マイ投稿一覧',
    path: '/my_procedures',
    authRequired: true,
    useOnNav: true,
  },
  {
    name: '投稿作成',
    path: '/my_procedures/new,',
    authRequired: true,
    useOnNav: false,
  },
  {
    name: '投稿編集',
    path: '/my_procedures/[id],',
    authRequired: true,
    useOnNav: false,
  },

  { name: '登録', path: '/sign_up', authRequired: false, useOnNav: true },
  { name: 'ログイン', path: '/sign_in', authRequired: false, useOnNav: true },
  {
    name: '利用規約',
    path: '/admin_posts/term',
    authRequired: false,
    useOnNav: true,
  },
  {
    name: 'ポリシー',
    path: '/admin_posts/policy',
    authRequired: false,
    useOnNav: true,
  },
];
