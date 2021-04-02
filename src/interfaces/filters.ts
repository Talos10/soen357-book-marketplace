interface Filters {
    title?: string;
    author?: string;
    ISBN?: number;
    year?: number;
    prices?: number[];
    isAbove?: boolean;
    conditions?: string[];
    courseSubject?: string;
    courseNumber?: number;
    pageCornersFolded?: boolean;
    pagesAnnotated?: boolean;
    university?: string;
    hasPictures?: boolean;
  }
  
  export type { Filters };
  