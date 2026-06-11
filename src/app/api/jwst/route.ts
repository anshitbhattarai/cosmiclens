import { NextResponse } from 'next/server'

const HARDCODED_URLS: Record<string, string> = {
  'Carina Nebula':
    'https://images-assets.nasa.gov/image/carina_nebula/carina_nebula~medium.jpg',
  'Webb Deep Field':
    'https://images-assets.nasa.gov/image/webb_first_deep_field/webb_first_deep_field~medium.jpg',
  'Southern Ring Nebula':
    'https://images-assets.nasa.gov/image/southern_ring_nebula/southern_ring_nebula~medium.jpg',
  'Pillars of Creation':
    'https://images-assets.nasa.gov/image/PIA25433/PIA25433~medium.jpg',
  'WASP-96b':
    'https://images-assets.nasa.gov/image/wasp-96_b_transmission_spectrum/wasp-96_b_transmission_spectrum~medium.jpg',
  "Stephan's Quintet":
    'https://images-assets.nasa.gov/image/PIA26702/PIA26702~large.jpg',
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''

  const url = HARDCODED_URLS[q] || null
  return NextResponse.json({ url })
}
