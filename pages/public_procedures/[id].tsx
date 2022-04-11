import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ProcedureFormProps } from '../../types/Procedure';
import MyProcedurePreview from '../../components/myProcedure/MyProcedurePreview';

type Props = {
  procedure: ProcedureFormProps & { id: number };
};

const DetailProcedure: React.FC<Props> = ({ procedure }) => {
  const title = `投稿閲覧 - ${procedure.title}`;
  const body = procedure.title.trim().replace(/[ \r\n]/g, '');
  const description = body.length < 140 ? body : body.substring(0, 140) + '...';
  const ogpImageUrl = `${process.env.NEXT_PUBLIC_FRONT_API_DOMAIN}/api/public_procedures/${procedure.id}/ogp`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" key="description" content={description} />
        <meta
          property="og:description"
          key="ogDescription"
          content={description}
        />
        <meta property="og:image" key="ogImage" content={ogpImageUrl} />
        <meta
          name="twitter:card"
          key="twitterCard"
          content="summary_large_image"
        />
        <meta name="twitter:image" key="twitterImage" content={ogpImageUrl} />
      </Head>

      {procedure.publish ? (
        <div className="max-w-5xl w-full mx-auto z-10">
          <MyProcedurePreview
            title={procedure.title}
            content={procedure.content}
            steps={procedure.steps}
          />
        </div>
      ) : (
        <>非公開につき閲覧できません</>
      )}
    </>
  );
};

export default DetailProcedure;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_FRONT_API_DOMAIN +
      `/api/public_procedures/${query.id}`
  );
  const json = await res.json();
  json.procedure.id = query.id;
  return { props: json };
};
