import markdownStyles from './markdown-styles.module.css';
import Title from '../common/Title';

type Props = {
  title: string;
  content: string;
};
const AdminPostBody = ({ title, content }: Props) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Title text={title} />
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default AdminPostBody;
