export type RawMetaDataType = {
  title: string;
  date: Date;
  author: string;
  categories: string[];
  tags: string[];
  toc?: {
    enable?: boolean;
    auto?: boolean;
  };
  linkToMarkdown?: boolean;
  math?: { enable?: boolean };
};

export type MetaDataType = RawMetaDataType & {
  id: string;
  postFilename: string;
};
