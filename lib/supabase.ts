import { supabase } from './supabaseClient'
import { Note } from './types'

export async function getNotes(): Promise<Note[]> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('in_bin', false) // Only get notes not in bin
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching notes:', error)
    return []
  }
  
  return data || []
}

export async function getBin(): Promise<Note[]> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('in_bin', true) // Only get notes in bin
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching bin notes:', error)
    return []
  }
  
  return data || []
}

export async function saveNotes(notes: Note[]) {
  for (const note of notes) {
    const { error } = await supabase
      .from('notes')
      .insert([{
        id: note.id,
        title: note.title,
        content: note.content,
        created_at: note.createdAt,
        in_bin: false
      }])
    
    if (error) {
      console.error('Error saving note:', error)
    }
  }
}

// Save to bin (move note to bin)
export async function saveBin(binNotes: Note[]) {
  for (const note of binNotes) {
    const { error } = await supabase
      .from('notes')
      .update({ in_bin: true })
      .eq('id', note.id)
    
    if (error) {
      console.error('Error moving note to bin:', error)
    }
  }
}

// Restore note from bin
export async function restoreNote(id: string) {
  const { error } = await supabase
    .from('notes')
    .update({ in_bin: false })
    .eq('id', id)
  
  if (error) {
    console.error('Error restoring note:', error)
    throw error
  }
}

// Delete note permanently
export async function deleteNotePermanently(id: string) {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting note:', error)
    throw error
  }
}


// Clear bin (delete all notes in bin)
export async function clearBin() {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('in_bin', true)
  
  if (error) {
    console.error('Error clearing bin:', error)
    throw error
  }
}

export async function moveToBin(id: string) {
  const { error } = await supabase
    .from('notes')
    .update({ in_bin: true })
    .eq('id', id)
  
  if (error) {
    console.error('Error moving note to bin:', error)
    throw error
  }
}

export async function updateNote(note: Note) {
  const { error } = await supabase
    .from('notes')
    .update({
      title: note.title,
      content: note.content
    })
    .eq('id', note.id)
  
  if (error) {
    console.error('Error updating note:', error)
    throw error
  }
}