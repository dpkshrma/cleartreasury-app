import React from "react";
import groq from "groq";
import Page from "../../components/page/Page";
import Link from "next/link";
import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_CMS_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_CMS_DATASET,
  useCdn: process.env.NODE_ENV === "development",
});

type Data = {
  title: string;
  _id: string;
  slug: {
    _type: string;
    current: string;
  };
  content: {
    key: string;
    _type: string;
  }[];
}[];
const groqQuery = groq`*[
  _type == "productguide"
]`;

const Help = (): JSX.Element => {
  const [data, setData] = React.useState<Data | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(groqQuery);
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <Page>
      <div className="m-12">
        <h1 className="text-4xl">Help and support</h1>
      </div>
      <div className="bg-theme-color-surface p-12">
        <ul>
          {data?.map(
            ({ _id, title, slug }) =>
              slug && (
                <li key={_id} className="lg:max-w-4xl mx-auto">
                  <Link href="/help[slug]" as={`/help${slug.current}`}>
                    <a className="bg-teal-50 p-4 mb-2 flex items-center w-full">
                      <h4 className="m-0 p-0 text-2xl leading-tight">
                        {title}
                      </h4>
                    </a>
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
    </Page>
  );
};

export default Help;
