// import React from 'react'

import { useState } from "react";

function PayLeadsForm({ payLeadsForm, setPayLeadsForm, isOpened, onClosed, onRedirected, }) {

    const [error, setError] = useState(true)
    if (!isOpened) return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (payLeadsForm) {
            onRedirected();
            // console.log(payLeadsForm, "from modal")
            setError(true)
        } else {
            // console.log('please enter amount')
            setError(false)
        }
    }
    return (
        <div>
            <div className="relative">

                <div className="fixed animate-zoomIn inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg overflow-y-auto max-h-full w-11/12 md:w-2/3 lg:w-1/2">
                        <div className="flex justify-between items-center p-4 border-b">
                            <p className="mb-4 text-lg text-center font-medium">The amount will be deducted from your wallet. put the amount and click on continue to proceed.</p>
                            <button onClick={onClosed} className="text-gray-400 hover:text-gray-600">
                                X
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="mb-4">
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={payLeadsForm}
                                    onChange={(e) => {
                                        setPayLeadsForm(e.target.value);
                                        setError(true); // Reset validity on change
                                    }}
                                    className={`border p-2 rounded w-full ${error ? 'border-gray-300' : 'border-red-500'}`}
                                    placeholder="Enter Amount Here..."
                                    required
                                />
                                {!error && (
                                    <p className="text-red-500 text-sm mt-2">Please enter an amount</p>
                                )}
                            </div>
                            <button
                                className="bg-blue-500 mr-4 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={handleSubmit}

                            >
                                Continue
                            </button>
                            <button
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={onClosed}

                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PayLeadsForm