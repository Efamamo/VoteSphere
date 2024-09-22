import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

type Poll = {
  id: string;
  question: string;
  options: { id: string; optionText: string; numberOfVotes: number }[];
  commentCount: number;
};

interface PollContextType {
  polls: Poll[];
  addPoll: (newPoll: Poll) => void;
  deletePoll: (id: string) => void;
  vote: (pid: string, cid: string, pIndex: number, cIndex: number) => void;
  updatePolls: (polls: Poll[]) => void;
}

const PollContext = createContext<PollContextType | undefined>(undefined);

export const PollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [polls, setPolls] = useState<Poll[]>([]);

  function updatePolls(polls: Poll[]) {
    setPolls(polls);
  }

  const addPoll = (newPoll: Poll) => {
    setPolls((prevPolls) => [...prevPolls, newPoll]);
  };

  // Delete a poll by index
  const deletePoll = async (id: string) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };
      await axios.delete(`https://votespherebackend.onrender.com/polls/${id}`, {
        headers,
      });
      setPolls((prevPolls) => prevPolls.filter((p) => p.id !== id));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('Poll is already Voted on So U cant delete It');
      }
      console.error(e);
    }
  };

  const vote = async (
    pid: string,
    cid: string,
    pIndex: number,
    cIndex: number
  ) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };

      await axios.patch(
        `https://votespherebackend.onrender.com/polls/${pid}/vote?optionId=${cid}`,
        {},
        {
          headers,
        }
      );

      const updatedPolls = [...polls];
      const poll = { ...updatedPolls[pIndex] };
      const updatedChoices = [...poll.options];
      updatedChoices[cIndex] = {
        ...updatedChoices[cIndex],
        numberOfVotes: updatedChoices[cIndex].numberOfVotes + 1,
      };
      poll.options = updatedChoices;

      // Update the poll in the array
      updatedPolls[pIndex] = poll;

      // Set the new polls array as the state
      setPolls(updatedPolls);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.message);
      }
    }
  };

  return (
    <PollContext.Provider
      value={{ polls, addPoll, deletePoll, vote, updatePolls }}
    >
      {children}
    </PollContext.Provider>
  );
};

export const usePollContext = () => {
  const context = useContext(PollContext);
  if (!context) {
    throw new Error('usePollContext must be used within a PollProvider');
  }
  return context;
};
