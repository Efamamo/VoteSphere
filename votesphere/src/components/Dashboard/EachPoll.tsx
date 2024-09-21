import comment from '../../assets/chat (1).png';
import Progress from '../Percentage';
import trash from '../../assets/trash.png';
import { usePollContext } from '../../contexts/PollContext';
import { useState } from 'react';
interface Choice {
  choice: string;
  count: number;
}
interface EachPollProp {
  question: string;
  choices: Choice[];
  commentCount: number;
  id: number;
}
export default function EachPoll(prop: EachPollProp) {
  const [disabled, setDisabled] = useState(false);
  const { deletePoll, vote } = usePollContext();
  let total = 0;

  for (const c of prop.choices) {
    total += c.count;
  }
  return (
    <div className="shadow-lg rounded-lg max-w-2xl mx-auto my-16 w-1/2">
      <div className="px-4 py-2 border-b flex justify-between">
        <h3>{prop.question}</h3>
        <img
          onClick={() => {
            deletePoll(prop.id);
          }}
          className="w-6 cursor-pointer"
          src={trash}
          alt=""
        />
      </div>

      {prop.choices.map((choice, idx) => (
        <div key={choice.choice} className="px-4 py-2">
          <div className="my-1">
            <div className="flex gap-4 items-center">
              {!disabled && (
                <input
                  className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  type="radio"
                  name={prop.question}
                  id=""
                  onChange={() => {
                    vote(prop.id, idx);
                    setDisabled(true);
                  }}
                />
              )}

              <div className="flex gap-2">
                {total > 0 && (
                  <p className="w-10 text-right">
                    {total != 0 ? ((choice.count / total) * 100).toFixed(0) : 0}
                    %
                  </p>
                )}
                <label htmlFor="">{choice.choice}</label>
              </div>
            </div>
            {total == 0 && <hr className="mt-1 ml-8 w-11/12 mb-2" />}
            {total > 0 && (
              <Progress
                count={choice.count}
                total={total}
                giveMargin={!disabled}
              />
            )}
          </div>
        </div>
      ))}

      <div className="flex px-4 py-2 gap-2 border-t cursor-pointer">
        <img className="w-5" src={comment} alt="" />
        <p>{prop.commentCount} Comments</p>
      </div>
    </div>
  );
}
