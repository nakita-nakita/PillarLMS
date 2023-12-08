import React from 'react'
import DisplayBranding from './DisplayBranding'

function DisplayFooter(props) {
  return (
    <footer className="bg-stone-500 p-6 text-gray-200">
      <DisplayBranding {...props} />
      {/* Resource List Row */}
      <div className="flex flex-col space-y-4 mt-8 md:flex-row md:justify-around mb-8 text-center">
        {/* Resource List */}
        <div className="flex flex-col pb-5 mt-4">
          <p className="text-lg font-semibold pb-2">Header</p>
          <a href="javascript:void(0)" className="hover:text-gray-300">
            Link
          </a>
          <a href="javascript:void(0)" className="hover:text-gray-300">
            Link
          </a>
        </div>

        {/* Resource List 2 */}
        <div className="flex flex-col pb-5 mt-4">
          <p className="text-lg font-semibold pb-2">Header</p>
          <a href="javascript:void(0)" className="hover:text-gray-300">
            Link
          </a>
          <a href="javascript:void(0)" className="hover:text-gray-300">
            Link
          </a>
        </div>

        {/* Resource List 3 */}
        <div className="flex flex-col pb-5 mt-4">
          <p className="text-lg font-semibold pb-2">Header</p>
          <a href="javascript:void(0)" className="hover:text-gray-300">
            Link
          </a>
          <a href="javascript:void(0)" className="hover:text-gray-300">
            Link
          </a>
        </div>

        {/* Resource List 4 */}
        <div className="flex flex-col pb-5 mt-4">
          <p className="text-lg font-semibold pb-2">Header</p>
          <a href="javascript:void(0)" className="hover:text-gray-300">
            Link
          </a>
          <a href="javascript:void(0)" className="hover:text-gray-300">
            Link
          </a>
        </div>
      </div>

      {/* Copyright */}
    </footer>
  )
}

export default DisplayFooter