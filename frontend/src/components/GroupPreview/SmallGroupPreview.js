function SmallGroupPreview({ groups }) {
  const randomClass = [
    'right-top', 'right', 'right-bottom', 'bottom',
    'left-bottom', 'left', 'left-top', 'top',
    'circle'
  ];

  return (
    <>
      {Object.entries(groups).map((ele, i) => {
        const group = ele[1];
        const randomNum = Math.floor(Math.random() * 9)
        return (
          <div key={i} className={`small-container to-${randomClass[randomNum]}`}>
            <h2 className='group-name'>{group.name}</h2>
            <p className='group-description'>{group.description}</p>
          </div>
        )
      })}
    </>
  )
};

export default SmallGroupPreview;
