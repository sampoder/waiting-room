import Head from 'next/head'
import theme from '../lib/theme'

const makeTitle = (title, name) =>
  title === name ? title : `${title} – ${name}`

const Meta = ({
  title = 'Sam Poder \'s Meeting Room', // page title
  name = 'Sam Poder \'s Meeting Room', // site name
  description = 'Meet with Sam Poder over Zoom.', // page description
  image = 'https://cloud-8vaqneogh-hack-club-bot.vercel.app/0leparty-3.png', // social card image URL
  url = 'https://zoom.sampoder.com',
  children,
}) => (
  <Head>
    <meta key="og_locale" property="og:locale" content="en_US" />
    <meta key="og_type" property="og:type" content="website" />
    <meta key="og_site" property="og:site_name" content={name} />
    <title key="title">{makeTitle(title, name)}</title>
    <meta key="og_title" property="og:title" content={makeTitle(title, name)} />
    <meta
      key="tw_title"
      name="twitter:title"
      content={makeTitle(title, name)}
    />
    {description && (
      <>
        <meta key="desc" name="description" content={description} />
        <meta key="og_desc" property="og:description" content={description} />
        <meta key="tw_desc" name="twitter:description" content={description} />
      </>
    )}
    {image && (
      <>
        <meta key="og_img" property="og:image" content={image} />
        <meta key="tw_card" name="twitter:card" content="summary_large_image" />
        <meta key="tw_img" name="twitter:image" content={image} />
      </>
    )}
    <meta key="theme_color" name="theme-color" content={theme.colors.primary} />
    <meta
      key="tile_color"
      name="msapplication-TileColor"
      content={theme.colors.primary}
    />
    <link
      href={`/favicon.ico`}
    />
    {children}
  </Head>
)

export default Meta
