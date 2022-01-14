import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../../store/events';
import * as groupActions from '../../store/groups';
import './CreateEvent.css';

function CreateEventForm({ props }) {
  const { group, setForm } = props;
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

  let errorUl;

  if (errors.length > 0) {
    errorUl = (
      <ul className="create-event error-list">
        {errors.map((error, idx) => (
          <li key={idx} className="error-item">
            {error}
          </li>
        ))}
      </ul>
    );
  }

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

    return dispatch(
      eventActions.createEvent(event)
    ).then(
      () => {
        setErrors([]);
        setForm(false);
        dispatch(groupActions.getGroups());
      }
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }

  return (
    <>
      <form
        className='auth-form create-event-form'
        onSubmit={handleSubmit}
      >
        <label className='auth-label' htmlFor="name">
          <input
            className="auth-input"
            type="text"
            name="name"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className='auth-label' htmlFor="description">
          <textarea
            rows='20'
            className="auth-input"
            name="description"
            placeholder="Event Details/Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <label className='auth-label' htmlFor="date">
          <input
            className="auth-input"
            type="datetime-local"
            name="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label className='auth-label' htmlFor="capacity">
          <input
            className="auth-input"
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

        <label className="form-toggle-text create-event-radio radio-container" htmlFor="inPerson">
          Will your event be in-person or online?
          <div>
            <input
              id="in-person"
              type="radio"
              name="inPerson"
              checked={inPerson ? true : false}
              value={inPerson}
              onChange={() => setInPerson(true)}
            />
            <label className='radio-option' htmlFor="in-person">
              In Person
            </label>
          </div>
          <div>
            <input
              id="online"
              type="radio"
              name="inPerson"
              checked={inPerson ? false : true}
              value={inPerson}
              onChange={() => setInPerson(false)}
            />
            <label className='radio-option' htmlFor="online">
              Online
            </label>
          </div>
        </label>
        <div className='form-toggle-text create-event-radio'>
          Make sure to add event details in the text box above so everyone knows where/how to join your online event
        </div>
        {errorUl}
        <div className='create-event-buttons'>
          <button className="auth-button generic-button">Create Event</button>
          <button
            className="auth-button generic-button"
            onClick={(e) => {
              e.preventDefault()
              setForm(false)
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  )
};

export default CreateEventForm
