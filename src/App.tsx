import 'bootstrap/dist/css/bootstrap.min.css';
import { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NewNote } from './NewNote';
import { useLocalStorage } from './useLocalStorage';
import { v4 as uuidV4 } from 'uuid';
import { type NoteData, type RawNote, type Tag } from './types';
import { NoteList } from './NoteList';
import { Note } from './Note';
import { NoteLayout } from './NoteLayout';
import { EditNote } from './EditNote';
import ContextContainer from './ContextContainer';
import Footer from './components/Footer';
import { initialQuestions, initialTags } from './Context/formattedQuestions';

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>(
    'NOTES',
    initialQuestions
  );
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', initialTags);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note,
        tags: tags.filter(tag => note.tagIds?.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ];
    });
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag]);
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(note => note.id) };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id);
    });
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }
  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id);
    });
  }

  return (
    <ContextContainer className='my-4'>
      <Routes>
        <Route
          path='/'
          element={
            <NoteList
              availableTags={tags}
              notes={notesWithTags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        ></Route>
        <Route
          path='/new'
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        ></Route>
        <Route path='/:id' element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path='edit'
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path='*' element={<Navigate to='/' />}></Route>
      </Routes>
      <Footer />
    </ContextContainer>
  );
}

export default App;
