import comment from '../../assets/chat (1).png';
import Progress from '../Percentage';
import trash from '../../assets/trash.png';
import { usePollContext } from '../../contexts/PollContext';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import axiosInstance from '../../api/axiosInstance';
interface Choice {
  id: string;
  optionText: string;
  numberOfVotes: number;
}
interface EachPollProp {
  idx: number;
  question: string;
  options: Choice[];
  commentCount: number;
  id: string;
}
export default function EachPoll(prop: EachPollProp) {
  const [disabled, setDisabled] = useState(false);
  const [userVoted, setUserVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function checkVoted() {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        };
        const response = await axiosInstance.get(
          `https://votespherebackend.onrender.com/polls/${prop.id}`,
          { headers }
        );
        const data = await response.data;
        setUserVoted(data);
      } catch (e) {}
    }
    checkVoted();
  }, []);

  const { deletePoll, vote } = usePollContext();
  let total = 0;

  for (const c of prop.options) {
    total += c.numberOfVotes;
  }
  return (
    <div className="shadow-xl rounded-lg lg:max-w-2xl mx-auto my-20 lg:w-1/2">
      <div className="px-4 py-2 border-b flex gap-4 justify-between items-center">
        <h3 className="font-semibold">{prop.question}</h3>
        {localStorage.getItem('role') === 'Admin' && (
          <img
            onClick={() => {
              deletePoll(prop.id);
            }}
            className="w-6 cursor-pointer"
            src={trash}
            alt=""
          />
        )}
      </div>

      {prop.options.map((option, idx) => (
        <div key={option.optionText} className="px-4 py-2">
          <div className="my-1">
            <div className="flex gap-6 items-center">
              {disabled || userVoted ? null : (
                <input
                  className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  type="radio"
                  name={prop.question}
                  id=""
                  onChange={async () => {
                    setIsLoading(true);
                    await vote(prop.id, option.id, prop.idx, idx);
                    setIsLoading(false);
                    setDisabled(true);
                  }}
                />
              )}

              <div className="flex gap-2">
                {total > 0 && (
                  <p className="w-10 text-right">
                    {total != 0
                      ? ((option.numberOfVotes / total) * 100).toFixed(0)
                      : 0}
                    %
                  </p>
                )}
                <label htmlFor="">
                  {isLoading ? (
                    <CircularProgress
                      size={18}
                      thickness={4}
                      sx={{ color: 'blue', padding: 0, margin: 0 }}
                    />
                  ) : (
                    option.optionText
                  )}
                </label>
              </div>
            </div>
            {total == 0 && <hr className="mt-1 ml-10 w-11/12 mb-2" />}
            {total > 0 && (
              <Progress
                count={option.numberOfVotes}
                total={total}
                giveMargin={!disabled}
              />
            )}
          </div>
        </div>
      ))}

      <div className="flex px-4 py-2 gap-2 border-t cursor-pointer text-ctaBlue">
        <img className="w-5" src={comment} alt="" />
        <p>{prop.commentCount} Comments</p>
      </div>
    </div>
  );
}
