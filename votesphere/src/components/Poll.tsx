import { useState } from 'react';
import { usePollContext } from '../contexts/PollContext';
import { useNavigate } from 'react-router-dom';

export default function Poll() {
  const { addPoll } = usePollContext();

  const [question, setQuestion] = useState('');
  const [choice1, setChoice1] = useState('');
  const [choice2, setChoice2] = useState('');
  const [choice3, setChoice3] = useState('');
  const [choice4, setChoice4] = useState('');
  const [choice5, setChoice5] = useState('');

  const navigate = useNavigate();

  function handleAddPoll(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const choices = [];
    if (choice1) {
      choices.push({ choice: choice1, count: 0 });
    }
    if (choice2) {
      choices.push({ choice: choice2, count: 0 });
    }
    if (choice3) {
      choices.push({ choice: choice3, count: 0 });
    }
    if (choice4) {
      choices.push({ choice: choice4, count: 0 });
    }
    if (choice5) {
      choices.push({ choice: choice5, count: 0 });
    }
    const newPoll = {
      question: question,
      choices,
      commentCount: 0,
    };
    if (question === '') {
      alert('You need to add question for the poll');
      return;
    }

    if (choices.length < 2) {
      alert('Atleast 2 choices are required');
      return;
    }
    addPoll(newPoll);
    setQuestion('');
    setChoice1('');
    setChoice2('');
    setChoice3('');
    setChoice4('');
    setChoice5('');

    navigate('/dashboard');
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
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
