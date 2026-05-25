import { createClient } from '@/lib/supabase/server'
import FavoritesClient from './FavoritesClient'

export default async function FavoritesPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: favorites } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  return <FavoritesClient initialFavorites={favorites ?? []} />
}