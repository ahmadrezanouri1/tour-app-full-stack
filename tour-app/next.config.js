/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'images.pexels.com',
      'images.unsplash.com',
      'source.unsplash.com',
      'cdn.pixabay.com',
      'i.imgur.com',
      'imgur.com',
      'media.istockphoto.com',
      'picsum.photos',
      'api.lorem.space',
      'placeimg.com',
      'placehold.co',
      'placekitten.com',
      'placebear.com',
      'baconmockup.com',
      'placebeard.it',
      'place-hold.it',
      'placecage.com',
      'placegoat.com',
      'placeskull.com',
      'placezombie.com',
      'loremflickr.com',
      'fillmurray.com',
      'stevensegallery.com',
      'nicenicejpg.com',
      'placekitten.com',
      'placebear.com',
      'baconmockup.com',
      'placebeard.it',
      'place-hold.it',
      'placecage.com',
      'placegoat.com',
      'placeskull.com',
      'placezombie.com',
      'loremflickr.com',
      'fillmurray.com',
      'stevensegallery.com',
      'nicenicejpg.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      }
    ],
  },
}

module.exports = nextConfig