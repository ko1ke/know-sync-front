import DateFormatter from '../common/DateFormatter';

type Props = {
  date: string;
  author: string;
};

const AdminPostFooter = ({ date, author }: Props) => {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-lg">
          投稿日：
          <DateFormatter dateString={date} />
          　｜　投稿者：{author}
        </div>
      </div>
    </>
  );
};

export default AdminPostFooter;
