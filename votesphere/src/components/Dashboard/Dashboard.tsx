import { useNavigate } from 'react-router-dom';
import EachPoll from './EachPoll';
import { usePollContext } from '../../contexts/PollContext';
import AddGroup from './AddGroup';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const { polls, updatePolls } = usePollContext();
  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState('');

  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    async function fetchGroupName() {
      try {
        const response = await axios.get(
          'http://localhost:9000/groups/4ee5b97e-8878-49c1-a153-b8e69f7e626d'
        );
        setGroupName(response.data.groupName);
      } catch (e) {
        console.error(e);
      }
    }
    fetchGroupName();
  }, []);

  useEffect(() => {
    async function fetchPolls() {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };
      try {
        const response = await axios.get(
          `http://localhost:9000/polls?groupId=${localStorage.getItem(
            'groupID'
          )}`,
          { headers }
        );

        updatePolls(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchPolls();
  }, []);

  async function handleAddGroup(gName: string, aName: string | null) {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };

      const body = {
        adminUsername: aName,
        groupName: gName,
      };
      const respone = await axios.post('http://localhost:9000/groups', body, {
        headers,
      });
      console.log(respone);
    } catch (error) {
      console.log(error);
    }
  }

  const group = localStorage.getItem('groupID');

  if (group === 'null') {
    return (
      <>
        {localStorage.getItem('role') === 'Admin' && (
          <div className="max-w-2xl mx-auto mt-40">
            {' '}
            <h2 className="text-center text-xl font-semibold">
              Create A group To continue
            </h2>{' '}
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className="font-medium bg-ctaBlue text-white px-20 py-2 block rounded-lg mt-2 mx-auto "
            >
              Add Group
            </button>
          </div>
        )}
        {localStorage.getItem('role') === 'User' && (
          <h2 className="text-center text-3xl font-semibold">
            You are not assigned to Any Group
          </h2>
        )}
        {isOpen && (
          <AddGroup closeModal={closeModal} addGroup={handleAddGroup} />
        )}
      </>
    );
  }

  return (
    <div className="mx-4 md:mx-16 my-10 md:my-32 mb-20">
      <h2 className="text-3xl font-bold mb-14 text-center">
        Group {groupName} Polls
      </h2>
      {polls.length === 0 && (
        <h3 className="text-center text-2xl font-bold">No Polls</h3>
      )}
      <div className="lg:flex flex-wrap items-center">
        {polls.map((poll, idx) => (
          <EachPoll
            idx={idx}
            id={poll.id}
            key={poll.question}
            question={poll.question}
            options={poll.options}
            commentCount={poll.commentCount}
          />
        ))}
      </div>

      {localStorage.getItem('role') === 'Admin' && (
        <button
          onClick={() => {
            navigate('/add-poll');
          }}
          className="font-medium bg-ctaBlue text-white px-20 py-2 block rounded-lg mt-8 mx-auto"
        >
          Add Poll
        </button>
      )}
    </div>
  );
}
