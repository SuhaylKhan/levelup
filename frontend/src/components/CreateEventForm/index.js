import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../../store/events';

function CreateEventForm({ props }) {
  const { setShowEventForm, group } = props;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate()
  const today = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}T00:00`

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(today);
  const [capacity, setCapacity] = useState("");
  const [inPerson, setInPerson] = useState(true);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()
    const event = {
      hostId: sessionUser.id,
      groupId: group.id,
      name,
      description,
      date,
      capacity,
      inPerson
    };
    return dispatch(eventActions.createEvent(event));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="description">
          <textarea
            name="description"
            placeholder="Event Details/Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <label htmlFor="date">
          <input
            type="datetime-local"
            name="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label htmlFor="capacity">
          <input
            type="number"
            name="capacity"
            placeholder="RSVP Capacity"
            min="1"
            value={capacity}
            onChange={(e) => {
              if (e.target.value < 1) return;
              else setCapacity(e.target.value)
            }}
          />
        </label>

        <label htmlFor="inPerson">
          Will your event be in-person or online?
          <label htmlFor="in-person">
            <input
              id="in-person"
              type="radio"
              name="inPerson"
              checked={inPerson ? true : false}
              value={inPerson}
              onChange={() => setInPerson(true)}
            />
            In-Person
          </label>
          <label htmlFor="online">
            <input
              id="online"
              type="radio"
              name="inPerson"
              checked={inPerson ? false : true}
              value={inPerson}
              onChange={() => setInPerson(false)}
            />
            Online
          </label>
        </label>
        <p>
          {
            inPerson ?
              'You can add a venue to in-person events after the event is created' :
              'Make sure to add event details in the text box above so everyone knows where/how to join your online event'
          }
        </p>
        <button>Create Event</button>
      </form>
      <button
        onClick={() => setShowEventForm(false)}
      >
        Cancel
      </button>
    </>
  )
};

export default CreateEventForm
