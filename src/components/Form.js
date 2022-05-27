import { useState } from "react"
import { useViewport } from "../helpers/hooks"
import Button from "./Button"
import currentUserImg from '../images/image-juliusomo.png'

const Form = ({handleSubmit, labelText}) => {
    const [text, setText] = useState('')
    const { windowWidth } = useViewport()
    const isDisabled = text.length === 0

    const handleTextAreaChange = (e) => {
        setText(e.target.value)
    }

    const submitForm = (e) => {
        e.preventDefault()

        handleSubmit(text)
        setText('')
    }

    const formDesktopConfig = <form className='comment-form' onSubmit={submitForm}>
                                    <div>
                                        <img className='avatar' src={currentUserImg} alt='user avatar'/>
                                    </div>
                                    <textarea 
                                        className="textarea"
                                        placeholder='Add a comment...'
                                        value={text}
                                        onChange={handleTextAreaChange}
                                    />
                                    <div>
                                        <Button text={labelText} type='submit' disabled={isDisabled} />
                                    </div>
                                </form>

    const formMobileConfig = <form className='comment-form' onSubmit={submitForm}>
                                <textarea 
                                    className="textarea"
                                    placeholder='Add a comment...'
                                    value={text}
                                    onChange={handleTextAreaChange}
                                />
                                <div className='buttons'>
                                    <img className='avatar' src={currentUserImg} alt='user avatar'/>
                                    <Button text={labelText} type='submit' disabled={isDisabled} />
                                </div>
                                
                            </form>

    return (
        <>
            { windowWidth < 500 && formMobileConfig }
            { windowWidth > 500 && formDesktopConfig }
        </>
    )
}

export default Form 