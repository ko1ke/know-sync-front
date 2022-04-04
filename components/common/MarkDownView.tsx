import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import highlight from 'highlight.js';
import markdownViewStyles from './markdown-view-styles.module.css';
import 'highlight.js/styles/github.css';

type Props = {
  str: string;
};

marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: (code, lang) => {
    return highlight.highlightAuto(code, [lang]).value;
  },
});

const MarkDownView: React.FC<Props> = ({ str }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    setHtml(marked(str));
  }, [str]);

  return (
    <>
      <div
        className={markdownViewStyles['markdown']}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      ></div>
    </>
  );
};

export default MarkDownView;
