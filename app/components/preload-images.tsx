import Head from 'next/head';

const burgerImages: { href: string; type: string }[] = [
  { href: '/menu/burgers/single_stack.webp', type: 'image/webp' },
  { href: '/menu/burgers/double_stacked.webp', type: 'image/webp' },
  { href: '/menu/burgers/triple_st.webp', type: 'image/webp' },
  { href: '/menu/burgers/quad_stack.webp', type: 'image/webp' },
  { href: '/menu/burgers/oklahoma_burger.webp', type: 'image/webp' },
  { href: '/menu/burgers/east_west.webp', type: 'image/webp' },
  { href: '/menu/burgers/cyprus_burger.webp', type: 'image/webp' },
  { href: '/menu/burgers/california_chicken.webp', type: 'image/webp' },
  { href: '/menu/burgers/bacon_jalapeno.webp', type: 'image/webp' },
  { href: '/menu/burgers/buffalo_chicken.webp', type: 'image/webp' },
  { href: '/menu/burgers/original_chicken.webp', type: 'image/webp' },
  { href: '/menu/burgers/korean_bbq_chicken.webp', type: 'image/webp' },
  { href: '/menu/burgers/chedar_halapeno.webp', type: 'image/webp' },
  { href: '/sides/jumbo_tendies.webp', type: 'image/webp' }
];

const PreloadImages = () => {
  return (
    <Head>
      {burgerImages.map((item, index) => (
        <link
          key={index}
          rel="preload"
          as="image"
          href={item.href}
          type={item.type}
        />
      ))}
    </Head>
  );
};

export default PreloadImages;
