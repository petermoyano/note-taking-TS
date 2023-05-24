import NoteForm from './NoteForm';
import { NoteData, Tag, type NewNoteProps } from './types';

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
  return (
    <>
      <h1 className='mb-4'>Create a new note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
