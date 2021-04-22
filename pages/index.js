import { Box, Card, Container, Text, Heading, Image } from 'theme-ui'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function App({ fact, image, zoom }) {
  console.log(zoom)
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  let router = useRouter()
  const { zoomLink, error } = useSWR('/api/zoom', fetcher, {initialData: zoom})
  console.log(zoomLink)
  console.log(error)
  if(zoomLink != '' && typeof window != 'undefined' && typeof zoomLink != 'undefined'){
    window.location = zoomLink.zoom
  }
  useEffect(() => {
    window.setTimeout(function () {
      router.replace(router.asPath)
    }, 30000)
  })
  return (
    <Box
      sx={{
        background: `linear-gradient(rgba(0, 0, 0, 0.325), rgba(0, 0, 0, 0.25)), ${image
          .replace('"', '')
          .replace('")', '')})`,
      }}
    >
      <Container
        as="main"
        py={4}
        variant="copy"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          sx={{
            textAlign: 'center',
            width: '100%',
            position: 'relative',
            overflow: 'unset',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: -10,

              width: ['calc(100% - 32px)', 'calc(100% - 64px)'],
            }}
          >
            <Text
              sx={{
                bg: 'sunken',
                px: 2,
                py: 2,
                borderRadius: 'extra',
                height: '24px',
                fontWeight: '500',
              }}
            >
              <Image
                src="https://i.scdn.co/image/1c8bc0634d5baaf874c28e915aa37fab406a6d2e"
                sx={{
                  height: '20px',
                  transform: 'translateY(4px)',
                  borderRadius: '999px',
                  mr: '3px',
                }}
              />{' '}
              Waiting for Sam Poder...
            </Text>
          </Box>
          <Text as="h3" sx={{ mb: 2, mx: 'auto', fontWeight: '400' }}>
            Sorry to keep you waiting. Whilst you wait, here's a fun fact:
          </Text>
          <Heading as="h1">{fact}</Heading>
        </Card>
      </Container>
    </Box>
  )
}

export async function getServerSideProps({res}) {
  const S1 = require('s1db')
  const db = new S1(process.env.S1_TOKEN)
  let running = await db.get('running')
  let zoom
  if (running == true){
    zoom = await db.get('zoom')
    console.log(res)
    res.writeHead(301, {
      Location: zoom
    });
    res.end();
  }
  else{
    zoom = ''
  }
  const GeoPattern = require('geopattern')
  const colours = [
    '#e94256',
    '#e02200',
    '#ffb300',
    '#0b9e43',
    '#0e90db',
    '#6045ec',
  ]
  const pattern = text =>
    GeoPattern.generate(text, {
      baseColor: colours[Math.floor(Math.random() * colours.length)],
    })
  var rf = require('random-facts')
  let fact = ''
  while (fact.length < 80) {
    fact = rf.randomFact()
  }
  return {
    props: {
      fact,
      zoom,
      image: pattern(`${Math.random()}`).toDataUrl(),
    },
  }
}
