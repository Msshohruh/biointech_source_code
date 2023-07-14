import { useState } from 'react'
import './Faq.css'
import 'animate.css'
import image from '../../assets/image/showhide.svg'
function Question({ data, i }) {
    const [show, setShow] = useState(false)

    return (
        <div className="question" onClick={() => setShow(!show)}>
            <p className="question-num">{i < 9 ? '0' + (i + 1) : i + 1}</p>
            <div className='question-content'>
                <h3 className='question-title'>{data.title}</h3>
                <p className={`animate__animated ${show ? 'question-text animate__fadeIn' : 'text-hide'}`}>{data.text}</p>
            </div>
            <img className={`question-showhide ${show ? 'rotate' : 'no-rotate'}`} src={image} alt="show hide button" />
        </div>
    )
}

export default Question