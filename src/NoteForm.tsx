import { Row, Col, Form, Stack, Button } from 'react-bootstrap';
import CreatableReactSelect from 'react-select/creatable';
import { Link, useNavigate } from 'react-router-dom';
import { type FormEvent, useRef, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { type NoteFormProps, type Tag } from './types';
import CustomButton from './Button';
import './NoteForm.css';

export default function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = '',
  markdown = '',
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value, // since these values are required they'll never be null
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate('..');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                className='input'
                required
                ref={titleRef}
                defaultValue={title}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={label => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags(prev => [...prev, newTag]);
                }}
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map(tag => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    background: state.isFocused
                      ? 'var(--primary)'
                      : 'var(--primary)',
                  }),
                  menu: (baseStyles, state) => ({
                    ...baseStyles,
                    background: 'var(--primary)',
                  }),
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='markdown'>
          <Form.Label>Body</Form.Label>
          <Form.Control
            required
            as='textarea'
            defaultValue={markdown}
            ref={markdownRef}
            rows={15}
            className='input'
          />
        </Form.Group>
        <Stack direction='horizontal' gap={2} className='justify-content-end'>
          <Button type='submit' className='bg-dark'>
            Save
          </Button>
          <Link to='..'>
            <CustomButton type='button' variant='outline-success'>
              Cancel
            </CustomButton>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
