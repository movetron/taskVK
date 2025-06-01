export type Field = {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date';
};

export type RecordType = {
  id: number;
  [key: string]: string | number;
};

export type Record = {
  id: number;
  name: string;
  age: number;
  email: string;
  city: string;
  profession: string;
};