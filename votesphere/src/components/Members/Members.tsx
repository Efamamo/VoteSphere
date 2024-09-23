import { useEffect, useState } from 'react';
import Member from './Member';
import AddMember from './AddMember';
import { CircularProgress } from '@mui/material';
import axiosInstance from '../../api/axiosInstance';
import axios from 'axios';

interface Member {
  username: string;
  email: string;
  isAdmin: boolean;
}

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userError, setUserError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMembers() {
      setIsLoading(true);
      const groupId = localStorage.getItem('groupID');
      try {
        const response = await axiosInstance.get(
          `https://votespherebackend.onrender.com/groups/${groupId}/members`
        );
        setMembers(response.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    }
    fetchMembers();
  }, []);

  async function addMember(name: string, email: string) {
    setUserError('');
    const groupId = localStorage.getItem('groupID');

    const member = members.find((member) => member.username == name);
    if (member) {
      return;
    }
    setLoading(true);

    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };
      const body = {
        username: name,
      };
      await axiosInstance.post(
        `https://votespherebackend.onrender.com/groups/${groupId}/members`,
        body,
        { headers }
      );
      members.push({ username: name, email, isAdmin: false });
      setLoading(false);

      setIsOpen(false);
    } catch (e) {
      setLoading(false);

      if (axios.isAxiosError(e)) {
        if (e.response) {
          setUserError(e.response.data.message);
        }
      }
      return;
    }
  }

  async function removeMember(name: string) {
    try {
      const groupId = localStorage.getItem('groupID');

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };

      await axiosInstance.delete(
        `https://votespherebackend.onrender.com/groups/${groupId}/members/${name}`,
        {
          headers,
        }
      );
      const newMembers = members.filter((member) => member.username != name);
      setMembers(newMembers);
    } catch (e) {
      console.error(e);
    }
  }

  const closeModal = () => {
    setUserError('');
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

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
  return (
    <div className="mx-4 md:mx-16 my-16 md:my-32">
      <h2 className="text-3xl font-bold mb-14 text-center">Group 1 Members</h2>
      {members.length === 0 && (
        <h3 className="text-center text-xl font-bold">No Members</h3>
      )}
      <div className="flex flex-col md:flex-row flex-wrap gap-6 justify-center items-center">
        {members.map((member) => (
          <Member
            key={member.username}
            isAdmin={member.isAdmin}
            name={member.username}
            email={member.email}
            onDelete={removeMember}
          />
        ))}
      </div>

      {localStorage.getItem('role') === 'Admin' && (
        <button
          onClick={openModal}
          className="font-medium bg-ctaBlue text-white px-20 py-2 block rounded-lg mt-8 md:mt-20 mx-auto"
        >
          Add Member
        </button>
      )}
      {isOpen && (
        <AddMember
          loading={loading}
          closeModal={closeModal}
          addMember={addMember}
          userError={userError}
        />
      )}
    </div>
  );
}
