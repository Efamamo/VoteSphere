import member from '../../assets/profile.png';
import trash from '../../assets/trash.png';
interface MemberProp {
  name: string;
  email: string;
  isAdmin: boolean;
  onDelete: (name: string) => void;
}
export default function Member({ name, email, isAdmin, onDelete }: MemberProp) {
  return (
    <div className="shadow-lg items-center justify-between max-w-80	px-4 py-4 mb-6 rounded-lg relative w-72">
      <img className="w-36 mx-auto" src={member} alt="" />
      <p className="mt-2">{name}</p>
      <p>{email}</p>
      {localStorage.getItem('role') === 'Admin' && !isAdmin && (
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
