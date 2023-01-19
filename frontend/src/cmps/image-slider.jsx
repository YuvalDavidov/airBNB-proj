import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import { useNavigate } from 'react-router-dom'

export function ImageSlider({ imgs, stayId }) {
  const navigate = useNavigate()
  return (
    <div className='image-slider'>
      <Splide hasTrack={false}>
        <SplideTrack>
          {imgs.map((img) => (
            <SplideSlide key={img}>
              <img onClick={() => navigate(`/details/${stayId}`)} width='100%' src={img} alt='' />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </div>
  )
}
