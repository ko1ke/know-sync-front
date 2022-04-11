import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import useAuthByToken from '../hooks/useAuthByToken';
import { useDispatch } from 'react-redux';
import { signOut } from '../slices/auth';
import toast from 'react-hot-toast';
import useNavigation from '../hooks/useNavigation';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  useAuthByToken();
  const router = useRouter();
  const dispatch = useDispatch();
  const { navigation } = useNavigation();
  const metaTitle = 'Dandori';
  const metaDescription = '手順作成＆公開ができるサービスです';

  return (
    <>
      <Head>
        <meta name="description" key="description" content={metaDescription} />
        <meta property="og:title" key="ogTItle" content={metaTitle} />
        <meta property="og:site_name" key="ogSiteName" content={metaTitle} />
        <meta
          property="og:description"
          key="ogDescription"
          content={metaDescription}
        />
      </Head>
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
                        {navigation.map((item) => (
                          <Link key={item.name} href={item.path}>
                            <a
                              className={classNames(
                                router.pathname === item.path
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                            >
                              {item.name}
                            </a>
                          </Link>
                        ))}
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
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.path}
                      className={classNames(
                        router.pathname === item.path
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                  <span
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                    onClick={() => {
                      dispatch(signOut());
                      toast.success('ログアウトしました');
                    }}
                  >
                    ログアウト
                  </span>
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
    </>
  );
};

export default Layout;
