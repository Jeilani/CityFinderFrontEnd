import React, {useState} from "react"
import {generateId} from "../../../helperfunctions"
import {useDispatch, useSelector} from "react-redux"
import {addMessage, deleteQuestion, setQuestion} from "../../../actions"
import "../../../CSS/QuestionsPopUp.css"
import ConfirmationScreen from "./ConfirmationScreen"
import WarningMessage from "../../WarningMessage.js"

const automatedResponse = ["I can definitely help you", "I would love to talk about this", "I can answer this question for you"]


const QuestionsPopUp = ({setQuestionPopUp}) => {
    const dispatch = useDispatch()
    const chosenQuestion = useSelector(state=>state.chosenQuestion)
    const [response, setResponse] = useState("")
    const [confirmationScreenShowing, setConfirmationScreenShowing] = useState(false)
    const [userTextShowing, setUserTextShowing] = useState(false)
    const [responseTooShort, setResponseTooShort] = useState(false)

    const responses = automatedResponse.map((str, i) =><span key = {str} onClick={()=>handleResponseClick(i)} className="automatedResponse">{str}</span>)
    const handleExitClick = () => {
        setQuestionPopUp(false)
        dispatch(setQuestion(null))
    }
    const renderTooShortOfAResponseMessage = () => {
        if (responseTooShort) return <WarningMessage message="You have to type more than that!"/>
    }
    //thisfunction prevents the exit of the popup when it's clicked so it calls a stop propagatino
    const handlePopUpClick = (e) => {
        e.stopPropagation()
    }

    const handleResponseClick = num => {
        setResponse(automatedResponse[num])
    }


    const handleInputChange = e => {
       setResponse(e.target.value)
    }

    const handleQuestionPopUpSubmit = (event) => {
        event.preventDefault()
        if (response.length < 2) {
            setResponseTooShort(true)
            setTimeout(()=>{
                setResponseTooShort(false)
            }, 1500)
        }
        else {
            setUserTextShowing(true)

            let message = {
                userID: chosenQuestion.userId,
                userName: `${chosenQuestion.firstName} ${chosenQuestion.lastName}`,
                messageId: generateId(),
                userImage: chosenQuestion.profileImg,
                threadId: generateId(),
                messages: [{content: response}]
            }

            setTimeout(()=>{
                setConfirmationScreenShowing(true)
                dispatch(addMessage(message))
                dispatch(deleteQuestion(chosenQuestion))
            }, 1000)
        }
    }

    const renderUserText = () => {
        if (userTextShowing) return <p className="myText">{response}</p>
        else return null
    }

    if (!confirmationScreenShowing){
    return (
        <div className="questionsPopUpContainer" onClick={handleExitClick}>
            {renderTooShortOfAResponseMessage()}
            <div className="questionsPopUp" onClick={handlePopUpClick}>
                <div className="questionsContentContainer">
                    <div className="firstHalf">
                        <img className="headshot questionsPopUpHeadshot"   src={chosenQuestion.profileImg} alt="headshot"/>
                        <div className="name">{chosenQuestion.firstName} {chosenQuestion.lastName}</div>
                        <p className="userText">{chosenQuestion.title}</p>
                        {renderUserText()}
                    </div>
                    <div className="secondHalf">
                        <p>You can choose one of our automated responses to get the chat going or type your own</p>
                        <div className="automatedResponsesContainer">
                            {responses}
                        </div>
                        <form onSubmit={handleQuestionPopUpSubmit}>
                            <input value={response}onChange={handleInputChange} placeholder="...type your response here and press enter when you're ready to send"></input>
                            <button className="questionSubmitButton" type="submit" onClick={handleQuestionPopUpSubmit}><i className="far fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
    } else return <ConfirmationScreen setQuestionPopUp={setQuestionPopUp} />
}

export default QuestionsPopUp