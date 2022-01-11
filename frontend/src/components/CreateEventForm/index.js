function CreateEventForm({ props }) {
  const { setShowEventForm } = props;

  return (
    <>
      <form>
        SUCCESS
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
