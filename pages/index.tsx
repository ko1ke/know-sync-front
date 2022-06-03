import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import AOS from 'aos';
import Link from 'next/link';
import Button from '../components/common/Button';
import Image from 'next/image';
import 'aos/dist/aos.css';

const Home: NextPage = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      easing: 'ease-out-sine',
      duration: 600,
    });
  }, []);

  return (
    <div className="pt-32 pb-12 px-6 md:pt-40 md:pb-20 md:px-8">
      <div className="text-center pb-16 md:pb-20">
        <h1
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8 leading-normal"
          data-aos="zoom-y-out"
        >
          あなたの当たり前は {}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">
            誰かの特別
          </span>
          <span className="text-sm">……かもしれない</span>
        </h1>
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xl text-gray-600 mb-6"
            data-aos="zoom-y-out"
            data-aos-delay="150"
          >
            自分の知識や経験をもとに、手順の作成＆公開をしてみよう。知識の共有の輪を広げよう。
          </p>
          <div
            className="mx-auto sm:max-w-none sm:flex sm:justify-center"
            data-aos="zoom-y-out"
            data-aos-delay="300"
          >
            <div className="sm:mx-4">
              <Link href={`/public_procedures`}>
                <a>
                  <Button text="公開されている手順を見てみる" color="blue" />
                </a>
              </Link>
            </div>
            <div className="sm:mx-4">
              <Link href={`/sign_up`}>
                <a>
                  <Button text="ユーザー登録する" color="green" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pb-10 md:pb-14">
        <h2
          className="text-4xl md:text-5xl font-bold tracking-widest leading-normal"
          data-aos="zoom-y-out"
        >
          特長
        </h2>
        <div
          className="sm:flex sm:gap-4 px-12 my-12 sm:my-20"
          data-aos="fade-right"
        >
          <div className="flex-1 my-3 sm:my-0">
            <h3 className="text-2xl md:text-3xl font-bold my-3">
              マークダウン形式でスタイルを設定可能
            </h3>
            <p className="text-lg text-gray-600">
              タイトルや強調、箇条書きやハイパーリンクなどの装飾を手順の記載内容に設定できます。プレーンなテキストよりもメリハリがつき、見どころがわかりやすい文書をデザインできます。
            </p>
          </div>
          <div className="flex-1">
            <Image
              src="/markdown.gif"
              alt="markdown"
              width={1000}
              height={710}
            />
          </div>
        </div>
        <div
          className="sm:flex sm:gap-4 sm:flex-row-reverse px-12 my-12 sm:my-20"
          data-aos="fade-left"
        >
          <div className="flex-1 my-3 sm:my-0">
            <h3 className="text-2xl md:text-3xl font-bold my-3">
              公開・非公開の切り替え可能
            </h3>
            <p className="text-lg text-gray-600">
              個人的なメモを書きたい、のようなプライベートな用途の場合は、投稿編集画面にて「公開する」のチェックを外せば非公開となり、外部から閲覧できないようになります。
            </p>
          </div>
          <div className="flex-1">
            <Image
              src="/publication-switch.gif"
              alt="publication-switch"
              width={632}
              height={483}
            />
          </div>
        </div>
        <div
          className="sm:flex sm:gap-4 px-12 my-12 sm:my-20"
          data-aos="fade-right"
        >
          <div className="flex-1 my-3 sm:my-0">
            <h3 className="text-2xl md:text-3xl font-bold my-3">
              Twitterで簡単にシェア
            </h3>
            <p className="text-lg text-gray-600">
              ボタンを押せば、公開中の投稿を簡単にシェアできます。
            </p>
          </div>
          <div className="flex-1">
            <Image
              src="/twitter-share.gif"
              alt="twitter-share"
              width={896}
              height={471}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
