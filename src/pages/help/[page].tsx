import * as React from "react";
import groq from "groq";
import { useRouter } from "next/router";
import Page from "../../components/page/Page";
import BlockContent from "../../components/block-content/BlockContent";
import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_CMS_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_CMS_DATASET,
  useCdn: process.env.NODE_ENV === "development",
});

type Data = {
  title: string;
  content: {
    key: string;
    _type: string;
  }[];
};
const groqQuery = groq`*[
  _type == "productguide" && slug.current == $slug
][0]`;

const HelpArticle = (): JSX.Element => {
  const { query } = useRouter();

  const [data, setData] = React.useState<Data | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(groqQuery, {
        slug: `/${query.page}` || "",
      });
      setData(data);
    };
    fetchData();
  }, [query.page]);

  return (
    <Page>
      <div className="m-12">
        <h1 className="text-4xl">{data?.title}</h1>
      </div>
      <div className="bg-theme-color-surface p-12">
        {data?.content && (
          <BlockContent content={data.content} className="prose" />
        )}
      </div>
    </Page>
  );
};

export default HelpArticle;
