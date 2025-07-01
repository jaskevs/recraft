import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - Re:hive Space" },
    { name: "description", content: "Get in touch with the Re:hive Space team." },
  ];
};

export default function Contact() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600">
              Have questions or want to get in touch? We'd love to hear from you.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Or reach out to us directly:</p>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> hello@rehivespace.com
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Response Time:</span> Within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}