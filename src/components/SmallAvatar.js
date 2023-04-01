
export default function SmallAvatar({ user }) {
  return ( 
    <div className="btn-cntr  circle-btn-cntr">

      <div className="btn-label">
        <span className="btn-label__text xs-caps">
          {user.name}
        </span>
      </div>

      <div className="img-circ-cntr">
        <div className="img-inner-cntr">
          <img src={user.image} alt={user.name} />
        </div>
      </div> 

    </div>
  )
};
  