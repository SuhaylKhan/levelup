import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as eventActions from '../../store/events';
import './EditEventForm.css'

function EditEventForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const event = useSelector((state) => state.events[eventId]);
  const groups = useSelector((state) => state.groups);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(eventActions.getEvents()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const randomClass = [
    'right-top', 'right', 'right-bottom', 'bottom',
    'left-bottom', 'left', 'left-top', 'top',
    'circle'
  ];
  const randomNum = Math.floor(Math.random() * 9)

  // FORM FUNCTIONALITY
  const dateForForm = (event) => {
    const dateObj = new Date(event.date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hour = dateObj.getHours() > 9 ? dateObj.getHours() : `0${dateObj.getHours()}`;
    const min = dateObj.getMinutes() > 9 ? dateObj.getMinutes() : `0${dateObj.getMinutes()}`;
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}T${hour}:${min}`;
  };

  let eventDate;
  if (event) eventDate = dateForForm(event);

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState();
  const [inPerson, setInPerson] = useState('default');
  const [errors, setErrors] = useState([]);

  let errorUl;

  if (errors.length > 0) {
    errorUl = (
      <ul>
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

    const editedEvent = {
      eventId,
      name: name ? name : event.name,
      description: description ? description : event.description,
      date: date ? date : event.date,
      capacity: capacity ? capacity : event.capacity,
      inPerson: inPerson !== 'default' ? inPerson : event.inPerson,
    };

    if (!inPerson) editedEvent.venueId = null;

    return dispatch(
      eventActions.editEvent(editedEvent)
    ).then(
      () => setErrors([])
    ).then(
      () => history.push(`/events/${eventId}`)
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }

  return (
    <>
      {isLoaded && (
        <form
          onSubmit={handleSubmit}
        >
          <div className='event-details-container'>
            <div className='event-header'>
              <div className='event-header-details'>
                <div className='event-date-time'>
                  <label htmlFor="date">
                    <input
                      className='auth-input edit-event-date'
                      type="datetime-local"
                      name="date"
                      min={eventDate}
                      value={date || eventDate}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                </div>
                <div className='event-details-name'>
                  <label htmlFor="name">
                    <input
                      className='auth-input event-details-name'
                      type="text"
                      name="name"
                      placeholder={event.name}
                      value={name === undefined ? event.name : name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                </div>
                <div className='hosted-by'>Hosted by: <span>{event.User.username}</span></div>
              </div>
              <div className='edit-buttons'>
                <button
                  className='nav-auth-link button edit'
                >
                  Confirm Changes
                </button>
                <button
                  className='fake-button delete'
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(eventActions.deleteEvent(event.id));
                    history.push('/');
                  }}
                >
                  Delete Event
                </button>
              </div>
            </div>
            <div className='event-body'>
              <div className='event-details-description'>
                <div className='event-details-description-header'>Details</div>
                <div>
                  <label htmlFor="description">
                    <div className='grow-wrap'>
                      <textarea
                        className='auth-input'
                        rows='10'
                        name="description"
                        placeholder={event.description}
                        value={description === undefined ? event.description : description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </label>
                </div>
              </div>
              <div className='sidebar'>
                <div className={`small-container to-${randomClass[randomNum]} active`}>{groups[event.groupId].name}</div>
                <div className='sidebar-details browse-all'>
                  <div>
                    <div className='in-person hosted-by'>
                      <label className='radio-container' htmlFor="inPerson">
                        <div>
                          <input
                            id="in-person"
                            type="radio"
                            name="inPerson"
                            checked={(inPerson === 'default' ? event.inPerson : inPerson) ? true : false}
                            value={inPerson}
                            onChange={() => setInPerson(true)}
                          />
                          <label className='radio-option' htmlFor="in-person">
                            In-Person
                          </label>
                        </div>
                        <div>
                          <input
                            id="online"
                            type="radio"
                            name="inPerson"
                            checked={(inPerson === 'default' ? event.inPerson : inPerson) ? false : true}
                            value={inPerson}
                            onChange={() => setInPerson(false)}
                          />
                          <label className='radio-option' htmlFor="online">
                            Online
                          </label>
                        </div>
                      </label>
                    </div>
                    {event.inPerson && event.venueId ?
                      <div className='venue'>
                        <div className='venue-name'>{event.Venue.name}</div>
                        <div className='venue-location'>{event.Venue.city}, {event.Venue.state} {event.Venue.zipCode}</div>
                      </div>
                      : null}
                  </div>
                  <div className='capacity'>
                    <label htmlFor="capacity">
                      <input
                        type="number"
                        name="capacity"
                        placeholder={event.capacity}
                        min="1"
                        value={capacity || event.capacity}
                        onChange={(e) => {
                          if (e.target.value < 1) return;
                          else setCapacity(e.target.value)
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {errorUl}
        </form>
      )}
    </>
  )
};

export default EditEventForm;
