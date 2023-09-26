import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'
import './index.css'

const fakeData = [
  {
    id: uuidv4(),
    title: 'mahesh',
    dateTime: 'ok',
    isFavourite: false,
  },
]

class Appointments extends Component {
  state = {
    initialFakeData: [],
    title: '',
    dateTime: '',
    isStarred: false,
  }

  onAddTitle = event => {
    this.setState({title: event.target.value})
  }

  onAddDate = event => {
    const [year, month, day] = event.target.value.split('-')
    const formattedObject = `${year},${month * 1},${day * 1}`
    this.setState({dateTime: formattedObject})
    console.log(formattedObject)
    console.log(format(new Date(formattedObject), 'dd MMMM yyyy, EEEE')) // 19 July 2021, Monday
  }

  onAppointmentCreate = event => {
    event.preventDefault()
    const {title, dateTime} = this.state
    const dataToUpdate = {
      id: uuidv4(),
      title,
      dateTime,
      isFavourite: false,
    }
    this.setState(prevState => ({
      initialFakeData: [...prevState.initialFakeData, dataToUpdate],
    }))
  }

  onClickStar = id => {
    this.setState(prevState => ({
      initialFakeData: prevState.initialFakeData.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isFavourite: !eachItem.isFavourite}
        }
        return eachItem
      }),
    }))
  }

  showStarred = () => {
    this.setState(prevState => ({isStarred: !prevState.isStarred}))
  }

  render() {
    const {initialFakeData, title, dateTime, isStarred} = this.state
    console.log(isStarred)
    return (
      <>
        <form className="main-container" onSubmit={this.onAppointmentCreate}>
          <div className="user-inputs-container">
            <h1>Add Appointment</h1>
            <label htmlFor="titleEl">Title</label>
            <input
              type="text"
              id="titleEl"
              value={title}
              placeholder="Title"
              onChange={this.onAddTitle}
              //   required
            />
            <label htmlFor="dateEl" alt="date">
              Date
            </label>
            <input
              type="date"
              alt="date"
              id="dateEl"
              //   value={dateTime}
              onChange={this.onAddDate}
              //   required
            />
            <button
              type="submit"
              style={{backgroundColor: 'blue', border: 0, color: '#ffffff'}}
            >
              Add
            </button>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            alt="appointments"
          />
        </form>
        <hr />
        <div className="bottom-appointment-heading">
          <h1>Appointments</h1>
          <button
            type="button"
            className="button-styling"
            onClick={this.showStarred}
          >
            Starred
          </button>
        </div>

        <ul className="list-of-appointments-container">
          {initialFakeData.map(eachItem =>
            isStarred ? (
              <AppointmentItem
                eachItem={eachItem}
                key={eachItem.id}
                onClickStar={this.onClickStar}
              />
            ) : (
              <AppointmentItem
                eachItem={eachItem}
                key={eachItem.id}
                onClickStar={this.onClickStar}
              />
            ),
          )}
        </ul>
      </>
    )
  }
}

export default Appointments
