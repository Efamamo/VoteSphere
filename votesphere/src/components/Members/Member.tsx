import member from '../../assets/user (1).png';
import trash from '../../assets/trash.png';
interface MemberProp {
  name: string;
  email: string;
  onDelete: (name: string) => void;
}
export default function Member({ name, email, onDelete }: MemberProp) {
  return (
    <div className="shadow-lg items-center justify-between max-w-80	px-4 py-4 mb-6 rounded-lg relative w-72">
      <img className="w-32 mx-auto" src={member} alt="" />
      <p className="mt-2">{name}</p>
      <p>{email}</p>
      {localStorage.getItem('role') === 'Admin' && (
        <img
          onClick={() => {
            onDelete(name);
          }}
          className="w-7 cursor-pointer absolute right-2 top-2"
          src={trash}
          alt=""
        />
      )}
    </div>
  );
}
