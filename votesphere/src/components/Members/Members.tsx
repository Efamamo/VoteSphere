import { useEffect, useState } from 'react';
import Member from './Member';
import AddMember from './AddMember';
import axios from 'axios';

interface Member {
  username: string;
  email: string;
  isAdmin: boolean;
}

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchMembers() {
      const groupId = localStorage.getItem('groupID');
      try {
        const response = await axios.get(
          `http://localhost:9000/groups/${groupId}/members`
        );
        setMembers(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchMembers();
  });

  async function addMember(name: string, email: string) {
    const groupId = localStorage.getItem('groupID');

    const member = members.find((member) => member.username == name);
    if (member) {
      return;
    }
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };
      const body = {
        username: name,
      };
      await axios.post(
        `http://localhost:9000/groups/${groupId}/members`,
        body,
        { headers }
      );
      members.push({ username: name, email, isAdmin: false });
      setIsOpen(false);
    } catch (e) {
      alert('You cant add admin to your group');
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

      await axios.delete(
        `http://localhost:9000/groups/${groupId}/members/${name}`,
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
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
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
      {isOpen && <AddMember closeModal={closeModal} addMember={addMember} />}
    </div>
  );
}
