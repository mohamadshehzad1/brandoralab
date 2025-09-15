const ContactUs = () => {
    return (
        <section className="text-gray-600 body-font relative" id='contact'>
            <div className="container px-5 py-20 mx-auto flex justify-center">
                {/* Centered contact form */}
                <div className="w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg p-8 flex flex-col shadow-lg">
                    <div className="text-center mb-6">
                        <h2 className="text-gray-900 text-2xl font-medium title-font mb-2">Contact Us</h2>
                        <p className="leading-relaxed text-gray-600">
                            We're here to help you elevate your digital presence.
                        </p>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder='Enter your full name...'
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Enter your email address...'
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-6">
                        <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder='Share your thoughts or inquiries...'
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        ></textarea>
                    </div>
                    <button className="bg-gradient-to-r from-indigo-500 to-pink-600 text-white border-0 py-3 px-8 focus:outline-none hover:from-indigo-600 hover:to-pink-700 rounded text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300">
                        Send Message
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-6">
                        We look forward to connecting with you and exploring how we can help you achieve your digital goals.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;