import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSendToken } from '../../hooks/useSendToken'
import { setToken } from '../../store/tokenSlice'
import { Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import styles from './style.module.scss'
import { useSprings, animated } from 'react-spring'

const iconsConfig = [
  { x: 6, y: 35 },
  { x: 0, y: 16 },
  { x: 0, y: 5 },
  { x: 8, y: 20 },
  { x: 3, y: 10 },
]

export default function Home() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const mutation = useSendToken(token)
  const [hasClicked, setHasClicked] = useState(false)
  const [message, setMessage] = useState({ text: '', type: null })
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const urlToken = searchParams.get('token')

    if (urlToken) {
      dispatch(setToken(urlToken))
    }
  }, [location, dispatch])

  const springs = useSprings(
    iconsConfig.length,
    iconsConfig.map((item, index) => ({
      from: { opacity: 0, transform: 'translate(0px, 0px) scale(0.1)' },
      to: {
        opacity: 1,
        transform: `translate(${item.x}px, ${item.y}px) scale(1)`,
      },
      config: { tension: 120, friction: 10 },
      delay: index * 100,
    }))
  )

  const handleClick = async () => {
    if (!token) return
    setHasClicked(true)
    try {
      await mutation.mutateAsync(token)
      setMessage({
        text: 'Success! Your token has been submitted.',
        type: 'success',
      })
    } catch (error) {
      setMessage({ text: 'Error! Failed to submit your token.', type: 'error' })
    }
  }

  console.log('data: ', mutation?.data?.data)

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {springs.map((props, index) => (
          <animated.div
            key={`goldenIcon${index + 1}`}
            className={styles[`goldenIcon${index + 1}`]}
            style={props}
          >
            <img
              src={`/golden-round-icons/icon${index + 1}.svg`}
              alt={`Golden Icon ${index + 1}`}
              width={
                index === 0 || index === 1
                  ? 85.95
                  : index === 4
                  ? 108.12
                  : 69.41
              }
              height={
                index === 0
                  ? 121.43
                  : index === 1
                  ? 86.5
                  : index === 2
                  ? 41.06
                  : index === 3
                  ? 69.41
                  : 114.86
              }
            />
          </animated.div>
        ))}

        {/* First div block */}
        <div className={styles.block1}>
          <img
            src="/icons/icon1.png"
            alt="Icon 1"
            width={46.55}
            height={31.76}
          />
          <img src="/icons/icon2.png" alt="Icon 2" width={8.59} height={8.6} />
          <img
            src="/icons/icon3.png"
            alt="Icon 3"
            width={43.41}
            height={24.74}
          />
        </div>

        {/* Second div block */}
        <div className={styles.block2}>
          <div className={styles.innerBlock}>
            <img
              src="/icons/icon4.png"
              alt="Icon 3"
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

        {/* Third div block */}
        <div className={styles.block3}>
          <div className={styles.block3Item1}>나의 응모코드</div>
          <div className={styles.block3Item2} onClick={() => handleClick()}>
            <p>
              {mutation.isLoading
                ? 'Loading...'
                : hasClicked
                ? mutation?.data?.data
                : 'Get Code'}
            </p>
            <img
              src="/copy-icon.svg"
              alt="Copy Icon"
              width={32.61}
              height={32.61}
              className={styles.copyIcon}
            />
          </div>
          {message && (
            <p className={`${styles.message} ${styles[message.type]}`}>
              {message.text}
            </p>
          )}
          <div className={styles.block3Item3}>
            - <span>싸이월드 회원에 한 해</span> 1만 명 선착순 지급 <br /> -
            응모코드를 복사 혹은 캡처 후 메타콘 지갑을 설치하여 응모코인을
            받으세요. <br /> - 응모코드는 분실하거나 사라지면 다시 받을 수
            없습니다.
          </div>
        </div>
      </div>

      {/* New div block */}
      <div className={styles.newBlock}>
        <div className={styles.newBlockItem1}>
          응모코드 <span>사용방법</span>
        </div>
        <img
          src="/metacon-detail-icon.svg"
          alt="Icon"
          width={349.5}
          height={218.96}
        />
        <Button
          variant="contained"
          color="primary"
          className={styles.newBlockItem3}
        >
          Metacon 다운로드
        </Button>
      </div>
    </div>
  )
}
