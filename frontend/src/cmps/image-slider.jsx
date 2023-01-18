import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

export function ImageSlider({ imgs }) {
  return (
    <Splide hasTrack={false}>
      <SplideTrack>
        {imgs.map((img) => (
          <SplideSlide key={img}>
            <img width='100%' src={img} alt='' />
          </SplideSlide>
        ))}
      </SplideTrack>
      {/* <div className='splide__arrows'>
        <button className='splide__arrow splide__arrow--prev'>Prev</button>
        <button className='splide__arrow splide__arrow--next'>Next</button>
      </div> */}

    </Splide>
  )
}

// import React from 'react'
// import Carousel from 'better-react-carousel'

// export function ImageSlider({imgs}) {
//     const containerStyle = {margin: "0"}
//     return (
//         <Carousel containerStyle={containerStyle} gap={0}>
//             {imgs.map(img => <Carousel.Item  key={img}><img width="100%" src={img} alt="" /></Carousel.Item>)}
//         </Carousel>
//       )
// }
