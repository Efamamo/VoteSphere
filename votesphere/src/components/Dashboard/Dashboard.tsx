import { useNavigate } from 'react-router-dom';
import EachPoll from './EachPoll';
import { usePollContext } from '../../contexts/PollContext';
import AddGroup from './AddGroup';
import { useEffect, useState } from 'react';
import noGroup from '../../assets/create cool ima 42ca4e70-75bf-409f-8590-ec2d9ba161d1.png';
import noPolls from '../../assets/create cool ima 78a1b920-1ca2-4208-a513-676da49b171e.png';
import { CircularProgress } from '@mui/material';
import axiosInstance from '../../api/axiosInstance';

export default function Dashboard() {
  const { polls, updatePolls } = usePollContext();
  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [hasGroup, setHasGroup] = useState(localStorage.getItem('groupID'));
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    async function fetchGroupName() {
      const groupID = localStorage.getItem('groupID');
      if (groupID != 'null') {
        try {
          const response = await axiosInstance.get(`/groups/${groupID}`);
          setGroupName(response.data.groupName);
        } catch (e) {
          console.error(e);
        }
      }
    }
    fetchGroupName();
  }, [groupName]);

  useEffect(() => {
    async function fetchPolls() {
      const groupID = localStorage.getItem('groupID');
      if (groupID != 'null') {
        setIsLoading(true);

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        };
        try {
          const response = await axiosInstance.get(
            `/polls?groupId=${groupID}`,
            { headers }
          );

          updatePolls(response.data);
          setIsLoading(false);
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      }
    }
    fetchPolls();
  }, [groupName]);

  async function handleAddGroup(gName: string, aName: string | null) {
    setLoading(true);
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };

      const body = {
        adminUsername: aName,
        groupName: gName,
      };
      const respone = await axiosInstance.post('/groups', body, {
        headers,
      });
      localStorage.setItem('groupID', respone.data.groupID);
      setHasGroup(respone.data.groupID);
      setGroupName(respone.data.groupName);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto text-center mt-40">
        <CircularProgress
          size={80}
          thickness={5}
          sx={{ color: '#2684F2', padding: 0, margin: 0 }}
        />
      </div>
    );
  }

  if (hasGroup === 'null') {
    return (
      <>
        <div className="max-w-2xl mx-auto mt-32 flex flex-col items-center">
          {' '}
          <img className="max-w-80 mb-8" src={noGroup} alt="" />
          {localStorage.getItem('role') === 'Admin' && (
            <>
              <h2 className="text-center text-xl font-semibold">
                Create A group To continue
              </h2>
              <button
                onClick={() => {
                  setIsOpen(true);
                }}
                className="font-medium bg-ctaBlue text-white px-20 py-2 block rounded-lg mt-2 mb-2 mx-auto "
              >
                Create Group
              </button>
            </>
          )}
        </div>

        {isOpen && (
          <AddGroup
            closeModal={closeModal}
            addGroup={handleAddGroup}
            isLoading={loading}
          />
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
        <img className="max-w-80 mb-8 mx-auto" src={noPolls} alt="" />
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
