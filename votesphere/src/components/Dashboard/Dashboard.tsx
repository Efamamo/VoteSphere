import { useNavigate } from 'react-router-dom';
import EachPoll from './EachPoll';
import { usePollContext } from '../../contexts/PollContext';

export default function Dashboard() {
  const { polls } = usePollContext();
  console.log(polls);

  const navigate = useNavigate();

  return (
    <div className="mx-16 my-32">
      <h2 className="text-3xl font-bold mb-14 text-center">Group 1 Polls</h2>
      {polls.length === 0 && (
        <h3 className="text-center text-2xl font-bold">No Polls</h3>
      )}
      <div className="flex flex-wrap items-center">
        {polls.map((poll, idx) => (
          <EachPoll
            id={idx}
            key={poll.question}
            question={poll.question}
            choices={poll.choices}
            commentCount={poll.commentCount}
          />
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/add-poll');
        }}
        className="font-medium bg-ctaBlue text-white px-20 py-2 block rounded-lg mt-8 mx-auto"
      >
        Add Poll
      </button>
    </div>
  );
}
