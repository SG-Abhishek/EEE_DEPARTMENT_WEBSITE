export default function FacultyCard({ faculty }) {
  return (
    <div className="more">
      <div className="left">
        <div className="integration-item-faculty">
          {faculty.isHod && <p>HEAD OF THE DEPARTMENT</p>}
          <img id="hodImage" src={faculty.image} alt={faculty.name} />
          <p>{faculty.name}</p>
          <p className="designation">{faculty.role}</p>
          <a href={`mailto:${faculty.email}`}>Email : {faculty.email}</a>
        </div>
      </div>
    </div>
  );
}