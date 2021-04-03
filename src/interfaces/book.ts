interface Book {
    title: string;
    author: string;
    ISBN: number;
    year: number;
    price: number;
    condition: "excellent" | "great" | 'good' | 'worn';
    courseSubject: string;
    courseNumber: number;
    pageCornersFolded: boolean;
    pagesAnnotated: boolean;
    university: string;
    images: string[];
  }
  
  export type { Book };
  