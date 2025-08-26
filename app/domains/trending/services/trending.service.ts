export interface TopGame {
  id: number
  name: string
  slug: string
  rating: number
  ratings_count: number
  background_image: string | null
  released: string | null
  metacritic: number | null
}

const RAWG_BASE = 'https://api.rawg.io/api'

function requireRawgKey() {
  const key = process.env.RAWG_API_KEY || process.env.VITE_RAWG_API_KEY
  if (!key) {
    throw new Error('Missing RAWG_API_KEY (or VITE_RAWG_API_KEY) in environment')
  }
  return key
}

export async function getTopRatedGames(limit = 10, signal?: AbortSignal): Promise<TopGame[]> {
  const key = requireRawgKey()
  const params = new URLSearchParams({
    key,
    ordering: '-rating',
    page_size: String(limit),
  })
  const res = await fetch(`${RAWG_BASE}/games?${params.toString()}`, { signal })

  if (!res.ok) {
    // Deja trazabilidad para el ErrorBoundary
    const text = await res.text().catch(() => '')
    throw new Error(`RAWG error ${res.status}: ${text || res.statusText}`)
  }

  const data = (await res.json()) as { results: any[] }

  return (data.results || []).map((g) => ({
    id: g.id,
    name: g.name,
    slug: g.slug,
    rating: g.rating,
    ratings_count: g.ratings_count,
    background_image: g.background_image ?? null,
    released: g.released ?? null,
    metacritic: g.metacritic ?? null,
  }))
}
