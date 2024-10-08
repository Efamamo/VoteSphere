import { CircularProgress } from '@mui/material';
import { useState } from 'react';

interface AddProp {
  closeModal: () => void;
  addGroup: (gName: string, adminName: string | null) => void;
  isLoading: boolean;
}
export default function AddGroup(prop: AddProp) {
  const [name, setName] = useState('');
  async function addGroup() {
    if (name.trim() === '') {
      alert('Enter Valid GName');
      return;
    }
    await prop.addGroup(name, localStorage.getItem('username'));
    prop.closeModal();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 w-full h-screen"
        onClick={prop.closeModal}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-40">
        <div className="bg-white shadow-lg rounded-lg p-6 w-80 md:w-96">
          <h2 className="text-lg font-semibold mb-4">Enter Group Name</h2>
          <input
            onChange={(e) => setName(e.target.value)}
            className="border w-full rounded-md border-inputBORDER px-2 py-2 mb-4 outline-none"
            type="text"
            placeholder="Group Name"
          />
          <div className="flex justify-end gap-3">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={addGroup}
            >
              {prop.isLoading ? (
                <CircularProgress
                  size={18}
                  thickness={4}
                  sx={{ color: 'white', padding: 0, margin: 0 }}
                />
              ) : (
                'Create'
              )}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={prop.closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
