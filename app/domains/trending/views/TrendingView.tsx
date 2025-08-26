import { useLoaderData } from 'react-router'
import { getTopRatedGames, type TopGame } from '@/domains/trending/services/trending.service'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/shared/components/ui/card'

export function meta() {
  return [
    { title: 'Top juegos | Gamemind' },
    { name: 'description', content: 'Los 10 juegos mejor valorados' },
  ]
}

export async function loader({ request }: { request: Request }) {
  const games = await getTopRatedGames(10, (request as any).signal)
  return { games }
}

export default function TrendingView() {
  const { games } = useLoaderData() as { games: TopGame[] }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Top 10 mejor valorados</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Card key={game.id}>
            <CardHeader>
              <img
                src={game.background_image ?? undefined}
                alt={game.name}
                className="aspect-video w-full object-cover"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{game.name}</CardTitle>
              <CardDescription>Rating: {game.rating}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
