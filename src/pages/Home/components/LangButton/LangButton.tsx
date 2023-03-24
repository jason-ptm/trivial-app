import { Langs } from '@/model/types'
import { traductionFlag } from '@/services/traductionFlag.service'
import React, { useState } from 'react'
import './styles/LangButton.scss'

// images
import spainFlag from '@/assets/images/spain-flag.png'
import usaFlag from '@/assets/images/usa-flag.png'

export interface LangButtonProps {
  props?: unknown
}

const LangButton: React.FC<LangButtonProps> = () => {
  const [flag, setFlag] = useState(true)

  const flagSpainRef = null
  const flagUsaRef = null

  const changeTraductionLang = (lang: string) => {
    setFlag(lang === Langs.es ? true : false)
    traductionFlag.setSubject(lang)
  }
  return (
    <div className="langbutton">
      <span
        ref={flagSpainRef}
        className={`img${flag ? ' select' : ''}`}
        onClick={() => changeTraductionLang(Langs.es)}
      >
        <img src={spainFlag} />
      </span>
      <span
        ref={flagUsaRef}
        className={`img${flag ? '' : ' select'}`}
        onClick={() => changeTraductionLang(Langs.en)}
      >
        <img src={usaFlag} />
      </span>
    </div>
  )
}

export default LangButton
