import { Button } from '@mui/material'
import styles from './style.module.scss'
import { useSprings, animated } from 'react-spring'

const iconsConfig = [
  { x: 0, y: 266 },
  { x: 0, y: 245 },
  { x: 8, y: 60 },
  { x: 3, y: 50 }
]

export default function Home() {
  const springs = useSprings(
    iconsConfig.length,
    iconsConfig.map((item, index) => ({
      from: { opacity: 0, transform: 'translate(0px, 0px) scale(0.1)' },
      to: {
        opacity: 1,
        transform: `translate(${item.x}px, ${item.y}px) scale(1)`
      },
      config: { tension: 120, friction: 10 },
      delay: index * 100
    }))
  )

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {springs.map((props, index) => (
          <animated.div
            key={`goldenIcon${index + 2}`}
            className={styles[`goldenIcon${index + 2}`]}
            style={props}
          >
            <img
              src={`/golden-round-icons/icon${index + 2}.svg`}
              alt={`Golden Icon ${index + 2}`}
              width={index === 0 ? 85.95 : index === 3 ? 108.12 : 69.41}
              height={
                index === 0
                  ? 86.5
                  : index === 1
                  ? 41.06
                  : index === 2
                  ? 69.41
                  : 114.86
              }
            />
          </animated.div>
        ))}

        {/* First div block */}
        <div className={styles.block1}>
          <img
            src='/icons/icon1.png'
            alt='Icon 1'
            width={46.55}
            height={31.76}
          />
          <img src='/icons/icon2.png' alt='Icon 2' width={8.59} height={8.6} />
          <img
            src='/icons/icon3.png'
            alt='Icon 3'
            width={43.41}
            height={24.74}
          />
        </div>

        {/* Second div block */}
        <div className={styles.block2}>
          <div className={styles.innerBlock}>
            <img
              src='/icons/icon4.png'
              alt='Icon 3'
              width={126.29}
              height={26.9}
            />
            <p>에서</p>
          </div>
          <p className={styles.cyworldTxt}>
            오신 당신,{' '}
            <span>
              드림시티 <br /> 응모코인, 드립니다!
            </span>
          </p>
          <p className={styles.cyworldTxt2}>
            코넌의 새로운 지갑{' '}
            <span>
              메타콘에서 즐길 수 있는 드림시티 <br />
            </span>{' '}
            응모게임에 1회 참여 가능한 응모코인을 드립니다!
          </p>
        </div>
      </div>

      {/* New div block */}
      <div className={styles.newBlock}>
        <a
          href='https://play.google.com/store/apps/details?id=com.metacon&pli=1'
          target='_blank'
          rel='noopener noreferrer'
          style={{ textDecoration: 'none' }}
        >
          <Button
            variant='contained'
            color='primary'
            className={styles.newBlockItem3}
          >
            Metacon 다운로드
          </Button>
        </a>
      </div>
    </div>
  )
}
