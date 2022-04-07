import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import useAuthByToken from '../hooks/useAuthByToken';
import { useSelector } from '../store';
import { idSelector } from '../selectors/auth';
import { useDispatch } from 'react-redux';
import { signOut } from '../slices/auth';
import toast from 'react-hot-toast';

const navigation = [
  { title: '公開投稿閲覧', href: '/public_procedures', authRequired: false },
  { title: '投稿作成／管理', href: '/my_procedures', authRequired: true },
  { title: '登録', href: '/sign_up', authRequired: false },
  { title: 'ログイン', href: '/sign_in', authRequired: false },
  { title: '利用規約', href: '/admin_posts/term', authRequired: false },
  { title: 'ポリシー', href: '/admin_posts/policy', authRequired: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  useAuthByToken();
  const router = useRouter();
  const userId = useSelector(idSelector);
  const dispatch = useDispatch();

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href="/">
                      <a className="text-white px-3 py-2 rounded-md text-lg font-medium">
                        DANDORI
                      </a>
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => {
                        {
                          return item.authRequired === true ? (
                            userId && (
                              <Link key={item.title} href={item.href}>
                                <a
                                  className={classNames(
                                    router.pathname === item.href
                                      ? 'bg-gray-900 text-white'
                                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'px-3 py-2 rounded-md text-sm font-medium'
                                  )}
                                >
                                  {item.title}
                                </a>
                              </Link>
                            )
                          ) : (
                            <Link key={item.title} href={item.href}>
                              <a
                                className={classNames(
                                  router.pathname === item.href
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'px-3 py-2 rounded-md text-sm font-medium'
                                )}
                              >
                                {item.title}
                              </a>
                            </Link>
                          );
                        }
                      })}
                      <button
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        onClick={() => {
                          dispatch(signOut());
                          toast.success('ログアウトしました');
                        }}
                      >
                        ログアウト
                      </button>
                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className={classNames(
                      router.pathname === item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
