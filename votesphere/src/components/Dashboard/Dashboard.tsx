import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate('/add-poll');
        }}
        className="font-medium bg-ctaBlue text-white px-20 py-2 block rounded-lg mt-8 mx-auto absolute bottom-28 right-1/2"
      >
        Add Poll
      </button>
    </div>
  );
}
