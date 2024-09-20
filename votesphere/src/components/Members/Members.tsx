import { useState } from 'react';
import Member from './Member';
import AddMember from './AddMember';

interface Member {
  name: string;
  email: string;
}

export default function Members() {
  const [members, setMembers] = useState<Member[]>([
    { name: 'Efa', email: 'ephremmamo555@gmail.com' },
    { name: 'Beka', email: 'bekabirhanu19@gmail.com' },
    { name: 'Chawi', email: 'johnalex04@gmail.com' },
    { name: 'Chachi', email: 'nardicha98@gmail.com' },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  function addMember(name: string, email: string) {
    const member = members.find((member) => member.name == name);
    if (member) {
      return;
    }
    members.push({ name, email });
  }

  function removeMember(name: string) {
    const newMembers = members.filter((member) => member.name != name);
    console.log(newMembers);
    setMembers(newMembers);
  }
  
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div className="mx-16 my-32">
      <h2 className="text-3xl font-bold mb-14 text-center">Group 1 Members</h2>
      {members.length === 0 && (
        <h3 className="text-center text-xl font-bold">No Members</h3>
      )}
      {members.map((member) => (
        <Member
          key={member.name}
          name={member.name}
          email={member.email}
          onDelete={removeMember}
        />
      ))}
      <button
        onClick={openModal}
        className="font-medium bg-ctaBlue text-white px-20 py-2 block rounded-lg mt-8 mx-auto"
      >
        Add Member
      </button>
      {isOpen && <AddMember closeModal={closeModal} addMember={addMember} />}
    </div>
  );
}
