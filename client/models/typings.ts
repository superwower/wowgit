export type ID = string;

export interface IRepository {
  __typename: string;
  id: ID;
  name: string | null;
  src: string;
}
