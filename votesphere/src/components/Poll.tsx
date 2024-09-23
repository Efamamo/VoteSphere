import { useState } from 'react';
import { usePollContext } from '../contexts/PollContext';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import axiosInstance from '../api/axiosInstance';

export default function Poll() {
  const { addPoll } = usePollContext();

  const [question, setQuestion] = useState('');
  const [choice1, setChoice1] = useState('');
  const [choice2, setChoice2] = useState('');
  const [choice3, setChoice3] = useState('');
  const [choice4, setChoice4] = useState('');
  const [choice5, setChoice5] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleAddPoll(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const choices = [];
    if (choice1) {
      choices.push(choice1);
    }
    if (choice2) {
      choices.push(choice2);
    }
    if (choice3) {
      choices.push(choice3);
    }
    if (choice4) {
      choices.push(choice4);
    }
    if (choice5) {
      choices.push(choice5);
    }

    if (question === '') {
      alert('You need to add question for the poll');

      return;
    }

    if (choices.length < 2) {
      alert('Atleast 2 choices are required');
      return;
    }
    setIsLoading(true);

    try {
      const body = {
        poll: {
          question: question,
          options: choices,
        },
        groupID: localStorage.getItem('groupID'),
      };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };

      const response = await axiosInstance.post(
        'https://votespherebackend.onrender.com/polls',
        body,
        {
          headers,
        }
      );
      setIsLoading(false);

      addPoll(response.data);
      setQuestion('');
      setChoice1('');
      setChoice2('');
      setChoice3('');
      setChoice4('');
      setChoice5('');

      navigate('/dashboard');
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  }

  return (
    <div className="mt-20 mx-4 md:mx-16 mb-20">
      <h2 className="text-3xl font-bold text-center">Add Poll Information</h2>
      <div className="shadow-lg rounded-lg max-w-4xl mx-auto px-4 md:px-11 py-8 mt-14">
        <form onSubmit={handleAddPoll}>
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 mt-2 mb-8 outline-none"
            type="text"
            placeholder="Question"
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
          />
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="text"
            placeholder="Choice 1"
            onChange={(e) => {
              setChoice1(e.target.value);
            }}
          />
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="text"
            placeholder="Choice 2"
            onChange={(e) => {
              setChoice2(e.target.value);
            }}
          />
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="text"
            placeholder="Choice 3"
            onChange={(e) => {
              setChoice3(e.target.value);
            }}
          />
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="text"
            placeholder="Choice 4"
            onChange={(e) => {
              setChoice4(e.target.value);
            }}
          />
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="text"
            placeholder="Choice 5"
            onChange={(e) => {
              setChoice5(e.target.value);
            }}
          />

          <button className="font-medium bg-ctaBlue text-white px-28 py-2 block rounded-lg mt-4 mx-auto">
            {isLoading ? (
              <CircularProgress
                size={18}
                thickness={4}
                sx={{ color: 'white', padding: 0, margin: 0 }}
              />
            ) : (
              'AddPoll'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
