export type Note = {
  id: string;
} & NoteData;

export interface NoteData {
  title: string;
  markdown: string;
  tags: Tag[];
}

export interface Tag {
  id: string;
  label: string;
}
export type RawNote = {
  id: string;
} & RawNoteData;

export interface RawNoteData {
  title: string;
  markdown: string;
  tagIds: string;
}

export interface NewNoteProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

export interface NoteFormProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

export interface NoteListProps {
  availableTags: Tag[];
  notes: SimplifiedNote[];
}

export interface SimplifiedNote {
  tags: Tag[];
  title: string;
  id: string;
}

export interface NoteLayoutProps {
  notes: Note[];
}
