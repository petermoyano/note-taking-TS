export interface NoteData {
  title: string;
  markdown: string;
  tags: Tag[];
}

export interface RawNoteData {
  title: string;
  markdown: string;
  tagIds?: string[];
}

export type RawNote = {
  id: string;
} & RawNoteData;

export type Note = {
  id: string;
} & NoteData;

export interface Tag {
  id: string;
  label: string;
}

export interface RawTagData {
  label: string;
}

export type Theme = {
  theme: string;
};

export interface NewNoteProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

export interface EditNoteProps {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

export type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export interface NoteListProps {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
}

export interface SimplifiedNote {
  tags: Tag[];
  title: string;
  id: string;
}

export interface NoteLayoutProps {
  notes: Note[];
}

export interface NoteProps {
  onDelete: (id: string) => void;
}

export interface EditTagsModalProps {
  show: boolean;
  availableTags: Tag[];
  handleClose: () => void;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
}
