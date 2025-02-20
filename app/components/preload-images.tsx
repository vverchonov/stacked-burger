import Head from 'next/head';

const burgerImages = [
  '/menu/burgers/single_stack.webp',
  '/menu/burgers/double_stacked.webp',
  '/menu/burgers/triple_st.webp',
  '/menu/burgers/big_stack.webp',
  '/menu/burgers/oklahoma_burger.webp',
  '/menu/burgers/east_west.webp',
  '/menu/burgers/cyprus_burger.webp',
  '/menu/burgers/california_chicken.webp',
  '/menu/burgers/chedar_halapeno.webp',
  '/menu/burgers/crispy_stacked.webp',
  '/menu/burgers/buffalo_chicken.webp',
  '/menu/burgers/original_chicken.webp',
  '/menu/burgers/california_chicken.webp',
  '/menu/burgers/chedar_halapeno.webp'
];

const PreloadImages = () => {
  return (
    <Head>
      {burgerImages.map((src, index) => (
        <link
          key={index}
          rel="preload"
          as="image"
          href={src}
          type="image/webp"
        />
      ))}
    </Head>
  );
};

export default PreloadImages; 