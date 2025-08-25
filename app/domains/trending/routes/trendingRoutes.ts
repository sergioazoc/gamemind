import { index, layout } from '@react-router/dev/routes'

export default [
  layout('shared/layouts/DefaultLayout.tsx', [index('domains/trending/views/HomeView.tsx')]),
]
