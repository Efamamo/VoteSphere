import member from '../../assets/user (1).png';
import trash from '../../assets/trash.png';
interface MemberProp {
  name: string;
  email: string;
  onDelete: (name: string) => void;
}
export default function Member({ name, email, onDelete }: MemberProp) {
  return (
    <div className="flex shadow-lg items-center justify-between max-w-screen-md	px-4 py-4 mb-6 rounded-lg mx-auto">
      <img className="w-6" src={member} alt="" />
      <p>{name}</p>
      <p>{email}</p>
      <img
        onClick={() => {
          onDelete(name);
        }}
        className="w-7 cursor-pointer"
        src={trash}
        alt=""
      />
    </div>
  );
}
