export type MetaDataType = {
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
