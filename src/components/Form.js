import { useState } from "react"
import Button from "./Button"
import currentUserImg from '../images/image-juliusomo.png'

const Form = ({handleSubmit, labelText}) => {
    const [text, setText] = useState('')
    const isDisabled = text.length === 0

    const handleTextAreaChange = (e) => {
        setText(e.target.value)
    }

    const submitForm = (e) => {
        e.preventDefault()

        handleSubmit(text)
        setText('')
    }

    return (
        <form className='comment-form' onSubmit={submitForm}>
            <div>
                <img className='avatar' src={currentUserImg} alt='user avatar'/>
            </div>
            <textarea 
                className="comment-textarea"
                placeholder='Add a comment...'
                value={text}
                onChange={handleTextAreaChange}
            />
            <div>
                <Button text={labelText} type='submit' disabled={isDisabled} />
            </div>
        </form>
    )
}

export default Form 