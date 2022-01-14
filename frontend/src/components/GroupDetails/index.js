import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import * as groupActions from '../../store/groups';
import CreateEventForm from '../CreateEventForm';
import EventsPreview from '../EventsPreview';
import './GroupDetails.css';

import { Modal } from '../../context/Modal';

function GroupDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const { groupId } = params;
  const group = useSelector((state) => state.groups[groupId])

  useEffect(() => {
    dispatch(groupActions.getGroups());
  }, [dispatch])

  const [showEventForm, setShowEventForm] = useState(false);

  let createEvent = (
    <button
      className='generic-button create-event'
      onClick={() => {
        setShowModal(true)
        setForm('create-event')
      }}
    >
      Create an Event
    </button>
  )

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState("");
  const onClose = () => {
    setShowModal(false);
    setForm('');
  }

  return (
    <>
      {group && (
        <div className='group-details-container'>
          <div className='group-details'>
            <h1 className='group-details-name'>{group.name}</h1>
            <div className='hosted-by'>Organized by: <span>{group.User.username}</span></div>
          </div>
          <div className='group-body'>
            <div className='group-details-description'>
              <div className='group-details-description-header'>Description</div>
              <p>{group.description}</p>
            </div>
          </div>
          <div className='group-event'>
            <div className='group-event-header'>
              <h2>Upcoming Events</h2>
              {showEventForm ? <CreateEventForm props={{ setShowEventForm, group }} /> : createEvent}
            </div>
            <div className='event-scroll' >
              <EventsPreview events={group.Events} />
            </div>
          </div>
          {showModal && form === "create-event" && (
            <Modal onClose={onClose}>
              <CreateEventForm props={{ setForm, group }} />
            </Modal>
          )}
        </div>
      )}
    </>
  )
};

export default GroupDetails;
