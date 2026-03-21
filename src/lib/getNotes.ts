import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import fg from 'fast-glob'

export interface NoteEntry {
  route: string
  title: string
}

export function getNotes(): NoteEntry[] {
  const notesDir = path.join(process.cwd(), 'src/app/notes')
  return fg.sync('**/page.mdx', { cwd: notesDir })
    .flatMap(file => {
      const { data } = matter(fs.readFileSync(path.join(notesDir, file), 'utf8'))
      if (!data.title) return []
      const route = '/notes/' + path.dirname(file)
      return [{ route, title: data.title as string }]
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}
