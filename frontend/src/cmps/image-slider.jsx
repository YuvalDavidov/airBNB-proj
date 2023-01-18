import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

export function ImageSlider({ imgs }) {
  return (
    <div className='image-slider'>
      <Splide hasTrack={false}>
        <SplideTrack>
          {imgs.map((img) => (
            <SplideSlide key={img}>
              <img width='100%' src={img} alt='' />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </div>
  )
}
