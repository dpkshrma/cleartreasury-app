import * as React from "react";
import Link from "next/link";
import SanityBlockContent from "@sanity/block-content-to-react";

type BlockProps = {
  className: string;
  content: {
    key: string;
    _type: string;
  }[];
};

const List = (props) => {
  switch (props.type) {
    case "number":
      return <ol className="mb-4 leading-normal ml-8">{props.children}</ol>;

    default:
      return <ul className="mb-4 leading-normal ml-8">{props.children}</ul>;
  }
};

const ListItem = ({ children }) => <li className="mb-2">{children}</li>;

const internalLink = ({ mark, children }) => (
  <Link href={mark.slug.current}>
    <a className="underline text-teal-700 hover:no-underline">{children}</a>
  </Link>
);

const externalLink = ({ mark, children }) => (
  <a
    className="underline text-teal-700 hover:no-underline"
    target={mark.blank ? "_blank" : undefined}
    href={mark.href}
    rel="noreferrer"
  >
    {children}
  </a>
);

const imageWithAlt = ({ node: { alt, asset } }) => (
  <img
    alt={alt}
    src={asset.metadata.lqip}
    data-src={`${asset.url}?w=640&fit=crop&auto=format`}
    data-srcset={`
        ${asset.url}?w=640&fit=crop&auto=format 640w,
        ${asset.url}?w=768&fit=crop&auto=format 768w,
        ${asset.url}?w=1024&fit=crop&auto=format 1024w,
        ${asset.url}?w=1280&fit=crop&auto=format 1280w,
        ${asset.url} 1600w,
      `}
    data-sizes="auto"
    className="w-full lazyload"
  />
);

const address = (props) => {
  const { address } = props.node;

  if (!address) return false;

  const street = address.streetAddress.split(/\r?\n/);

  return (
    <div>
      <p className="text-xl">{address.city} office</p>
      <p>
        {street.map((elem, index) => (
          <span key={index}>
            {elem}
            <br />
          </span>
        ))}
        {address.city}
        <br />
        {address.postcode}
        <br />
        {address.country}
      </p>
      <p>{address.phoneNumber}</p>
    </div>
  );
};

const BlockContent: React.FC<BlockProps> = ({ content, className }) => {
  return (
    <SanityBlockContent
      className={className}
      renderContainerOnSingleChild={true}
      blocks={content}
      serializers={{
        marks: { internalLink, externalLink },
        types: { imageWithAlt, address },
        list: List,
        listItem: ListItem,
      }}
      projectId={process.env.NEXT_PUBLIC_CMS_PROJECT_ID}
      dataset={process.env.NEXT_PUBLIC_CMS_DATASET}
    />
  );
};

export default BlockContent;
