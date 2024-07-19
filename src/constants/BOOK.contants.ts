export interface BookModel {
   title: string;
   author: string;
   description: string;
   editorial: string;
   frontPage: string;
   backCover: string;
   pages: number;
   state: string;
}

export const NEW_BOOK: BookModel = {
   title: null,
   author: null,
   description: null,
   editorial: null,
   frontPage: null,
   backCover: null,
   pages: null,
   state: null,
};
