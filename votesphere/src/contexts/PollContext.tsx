import React, { createContext, useContext, useState } from 'react';

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
  const [polls, setPolls] = useState<Poll[]>([
    {
      question: 'Which social media platform do you use the most?',
      choices: [
        { choice: 'Facebook', count: 0 },
        { choice: 'Instagram', count: 0 },
        { choice: 'Twitter / X', count: 0 },
        { choice: 'Tiktok', count: 0 },
        { choice: 'Telegram', count: 0 },
      ],
      commentCount: 20,
    },
    {
      question: 'What is your preferred work environment?',
      choices: [
        { choice: 'Remote', count: 0 },
        { choice: 'Hybrid (part-time remote, part-time office)', count: 0 },
        { choice: 'In-office', count: 0 },
        { choice: 'Co-working spaces', count: 0 },
        { choice: 'No preference', count: 0 },
      ],
      commentCount: 10,
    },
    {
      question: 'What type of vacation destination do you prefer?',
      choices: [
        { choice: 'Beach', count: 0 },
        { choice: 'Mountains', count: 0 },
        { choice: 'City', count: 0 },
        { choice: 'Countryside', count: 0 },
        { choice: 'Adventure (e.g., hiking, rafting)', count: 0 },
      ],
      commentCount: 16,
    },
  ]);

  // Add a new poll
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
