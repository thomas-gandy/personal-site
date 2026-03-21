'use client'

import { useState } from 'react'
import { TextInput, Anchor, Text, Stack } from '@mantine/core'
import Link from 'next/link'
import type { NoteEntry } from '@/src/lib/getNotes'

export default function NotesSearch({ notes }: { notes: NoteEntry[] }) {
  const [query, setQuery] = useState('')
  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Stack>
      <TextInput
        placeholder="Search notes..."
        value={query}
        onChange={e => setQuery(e.currentTarget.value)}
      />
      {query && filtered.length === 0 ? (
        <Text c="dimmed">No notes match &quot;{query}&quot;</Text>
      ) : (
        <Stack gap="xs">
          {filtered.map(n => (
            <Anchor key={n.route} component={Link} href={n.route}>
              {n.title}
            </Anchor>
          ))}
        </Stack>
      )}
    </Stack>
  )
}
