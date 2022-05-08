import React from 'react';

const MarkdownExample = () => {
  return (
    <div>
      <table className="mx-auto overflow-x-scroll whitespace-no-wrap my-4 border-collapse border-2 border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2 text-gray-800">
              スタイル名称
            </th>
            <th className="border border-gray-400 px-4 py-2 text-gray-800">
              記述例
            </th>
            <th className="border border-gray-400 px-4 py-2 text-gray-800">
              表示
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2">見出し１</td>
            <td className="border border-gray-400 px-4 py-2"># ハロー</td>
            <td className="border border-gray-400 px-4 py-2">
              <p className="text-3xl">ハロー</p>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">見出し２</td>
            <td className="border border-gray-400 px-4 py-2">## ハロー</td>
            <td className="border border-gray-400 px-4 py-2">
              <p className="text-2xl">ハロー</p>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">見出し３</td>
            <td className="border border-gray-400 px-4 py-2">### ハロー</td>
            <td className="border border-gray-400 px-4 py-2">
              <p className="text-xl">ハロー</p>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">斜体</td>
            <td className="border border-gray-400 px-4 py-2">_ハロー_</td>
            <td className="border border-gray-400 px-4 py-2">
              <em>ハロー</em>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">太字</td>
            <td className="border border-gray-400 px-4 py-2">__ハロー__</td>
            <td className="border border-gray-400 px-4 py-2">
              <strong>ハロー</strong>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">取消線</td>
            <td className="border border-gray-400 px-4 py-2">~ハロー~</td>
            <td className="border border-gray-400 px-4 py-2">
              <del>ハロー</del>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">引用</td>
            <td className="border border-gray-400 px-4 py-2">{'>'} ハロー</td>
            <td className="border border-gray-400 px-4 py-2">
              <span className="border-l-2 px-1 text-gray-400">ハロー</span>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">文字色</td>
            <td className="border border-gray-400 px-4 py-2">
              {`<font color="Red">ハロー</font>`}
            </td>
            <td className="border border-gray-400 px-4 py-2">
              <p className="text-red-400">ハロー</p>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">番号付きリスト</td>
            <td className="border border-gray-400 px-4 py-2">
              <p>1. ハロー</p>
              <p>1. ハロー</p>
              <p>1. ハロー</p>
            </td>
            <td className="border border-gray-400 px-4 py-2">
              <ol>
                <li className="list-decimal ml-5">ハロー</li>
                <li className="list-decimal ml-5">ハロー</li>
                <li className="list-decimal ml-5">ハロー</li>
              </ol>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">箇条書きリスト</td>
            <td className="border border-gray-400 px-4 py-2">
              <p>- ハロー</p>
              <p>- ハロー</p>
              <p>- ハロー</p>
            </td>
            <td className="border border-gray-400 px-4 py-2">
              <ul>
                <li className="list-disc ml-5">ハロー</li>
                <li className="list-disc ml-5">ハロー</li>
                <li className="list-disc ml-5">ハロー</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">ハイパーリンク</td>
            <td className="border border-gray-400 px-4 py-2">
              [ハロー](&quot;リンク先のURL&ldquo;)
            </td>
            <td className="border border-gray-400 px-4 py-2">
              <a className="underline text-blue-600 hover:text-blue-800 cursor-pointer">
                ハロー
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MarkdownExample;
