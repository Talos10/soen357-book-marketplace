interface Book {
    title: string;
    titleArray: string[];
    author: string;
    authorArray: string[];
    ISBN: string;
    year: number;
    price: number;
    condition: "AS NEW" | "VERY GOOD" | 'GOOD' | 'FAIR' | 'POOR';
    courseSubject: string;
    courseNumber: number;
    pageCornersFolded: boolean;
    pagesAnnotated: boolean;
    university: string;
    images: string[];
  }
  
  export type { Book };
  