import './index.css'

const AppointmentItem = props => {
  const {eachItem, onClickStar} = props
  const {id, title, dateTime, isFavourite} = eachItem

  const likeButton = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const likeClicked = () => {
    onClickStar(id)
  }

  return (
    <li className="appointment-container">
      <div className="like-delete-container">
        <p className="">{title}</p>
        <button type="button" data-testid="star" onClick={likeClicked}>
          <img src={likeButton} alt="star" className="like-button" />
        </button>
      </div>
      <p>Date : {dateTime}</p>
    </li>
  )
}

export default AppointmentItem
