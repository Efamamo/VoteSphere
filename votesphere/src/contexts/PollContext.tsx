import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Poll = {
  question: string;
  choices: { choice: string; count: number }[];
  commentCount: number;
};

interface PollContextType {
  polls: Poll[];
  addPoll: (newPoll: Poll) => void;
  deletePoll: (index: number) => void;
  vote: (pIndex: number, cIndex: number) => void;
}

const PollContext = createContext<PollContextType | undefined>(undefined);

export const PollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [polls, setPolls] = useState<Poll[]>([]);

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

        setPolls(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchPolls();
  }, []);

  const addPoll = (newPoll: Poll) => {
    setPolls((prevPolls) => [...prevPolls, newPoll]);
  };

  // Delete a poll by index
  const deletePoll = (index: number) => {
    setPolls((prevPolls) => prevPolls.filter((_, i) => i !== index));
  };

  const vote = (pIndex: number, cIndex: number) => {
    const updatedPolls = [...polls];
    const poll = { ...updatedPolls[pIndex] };
    const updatedChoices = [...poll.choices];
    updatedChoices[cIndex] = {
      ...updatedChoices[cIndex],
      count: updatedChoices[cIndex].count + 1,
    };

    poll.choices = updatedChoices;
    updatedPolls[pIndex] = poll;
    setPolls(updatedPolls);
  };

  return (
    <PollContext.Provider value={{ polls, addPoll, deletePoll, vote }}>
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
