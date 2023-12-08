import React from 'react'

function DisplayCta(props) {
  return (
    <div className="bg-zinc-500 text-white p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">Contact Us Today</h2>
      <p className="mb-6">Have questions or need assistance? We're here to help. Contact us for more information.</p>
      <a
        href="/contact"
        className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300"
      >
        Get in Touch
      </a>
    </div>
  )
}

export default DisplayCta